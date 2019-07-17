import { BlockElement } from "../ast";
import { defaultSchema, Reserved, Schema } from "../schema/schema";
import { last } from "../utils";
import { InlineParser } from "./InlineParser";

export function parse(input: string, schema: Schema = defaultSchema) {
	return new Parser(schema).parse(input);
}

export class Parser {
	private readonly regex = /(?:\r\n|\n|\r|^)(\t*)(.*)/gm;
	private readonly tagRegex = /(?:#([^ \[\r\n]+)(?: |$))?(.*)/;
	private readonly inlineParser: InlineParser;

	constructor(private schema: Schema) {
		this.inlineParser = new InlineParser(schema);
	}

	parse(input: string): BlockElement {
		let line = 1;
		const root: BlockElement = {
			tag: Reserved.rootTag,
			children: [],
			head: [],
			line,
			tagStart: 1,
			tagEnd: 1
		};
		const stack = [{ block: root, indent: 0 }];
		for (const [_, indentString, lineContent] of input.matchAll(this.regex)) {
			++line;
			const indent = indentString.length;

			// Special case for raw line
			if (this.schema.isRawBlock(last(stack).block.tag) && indent > last(stack).indent) {
				const head = [indentString.slice(last(stack).indent + 1) + lineContent];
				const tag = Reserved.rawLine;
				const tagStart = stack.length;
				const tagEnd = tagStart;
				const block = { tag, head, children: [], line, tagStart, tagEnd };
				last(stack).block.children.push(block);
				continue;
			} else if (!lineContent) {
				continue;
			} else {
				while (stack.length > 1 && indent <= last(stack).indent) stack.pop();
				const [__, tagName, headContent] = this.tagRegex.exec(lineContent)!;
				const tag =
					tagName || this.schema.getDefault(last(stack).block.tag) || Reserved.defaultTag;
				const tagStart = indent + 1 + (tagName ? 1 : 0);
				const tagEnd = tagStart + (tagName ? tagName.length + 1 : 0);
				const column = this.tagRegex.lastIndex + 1;
				const head = this.inlineParser.parse(headContent, tag, line, column);
				const block = { tag, head, children: [], line, tagStart, tagEnd };
				last(stack).block.children.push(block);
				stack.push({ indent, block });
			}
		}
		return root;
	}
}
