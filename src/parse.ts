export type Line = Array<string | Inline>;

export interface Block {
	tag: string;
	head: Line;
	children: Block[];
}

export interface Inline {
	tag: string;
	arguments: Line[];
	closed: boolean;
}

const LB = /\r\n|\n|\r/;
const LINE_PARTS = /^(\t*)[\t ]*(?:#([^ \[]+)(?: |$))?(.*)/;
const INLINE_TOKEN = /(\\.|\${1,2}[^$]*\${1,2}|\*[^*]*\*|#(?:[^ \[]+)\[?|]\[|])/;
const TAG = /#([^ \[]+)\[?/;
const ESCAPED = ["\\", "]", "[", "#"];

export default function parse(input: string): Block {
	let depth = 0;
	const root: Block = { tag: "root", children: [], head: [] };
	const stack = [root];
	let current = root;
	for (const line of input.split(LB)) {
		const [_, indent, tagName, lineContent] = LINE_PARTS.exec(line)!;
		if (!tagName && !lineContent) continue;
		for (let i = 0; i < depth - indent.length; ++i) stack.pop();
		current = last(stack);
		const tag = tagName || "_default";
		const head = parseLine(lineContent);
		const block = { tag, head, children: [] };
		current.children.push(block);
		stack.push(block);
		depth = indent.length + 1;
	}
	return root;
}

export function parseLine(input: string): Line {
	const root: Line = [];
	const inlineStack: Inline[] = [];
	let current: Line = root;
	let inInline = false;
	const tokens = input.split(INLINE_TOKEN);
	for (const token of tokens) {
		if (!token) continue;
		if (token[0] === "#") {
			const [_, tagName] = TAG.exec(token)!;
			const inlineAst = { tag: tagName, arguments: [], closed: false };
			inlineStack.push(inlineAst);
			current.push(inlineAst);
			inInline = true;
			if (token[token.length - 1] === "[") current = appendArg(inlineAst);
		} else if (inInline && token === "][") {
			current = appendArg(last(inlineStack));
		} else if (inInline && token === "]") {
			inlineStack.pop()!.closed = true; // TODO nicer error message
			inInline = inlineStack.length > 0;
			current = inInline ? last(last(inlineStack).arguments) : root;
		} else {
			const text = token[0] === "\\" && ESCAPED.includes(token[1]) ? token[1] : token;
			current.push(text);
		}
	}
	return root;
}

function last<T>(array: T[]): T {
	return array[array.length - 1];
}

function appendArg(inlineAst: Inline): Line {
	const arg: Line = [];
	inlineAst.arguments.push(arg);
	return arg;
}
