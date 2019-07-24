import { BlockElement, InlineElement } from "../../src";
import { AstHandler } from "../../src/ast/AstHandler";

const sugars = [
	{
		syntax: { start: "`", end: "`" },
		tag: "code"
	},
	{
		syntax: { start: "*", end: "*" },
		tag: "strong"
	},
	{
		syntax: { start: "_", end: "_" },
		tag: "emphasis"
	},
	{
		syntax: { start: "{", separator: "|", end: "}" },
		tag: "set"
	}
];

const sugarsMap = new Map(sugars.map(_ => [_.syntax.start, _]));

export class TestHandler extends AstHandler {
	openBlock(
		parent: BlockElement,
		tag: string | undefined,
		headContent: string,
		line: number,
		tagStart: number,
		tagEnd: number,
		headStart: number
	) {
		return {
			...super.openBlock(parent, tag, headContent, line, tagStart, tagEnd, headStart),
			rawBody: tag === "rawBody"
		};
	}

	protected parseHead(
		parentTag: string | undefined,
		content: string,
		line: number,
		column: number
	) {
		return parentTag === "rawHead"
			? [content]
			: this.inlineParser.parse(content, line, column, undefined);
	}

	rootInlineTag() {
		return { ...super.rootInlineTag(), sugars: sugarsMap };
	}

	openArgument(parent: InlineElement, index: number, line: number, start: number) {
		return {
			...super.openArgument(parent, index, line, start),
			sugars: sugarsMap,
			raw: parent.tag === "code" || (parent.tag === "rawFirstArg" && index === 0)
		};
	}

	get allSugars() {
		return sugars;
	}
}
