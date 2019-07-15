import { BlockElement } from "./ast";
import { InlineParser } from "./InlineParser";
import { defaultSchema, Reserved, Schema } from "./schema";
import { last } from "./utils";

export function parse(input: string, schema: Schema = defaultSchema) {
	return new Parser(schema).parse(input);
}

export class Parser {
	private readonly regex = /(?:\r\n|\n|\r|^)(\t*)(?:#([^ \[\r\n]+)(?: |$))?(.*)/gm;
	private readonly inlineParser: InlineParser;

	constructor(private schema: Schema) {
		this.inlineParser = new InlineParser(schema);
	}

	parse(input: string): BlockElement {
		let line = 0;
		const root: BlockElement = {
			tag: Reserved.rootTag,
			children: [],
			head: [],
			line,
			tagStart: 1,
			tagEnd: 1
		};
		const stack = [root];
		let current = root;
		for (const [_, indent, tagName, lineContent] of input.matchAll(this.regex)) {
			++line;
			if (!tagName && !lineContent) continue;
			while (stack.length > indent.length + 1) stack.pop();
			current = last(stack);
			const tag = tagName || this.schema.getDefault(current.tag) || Reserved.defaultTag;
			const tagStart = 1 + indent.length;
			const tagEnd = tagStart + (tagName ? tagName.length + 1 : 0);
			const column = tagEnd + (tagName ? 1 : 0);
			const head = this.inlineParser.parse(lineContent, tag, line, column);
			const block = { tag, head, children: [], line, tagStart, tagEnd };
			current.children.push(block);
			stack.push(block);
		}
		return root;
	}
}
