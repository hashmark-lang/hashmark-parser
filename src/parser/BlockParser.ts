import { last } from "../utils";
import { BlockHandler } from "./BlockHandler";
import { InputPosition } from "./InputPosition";

/**
 * Parses Hashmark blocks. A block is a Hashmark tag with a body. For example:
 * ```
 * #block head
 * 		block content
 * ```
 *
 * @typeparam BlockData		Type of produced block objects
 */
export class BlockParser {
	private readonly regex = /(?:\r\n|\n|\r|^)(\t*)(.*)/gm;
	private readonly tagRegex = /(?:#([^ \[\r\n]+)(?: |$))?(.+)?/;

	constructor(private readonly handler: BlockHandler) {}

	parse(input: string, pos: InputPosition = { line: 1, column: 1, length: 0 }): void {
		const indentStack = [0];
		let inRawBody = false;
		for (const [, indentString, lineContent] of input.matchAll(this.regex)) {
			const indent = indentString.length;

			// Special case for raw line
			if (inRawBody && indent > last(indentStack)) {
				pos.column = last(indentStack) + 1;
				const content = indentString.slice(pos.column) + lineContent;
				pos.length = content.length;
				this.handler.rawLine(content, pos);
			} else if (lineContent) {
				while (indentStack.length > 1 && indent <= last(indentStack)) {
					pos.column = pos.length = 0;
					this.handler.closeBlock(pos);
					indentStack.pop();
				}
				const [, tag, head] = this.tagRegex.exec(lineContent)!;
				pos.column = indent + 1;
				pos.length = tag ? tag.length + 1 : 0;
				inRawBody = !this.handler.openBlock(tag, pos);
				if (head) {
					pos.column = pos.column + pos.length + (tag ? 1 : 0);
					pos.length = head.length;
					this.handler.head(head, pos);
				}
				indentStack.push(indent);
			}

			++pos.line;
		}
	}
}
