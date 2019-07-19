import { AstHandler } from "../ast/AstHandler";
import { last } from "../utils";
import { BlockHandler } from "./BlockHandler";

export function parse(input: string) {
	const handler = new AstHandler();
	return new BlockParser(handler).parse(input);
}

/**
 * Parses Hashmark blocks. A block is a Hashmark tag with a body. For example:
 * ```
 * #block head
 * 		block content
 * ```
 *
 * @typeparam BlockData		Type of produced block objects
 */
export class BlockParser<BlockData> {
	private readonly regex = /(?:\r\n|\n|\r|^)(\t*)(.*)/gm;
	private readonly tagRegex = /(?:#([^ \[\r\n]+)(?: |$))?(.*)/;

	constructor(private readonly handler: BlockHandler<BlockData>) {}

	parse(input: string): BlockData {
		const init = this.handler.rootBlock();
		let inRawBody = init.rawBody;
		const stack = [{ data: init.data, indent: 0 }];
		let line = 0;
		for (const [, indentString, lineContent] of input.matchAll(this.regex)) {
			++line;
			const indent = indentString.length;

			// Special case for raw line
			if (inRawBody && indent > last(stack).indent) {
				const content = indentString.slice(last(stack).indent + 1) + lineContent;
				this.handler.rawLine(last(stack).data, content);
			} else if (lineContent) {
				while (stack.length > 1 && indent <= last(stack).indent) stack.pop();
				const [, tag, head] = this.tagRegex.exec(lineContent)!;
				const tagStart = indent + 1 + (tag ? 1 : 0);
				const tagEnd = tagStart + (tag ? tag.length : 0);
				const headStart = indent + this.tagRegex.lastIndex + 1;
				const { data, rawBody } = this.handler.openBlock(
					last(stack).data,
					tag,
					head,
					line,
					tagStart,
					tagEnd,
					headStart
				);
				inRawBody = rawBody;
				stack.push({ indent, data });
			}
		}
		return stack[0].data;
	}
}
