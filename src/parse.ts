import { Block, Inline, Line } from "./ast";
import { compileLexer, Lexer, TokensDefinition } from "./compileLexer";
import { defaultSchema, Reserved, Schema } from "./schema";
import { last } from "./utils";

export const enum InlineToken {
	Text,
	Escaped,
	OpenTag,
	ArgSeparator,
	CloseTag
}

export function parse(input: string) {
	return new Parser(defaultSchema).parse(input);
}

export class Parser {
	private readonly lineRegex = /(?:\r\n|\n|\r|^)(\t*)(?:#([^ \[\r\n]+)(?: |$))?(.*)/gm;
	private readonly lexLine: Lexer;

	constructor(private schema: Schema) {
		this.lexLine = compileLexer(
			([
				{
					type: InlineToken.Escaped,
					regex: /\\(.)/
				},
				{
					type: InlineToken.OpenTag,
					regex: /#([^ \[]+)(\[)?/
				},
				{
					type: InlineToken.ArgSeparator,
					regex: /]\[/
				},
				{
					type: InlineToken.CloseTag,
					regex: /]/
				}
			] as TokensDefinition[]).concat(
				schema.customTokens.map(_ => ({
					type: _.tag,
					regex: _.regex
				}))
			),
			InlineToken.Text
		);
	}

	parse(input: string): Block {
		let depth = 0;
		const root: Block = { tag: Reserved.rootTag, children: [], head: [] };
		const stack = [root];
		let current = root;
		for (const [_, indent, tagName, lineContent] of input.matchAll(this.lineRegex)) {
			if (!tagName && !lineContent) continue;
			for (let i = 0; i < depth - indent.length; ++i) stack.pop();
			current = last(stack);
			const tag = tagName || this.schema.getDefault(current.tag) || Reserved.defaultTag;
			const head = this.parseLine(lineContent);
			const block = { tag, head, children: [] };
			current.children.push(block);
			stack.push(block);
			depth = indent.length + 1;
		}
		return root;
	}

	parseLine(input: string): Line {
		if (!input) return [];
		const root: Line = [];
		const inlineStack: Inline[] = [];
		let current: Line = root;
		for (const token of this.lexLine(input)) {
			switch (token.type) {
				case InlineToken.Text:
					current.push(token.value);
					break;
				case InlineToken.Escaped:
					current.push(token.matches[0]!);
					break;
				case InlineToken.OpenTag:
					const inlineAst = { tag: token.matches[0]!, arguments: [], closed: false };
					current.push(inlineAst);
					if (!token.matches[1]) {
						break;
					} else {
						inlineStack.push(inlineAst);
					}
				case InlineToken.ArgSeparator:
					if (inlineStack.length > 0) {
						const arg: Line = [];
						last(inlineStack).arguments.push(arg);
						current = arg;
					} else {
						current.push(token.value);
					}
					break;
				case InlineToken.CloseTag:
					if (inlineStack.length > 0) {
						// `inlineStack.pop()` cannot be null because inInline === true
						inlineStack.pop()!.closed = true;
						current = inlineStack.length ? last(last(inlineStack).arguments) : root;
					} else {
						current.push(token.value);
					}
					break;
				default:
					current.push({
						tag: token.type as string,
						arguments: [[token.matches[0]!]],
						closed: true
					});
					break;
			}
		}
		return root;
	}
}
