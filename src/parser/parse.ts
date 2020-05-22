import { last } from "../utils";
import { BlockElement, ROOT_TAG } from "../ast/BlockElement";

const LINE_PARTS = /(?:\r\n|\n|\r|^)(\t*)(.*)/gm;
const TAG = /(?:#([^ \[\r\n]+)(?: |$))?(.+)?/;

export function parse(input: string): BlockElement[] {
	const root: BlockElement = new BlockElement(ROOT_TAG, null);
	const blockStack: BlockElement[] = [root];
	const indentStack = [0];
	const lineNumberStack = [0];
	let line = 0;
	for (const [, indentString, lineContent] of input.matchAll(LINE_PARTS)) {
		++line;
		if (!lineContent) continue;
		const indent = indentString.length;
		while (indentStack.length > 1 && indent <= last(indentStack)) {
			blockStack.pop();
			indentStack.pop();
			lineNumberStack.pop();
		}
		blockStack.length = indentStack.length;
		const [, tag, label] = TAG.exec(lineContent)!;
		const lineDelta = line - lineNumberStack.pop()!;
		const tagStart = indent + 1;
		const tagEnd = tagStart + (tag ? tag.length + 1 : 0);
		const labelStart = tagEnd + (tag ? 1 : 0);
		const labelEnd = labelStart + (label ? label.length : 0);
		const element = new BlockElement(tag || null, label || null, lineDelta, tagStart, tagEnd, labelStart, labelEnd);
		last(blockStack).children.push(element);
		blockStack.push(element);
		indentStack.push(indent);
		lineNumberStack.push(line);
		lineNumberStack.push(line);
	}
	return root.children;
}
