import { AnySchema, Block, Inline, Line, Schema, Tag } from "./schema";
import { Tree } from "ts-tree";

const LB = /\r\n|\n|\r/;
const LINE_PARTS = /^(\t*)[\t ]*(#([^ \[]+)(?: |$))?(.*)/;
const INLINE_TOKEN = /(\\.|#(?:[^ \[]+)\[?|]\[|])/;
const TAG = /#([^ \[]+)\[?/;
const ESCAPED = ["\\", "]", "[", "#"];

export function parse(lines: string, schema: Schema = new AnySchema()): Block {
	let depth = 0;
	const root: Block = new Tree({ tag: schema.getTag("root"), tagText: "", head: [] });
	let current = root;
	for (const line of lines.split(LB)) {
		const [_, indent, tagText, tagName, lineContent] = LINE_PARTS.exec(line)!;
		if (!tagName && !lineContent) continue;
		current = getNthAncestor(depth - indent.length, current);
		const tag = tagName ? schema.getTag(tagName) : schema.getDefault(current.value.tag);
		const head = parseLine(lineContent, schema);
		current = current.appendChild(new Tree({ tag, tagText: tagText || "", head }));
		depth = indent.length + 1;
	}
	return root;
}

export function parseLine(lineContent: string, schema: Schema): Line {
	const root: Line = [];
	const inlineStack: Inline[] = [];
	let current: Line = root;
	let inInline = false;
	const tokens = lexLine(lineContent);
	for (const token of tokens) {
		if (!token) continue;
		if (token[0] === "#") {
			const [_, tagName] = TAG.exec(token)!;
			const inlineAst: Inline = { tag: schema.getTag(tagName), arguments: [], closed: false };
			inlineStack.push(inlineAst);
			current.push(inlineAst);
			inInline = true;
			if (token[token.length - 1] === "[") current = appendArg(inlineAst);
		} else if (inInline && token === "][") {
			current = appendArg(last(inlineStack));
		} else if (inInline && token === "]") {
			inlineStack.pop()!.closed = true;
			inInline = inlineStack.length > 0;
			current = inInline ? last(last(inlineStack).arguments) : root;
		} else {
			const text = token[0] === "\\" && ESCAPED.includes(token[1]) ? token[1] : token;
			current.push(text);
		}
	}
	return root;
}

function last<T>(array: T[]) {
	return array[array.length - 1];
}

function appendArg(inlineAst: Inline): Line {
	const arg: Line = [];
	inlineAst.arguments.push(arg);
	return arg;
}

function getNthAncestor<V>(n: number, tree: Block) {
	for (let i = 0; i < n; ++i) {
		if (!tree.parent) throw new Error("Non-existent ancestor");
		tree = tree.parent;
	}
	return tree;
}

function lexLine(lineContent: string): string[] {
	return lineContent.split(INLINE_TOKEN);
}
