import { AstHandler } from "../../src/ast/AstHandler";
import { InlineParser } from "../../src/parser/InlineParser";
import { InputPosition } from "../../src/parser/InputPosition";
import { last } from "../../src/utils";

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

export class TestHandler extends AstHandler {
	protected readonly inlineParser = new InlineParser(this, sugars);
	private rawHead: boolean = false;

	constructor() {
		super();
	}

	openBlock(tag: string | undefined, pos: InputPosition) {
		super.openBlock(tag, pos);
		this.rawHead = tag === "rawHead";
		return tag !== "rawBody";
	}

	head(content: string, pos: InputPosition) {
		if (!this.rawHead) this.inlineParser.parse(content, pos);
		else this.pushText(content);
	}

	openArgument(index: number, pos: InputPosition): boolean {
		super.openArgument(index, pos);
		const parent = last(this.inlineElementStack);
		return !(parent.tag === "code" || (parent.tag === "rawFirstArg" && index === 0));
	}
}
