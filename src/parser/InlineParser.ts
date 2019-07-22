import { escapeRegExp, last } from "../utils";
import { InlineHandler, Sugar } from "./InlineHandler";

interface InlineSyntax {
	separator?: string;
	end: string;
}

export class InlineParser<InlineGroupData, InlineData, ParentData = undefined> {
	// Regex matching inline tags and inline sugars:
	private readonly regex: RegExp;
	// An inline tag can be treated as a explicitly named version of inline sugar with ][ separator, and ] end tag:
	private readonly inlineTag: InlineSyntax = { separator: "][", end: "]" };
	// Stack of currently open inline elements:
	private stack: Array<{
		data?: InlineGroupData;
		tagData: InlineData;
		syntax: InlineSyntax;
		length: number;
	}> = [];
	// Inline group at nesting level 0:
	private root?: InlineGroupData;
	// Inline group at current nesting level:
	private current?: InlineGroupData;

	// Map of sugar start character to sugar definition:
	private sugars?: Map<string, Sugar>;
	private isRaw?: boolean;

	constructor(private readonly handler: InlineHandler<InlineGroupData, InlineData, ParentData>) {
		const sugars = handler.getAllSugars();
		this.regex = new RegExp(
			"(" +
				[
					/#[^ \[]+\[?/.source,
					/\\./.source,
					...[this.inlineTag.separator ? [escapeRegExp(this.inlineTag.separator)] : []],
					...[
						this.inlineTag.end,
						...sugars.map(_ => _.start),
						...sugars.map(_ => _.separator).filter((_): _ is string => Boolean(_)),
						...sugars.map(_ => _.end)
					].map(escapeRegExp)
				]
					.map(_ => `(?:${_})`)
					.join("|") +
				")",
			"g"
		);
	}

	parse(input: string, line: number, column: number, parentData: ParentData): InlineGroupData {
		const tokens = input.split(this.regex);
		this.stack.length = 0;
		const { data, raw, sugars } = this.handler.rootInlineTag(parentData);
		this.sugars = sugars;
		this.current = this.root = data;
		this.isRaw = raw;

		for (let i = 0; i < tokens.length; ++i) {
			const token = tokens[i];
			if (i % 2 === 0 || (this.isRaw && !this.isRawEnd(token))) {
				if (token) this.handler.pushText(this.current, token);
			} else {
				this.handleToken(token, line, column);
			}
			column += token.length;
		}

		return this.root;
	}

	/**
	 * Handles escaped characters, inline sugar and inline tags
	 * @param token string containing the token
	 * @param line line number in the source file (1-based)
	 * @param column column number in the source file of the token start (1-based)
	 */
	private handleToken(token: string, line: number, column: number) {
		switch (token[0]) {
			case "\\": {
				this.handler.pushText(this.current!, token[1]);
				return;
			}
			case "#": {
				const endsWithBracket = last(token) === "[";
				const tag = token.slice(1, endsWithBracket ? -1 : undefined);
				this.open(
					tag,
					this.inlineTag,
					line,
					column + 1,
					column + 1 + tag.length,
					!endsWithBracket
				);
				return;
			}
			default: {
				// Auto-close in cases like:
				// 	 *_Hello*
				//   *#inline[Test*
				for (let j = this.stack.length - 1; j >= 0; --j) {
					if (this.stack[j].syntax.end === token) {
						this.close(j);
						return;
					}
				}

				// Close arg, and open next arg for separators:
				for (let j = this.stack.length - 1; j >= 0; --j) {
					if (this.stack[j].syntax.separator === token) {
						this.close(j + 1);
						this.openArg();
						return;
					}
				}

				const sugar = this.sugars!.get(token);
				if (sugar) {
					this.open(sugar.tag, sugar, line, column, column + token.length);
					return;
				}

				this.handler.pushText(this.current!, token);
			}
		}
	}

	private open(
		tag: string,
		syntax: InlineSyntax,
		line: number,
		tagStart: number,
		tagEnd: number,
		closed: boolean = false
	) {
		const tagData = this.handler.openInlineTag(this.current!, tag, line, tagStart, tagEnd);
		if (!closed) {
			this.stack.push({ tagData, syntax, length: 0 });
			this.openArg();
		}
	}

	private openArg() {
		const parent = last(this.stack);
		const { data, raw, sugars } = this.handler.openArgument(
			parent.tagData,
			parent.length,
			0,
			0
		);
		parent.data = this.current = data;
		this.isRaw = raw;
		this.sugars = sugars;
		++parent.length;
	}

	private close(index: number = this.stack.length - 1) {
		if (index === this.stack.length) return;
		this.stack.length = index;
		this.current = this.stack.length > 0 ? last(this.stack).data! : this.root;
		this.isRaw = false;
	}

	private isRawEnd(token: string) {
		const syntax = last(this.stack).syntax;
		return token === syntax.end || token === syntax.separator;
	}
}
