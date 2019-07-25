import { AstHandler } from "../../src/ast/AstHandler";
import { Sugar, SugarsByStart } from "../../src/parser/InlineHandler";
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

const sugarsMap: SugarsByStart = new Map(sugars.map(_ => [_.syntax.start, _]));

export class TestHandler extends AstHandler {
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
		if (!this.rawHead) this.inlineParser.parse(content, sugarsMap, pos);
		else this.pushText(content);
	}

	openArgument(index: number, pos: InputPosition): false | SugarsByStart {
		super.openArgument(index, pos);
		const parent = last(this.inlineElementStack);
		if (parent.tag === "code" || (parent.tag === "rawFirstArg" && index === 0)) return false;
		return sugarsMap;
	}

	get allSugars(): Sugar[] {
		return sugars;
	}
}
