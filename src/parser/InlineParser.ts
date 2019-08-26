import { last, regexpUnion, stringToRegexp, unique } from "../utils";
import { InlineHandler } from "./InlineHandler";
import { InputPosition } from "./InputPosition";
import { Sugar } from "./Sugar";

interface InlineSyntax {
	separator?: string;
	end: string;
}

export class InlineParser {
	// Regex matching inline tags and inline sugars:
	private readonly regex: RegExp;
	// An inline tag can be treated as a explicitly named version of inline sugar with ][ separator, and ] end tag:
	private readonly inlineTagSyntax = { separator: "][", end: "]" };
	// Stack of currently open inline elements:
	private readonly stack: Array<{ syntax: InlineSyntax; length: number }> = [];

	// Map of sugar start character to sugar definition:
	private readonly sugarsByStart: Map<string, Sugar>;
	private isRaw?: boolean;

	constructor(private readonly handler: InlineHandler, sugars: Sugar[] = []) {
		const customTokens = sugars.map(_ => _.syntax).flatMap(Object.values);
		this.sugarsByStart = new Map(sugars.map(_ => [_.syntax.start, _]));
		this.regex = regexpUnion(
			/\\./,
			/#[^ \[]+\[?/,
			stringToRegexp(this.inlineTagSyntax.separator),
			stringToRegexp(this.inlineTagSyntax.end),
			...unique(customTokens)
				.sort((a, b) => a.length - b.length)
				.map(stringToRegexp)
		);
	}

	parse(input: string, pos: InputPosition): void {
		const tokens = input.split(this.regex);
		this.stack.length = 0;
		this.isRaw = false;

		for (let i = 0; i < tokens.length; ++i) {
			const token = tokens[i];
			pos.length = token.length;
			if (i % 2 === 0 || (this.isRaw && !this.isRawEnd(token))) {
				if (token) this.handler.pushText(token);
			} else {
				this.handleToken(token, pos);
			}
			pos.column += token.length;
		}
	}

	/**
	 * Handles escaped characters, inline sugar and inline tags
	 * @param token string containing the token
	 * @param line line number in the source file (1-based)
	 * @param column column number in the source file of the token start (1-based)
	 */
	private handleToken(token: string, pos: InputPosition) {
		switch (token[0]) {
			case "\\": {
				this.handler.pushText(token[1]);
				return;
			}
			case "#": {
				const endsWithBracket = last(token) === "[";
				const tag = token.slice(1, endsWithBracket ? -1 : undefined);
				this.open(tag, this.inlineTagSyntax, pos, !endsWithBracket);
				return;
			}
			default: {
				// Auto-close in cases like:
				// 	 *_Hello*
				//   *#inline[Test*
				for (let j = this.stack.length - 1; j >= 0; --j) {
					if (this.stack[j].syntax.end === token) {
						this.close(j, pos);
						return;
					}
				}

				// Close arg, and open next arg for separators:
				for (let j = this.stack.length - 1; j >= 0; --j) {
					if (this.stack[j].syntax.separator === token) {
						this.close(j + 1, pos);
						this.openArg(pos);
						return;
					}
				}

				const sugar = this.sugarsByStart.get(token);
				if (sugar) {
					this.open(sugar.tag, sugar.syntax, pos);
					return;
				}

				this.handler.pushText(token);
			}
		}
	}

	private open(tag: string, syntax: InlineSyntax, pos: InputPosition, closed: boolean = false) {
		this.handler.openInlineTag(tag, pos);
		if (!closed) {
			this.stack.push({ syntax, length: 0 });
			this.openArg(pos);
		}
	}

	private openArg(pos: InputPosition) {
		const parent = last(this.stack);
		const returnValue = this.handler.openArgument(parent.length, pos);
		this.isRaw = !returnValue;
		++parent.length;
	}

	private close(index: number = this.stack.length - 1, pos: InputPosition) {
		this.handler.closeArgument(pos);
		while (this.stack.length > index) {
			this.handler.closeInlineTag(pos);
			this.stack.pop();
		}
		this.isRaw = false;
	}

	private isRawEnd(token: string) {
		const syntax = last(this.stack).syntax;
		return token === syntax.end || token === syntax.separator;
	}
}
