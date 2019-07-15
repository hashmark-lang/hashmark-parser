import { InlineElement, InlineGroup } from "./ast";
import { defaultSchema, Schema, Sugar } from "./schema";
import { escapeRegExp, last } from "./utils";

interface InlineSyntax {
	separator?: string;
	end: string;
}

export class InlineParser {
	// Regex matching inline tags and inline sugars:
	private readonly regex: RegExp;
	// An inline tag can be treated as a explicitly named version of inline sugar with ][ separator, and ] end tag:
	private readonly inlineTag: InlineSyntax = { separator: "][", end: "]" };
	// Map of sugar start character to sugar definition:
	private readonly sugars: Map<string, Sugar>;
	// Stack of currently open inline elements:
	private stack: Array<{ element: InlineElement; syntax: InlineSyntax }> = [];
	// Inline group at nesting level 0:
	private root: InlineGroup;
	// Inline group at current nesting level:
	private current: InlineGroup;

	private isRawArg: boolean;
	private blockName: string;

	constructor(private readonly schema: Schema = defaultSchema) {
		this.regex = new RegExp(
			"(" +
				[
					/#[^ \[]+\[?/.source,
					/\\./.source,
					...[
						this.inlineTag.separator,
						this.inlineTag.end,
						...schema.sugars.map(_ => _.start),
						...schema.sugars.map(_ => _.separator).filter(_ => _),
						...schema.sugars.map(_ => _.end)
					].map(escapeRegExp)
				]
					.map(_ => `(?:${_})`)
					.join("|") +
				")",
			"g"
		);

		this.sugars = new Map(schema.sugars.map(_ => [_.start, _]));
	}

	parse(input: string, blockName: string, column: number): InlineGroup {
		const tokens = input.split(this.regex);
		this.stack.length = 0;
		this.current = this.root = [];
		this.isRawArg = false;
		this.blockName = blockName;

		for (let i = 0; i < tokens.length; ++i) {
			const token = tokens[i];
			if (i % 2 === 0 || (this.isRawArg && token !== last(this.stack).syntax.end)) {
				if (token) this.pushText(token);
			} else {
				this.handleToken(token, column);
			}
			column += token.length;
		}

		return this.root;
	}

	/**
	 * Handles escaped characters, inline sugar and inline tags
	 * @param token string containing the token
	 */
	private handleToken(token: string, column: number) {
		switch (token[0]) {
			case "\\": {
				this.pushText(token[1]);
				return;
			}
			case "#": {
				const endsWithBracket = last(token) === "[";
				const tag = token.slice(1, endsWithBracket ? -1 : undefined);
				this.open(tag, this.inlineTag, column, column + tag.length + 1, !endsWithBracket);
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

				const sugar = this.sugars.get(token);
				if (sugar && this.isSugarStart(sugar)) {
					this.open(sugar.tag, sugar, column, column + token.length);
					return;
				}

				this.pushText(token);
			}
		}
	}

	private pushText(text: string) {
		this.current.push(text);
	}

	private open(
		tag: string,
		syntax: InlineSyntax,
		tagStart: number,
		tagEnd: number,
		closed: boolean = false
	) {
		const element = { tag, arguments: [], closed, tagStart, tagEnd };
		this.current.push(element);
		if (!closed) {
			this.stack.push({ element, syntax });
			this.openArg();
		}
	}

	private openArg() {
		const element = last(this.stack).element;
		this.current = [];
		element.arguments.push(this.current);
		this.isRawArg = this.schema.isRawArg(element.tag, element.arguments.length);
	}

	private close(index: number = this.stack.length - 1) {
		if (index === this.stack.length) return;
		this.stack[index].element.closed = true;
		this.stack.length = index;
		this.current = this.stack.length > 0 ? last(last(this.stack).element.arguments) : this.root;
		this.isRawArg = false;
	}

	/**
	 * Whether the sugar should be parsed as sugar in this context, or simply as text
	 * @param sugar description of the sugar
	 */
	private isSugarStart(sugar: Sugar) {
		if (this.stack.length === 0) return this.schema.isValidHeadChild(sugar.tag, this.blockName);
		const top = last(this.stack).element;
		return this.schema.isValidArgChild(top.tag, top.arguments.length, sugar.tag);
	}
}
