import { BlockElement, InlineElement } from "../../src";
import { AstHandler } from "../../src/ast/AstHandler";

const sugars = [
	{
		start: "`",
		end: "`",
		tag: "code"
	},
	{
		start: "*",
		end: "*",
		tag: "strong"
	},
	{
		start: "_",
		end: "_",
		tag: "emphasis"
	},
	{
		start: "{",
		separator: "|",
		end: "}",
		tag: "set"
	}
];

const sugarsMap = new Map(sugars.map(_ => [_.start, _]));

export class TestHandler extends AstHandler {
	openBlock(
		parent: BlockElement,
		tag: string,
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

	protected parseHead(parentTag: string, content: string, line: number, column: number) {
		return parentTag === "rawHead" ? [content] : this.inlineParser.parse(content, line, column);
	}

	openArgument(parent: InlineElement, index: number, line: number, start: number) {
		return {
			...super.openArgument(parent, index, line, start),
			sugars: sugarsMap,
			raw: parent.tag === "code" || (parent.tag === "rawFirstArg" && index === 0)
		};
	}

	getAllSugars() {
		return sugars;
	}
}
