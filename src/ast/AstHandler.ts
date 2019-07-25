import { BlockHandler } from "../parser/BlockHandler";
import { InlineHandler, Sugar, SugarsByStart } from "../parser/InlineHandler";
import { InlineParser } from "../parser/InlineParser";
import { InputPosition } from "../parser/InputPosition";
import { last } from "../utils";
import { BlockElement, InlineElement, InlineGroup } from "./ast";

export class AstHandler implements BlockHandler, InlineHandler {
	protected readonly inlineParser = new InlineParser(this);
	protected readonly blockStack: BlockElement[] = [];
	protected readonly inlineGroupStack: InlineGroup[] = [];
	protected readonly inlineElementStack: InlineElement[] = [];

	constructor() {
		this.reset();
	}

	reset(): void {
		this.blockStack.length = 0;
		this.blockStack.push({
			tag: "root",
			pos: { line: 1, column: 1, length: 0 },
			head: [],
			children: []
		});
	}

	getResult(): BlockElement {
		return this.blockStack[0];
	}

	openBlock(tag: string | undefined, pos: InputPosition): boolean {
		const node = { tag, pos: { ...pos }, head: [], children: [] };
		last(this.blockStack).children.push(node);
		this.blockStack.push(node);
		this.inlineGroupStack.length = 0;
		this.inlineElementStack.length = 0;
		this.inlineGroupStack.push(node.head);
		return true;
	}

	closeBlock(): void {
		this.blockStack.pop();
	}

	head(content: string, pos: InputPosition): void {
		this.inlineParser.parse(content, new Map(), pos);
	}

	rawLine(content: string, pos: InputPosition): void {
		last(this.blockStack).children.push({
			tag: "_raw_line",
			pos: { ...pos },
			head: [content],
			children: []
		});
	}

	openInlineTag(tag: string, pos: InputPosition): InlineElement {
		const element = { tag, pos: { ...pos }, args: [] };
		this.inlineElementStack.push(element);
		last(this.inlineGroupStack).push(element);
		return element;
	}

	closeInlineTag(): void {
		this.inlineElementStack.pop();
	}

	openArgument(index: number, pos: InputPosition): false | SugarsByStart {
		const arg: InlineGroup = [];
		this.inlineGroupStack.push(arg);
		last(this.inlineElementStack).args.push(arg);
		return new Map();
	}

	closeArgument(): void {
		this.inlineGroupStack.pop();
	}

	pushText(content: string): void {
		const parent = last(this.inlineGroupStack);
		const lastIndex = parent.length - 1;
		if (lastIndex < 0 || typeof parent[lastIndex] !== "string") {
			parent.push(content);
		} else {
			parent[lastIndex] += content;
		}
	}

	get allSugars(): Sugar[] {
		return [];
	}
}
