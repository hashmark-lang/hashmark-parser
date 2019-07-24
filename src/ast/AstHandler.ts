import { BlockHandler } from "../parser/BlockHandler";
import { InlineHandler, NamedSugar } from "../parser/InlineHandler";
import { InlineParser } from "../parser/InlineParser";
import { BlockElement, InlineElement, InlineGroup } from "./ast";

export class AstHandler
	implements BlockHandler<BlockElement>, InlineHandler<InlineGroup, InlineElement> {
	protected readonly inlineParser = new InlineParser<InlineGroup, InlineElement>(this);

	rootBlock() {
		const data = { tag: "root", children: [], head: [], line: 1, tagStart: 1, tagEnd: 1 };
		return { data, rawBody: false };
	}

	openBlock(
		parent: BlockElement,
		tag: string | undefined,
		headContent: string,
		line: number,
		tagStart: number,
		tagEnd: number,
		headStart: number
	) {
		const head = this.parseHead(tag, headContent, line, headStart);
		const data = { tag, head, children: [], line, tagStart, tagEnd };
		parent.children.push(data);
		return { data, rawBody: false };
	}

	protected parseHead(
		parentTag: string | undefined,
		content: string,
		line: number,
		column: number
	) {
		return this.inlineParser.parse(content, line, column, undefined);
	}

	rawLine(parent: BlockElement, content: string): void {
		parent.children.push({
			tag: "_raw_line",
			head: [content],
			children: [],
			line: -1,
			tagStart: -1,
			tagEnd: -1
		});
	}

	rootInlineTag() {
		return { data: [], sugars: new Map(), raw: false };
	}

	openInlineTag(
		parent: Array<string | InlineElement>,
		tag: string,
		line: number,
		tagStart: number,
		tagEnd: number
	): InlineElement {
		const element = { tag, args: [], line, tagStart, tagEnd };
		parent.push(element);
		return element;
	}

	openArgument(parent: InlineElement, index: number, line: number, start: number) {
		const data: InlineGroup = [];
		parent.args.push(data);
		return { data, sugars: new Map(), raw: false };
	}

	pushText(parent: InlineGroup, content: string) {
		const lastIndex = parent.length - 1;
		if (lastIndex < 0 || typeof parent[lastIndex] !== "string") {
			parent.push(content);
		} else {
			parent[lastIndex] += content;
		}
	}

	getAllSugars(): NamedSugar[] {
		return [];
	}
}
