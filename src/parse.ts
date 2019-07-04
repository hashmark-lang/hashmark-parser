import { Block, Inline, Line } from "./ast";
import { defaultSchema, Schema } from "./schema";

const LB = /\r\n|\n|\r/;
const LINE_PARTS = /^(\t*)[\t ]*(?:#([^ \[]+)(?: |$))?(.*)/;
const INLINE_TOKENS = [
	/(#[^ \[]+\[?)/, // '#inline[' or '#inline'
	/(]\[)/, // `][`
	/(])/, // ']'
	/\\([\\[\]#])/ // '\\', '[', ']' or '\#'
];
const TAG = /#([^ \[]+)\[?/;

export function parse(input: string, schema: Schema = defaultSchema): Block {
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
		const head = parseLine(lineContent, schema);
		const block = { tag, head, children: [] };
		current.children.push(block);
		stack.push(block);
		depth = indent.length + 1;
	}
	return root;
}

export function parseLine(input: string, schema: Schema): Line {
	const root: Line = [];
	const inlineStack: Inline[] = [];
	let current: Line = root;
	let inInline = false;
	const tokens = input.split(generateInlineRegex(schema));
	for (const token of tokens) {
		if (!token) continue;
		if (token[0] === "#" && token.length >= 2) {
			const [_, tagName] = TAG.exec(token)!;
			const inlineAst = { tag: tagName, arguments: [], closed: false };
			inlineStack.push(inlineAst);
			current.push(inlineAst);
			inInline = true;
			if (last(token) === "[") current = appendArg(inlineAst);
		} else if (inInline && token === "][") {
			current = appendArg(last(inlineStack));
		} else if (inInline && token === "]") {
			inlineStack.pop()!.closed = true; // TODO nicer error message
			inInline = inlineStack.length > 0;
			current = inInline ? last(last(inlineStack).arguments) : root;
		} else if (token[0] in schema.inlineDelimiters && token.length >= 3) {
			const tag = schema.inlineDelimiters[token[0]];
			const inlineAst = { tag, arguments: [[token.slice(1, -1)]], closed: true };
			current.push(inlineAst);
		} else {
			current.push(token);
		}
	}
	return root;
}

function generateInlineRegex(schema: Schema): RegExp {
	const DELIMITED = Object.keys(schema.inlineDelimiters).map(_ => `(${_}.+?${_})`);
	return new RegExp([...INLINE_TOKENS.map(_ => _.source), ...DELIMITED].join("|"));
}

function last(str: string): string;
function last<T>(array: T[]): T;
function last(seq: any): any {
	return seq[seq.length - 1];
}

function appendArg(inlineAst: Inline): Line {
	const arg: Line = [];
	inlineAst.arguments.push(arg);
	return arg;
}
