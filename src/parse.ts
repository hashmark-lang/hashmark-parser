import { Block, Inline, Line } from "./ast";
import { defaultSchema, Schema } from "./schema";

const LB = /\r\n|\n|\r/;
// e.g. '	#name Hello world'
// $1: indent ('\t')
// $2: tagName ('name')
// $3: lineContent (Hello world)
const LINE_PARTS = /^(\t*)[\t ]*(?:#([^ \[]+)(?: |$))?(.*)/;
const INLINE_TOKENS = [
	// e.g. '#name['
	// $1: tagName ('name')
	// $2: openArg ('[')
	/#([^ \[]+)(\[)?/,
	// $1: nextArg(`][`)
	/(]\[)/,
	// $1: closeArg (']')
	/(])/,
	// $1: escaped ('\\', '[', ']' or '#')
	/\\(.)/
];
const enum INLINE_TOKEN {
	text,
	tagName,
	openArg,
	nextArg,
	closeArg,
	escaped,
	_size
}

export function parse(input: string, schema: Schema = defaultSchema): Block {
	let depth = 0;
	const root: Block = { tag: "root", children: [], head: [] };
	const stack = [root];
	let current = root;
	const parseLine = makeParseLine(schema);
	for (const line of input.split(LB)) {
		const [_, indent, tagName, lineContent] = LINE_PARTS.exec(line)!;
		if (!tagName && !lineContent) continue;
		for (let i = 0; i < depth - indent.length; ++i) stack.pop();
		current = last(stack);
		const tag = tagName || schema.getDefault(current.tag);
		const head = parseLine(lineContent);
		const block = { tag, head, children: [] };
		current.children.push(block);
		stack.push(block);
		depth = indent.length + 1;
	}
	return root;
}

function makeParseLine(schema: Schema): (input: string) => Line {
	const TOKEN_COUNT = INLINE_TOKEN._size + schema.customTokens.length;
	const INLINE = generateInlineRegex(schema);

	return (input: string): Line => {
		const root: Line = [];
		const inlineStack: Inline[] = [];
		let current: Line = root;
		let inInline = false;
		const tokens = input.split(INLINE);
		for (let i = 0; i < tokens.length; ++i) {
			const token = tokens[i];
			if (!token) continue;
			switch (i % TOKEN_COUNT) {
				case INLINE_TOKEN.text:
				case INLINE_TOKEN.escaped:
					current.push(token);
					break;
				case INLINE_TOKEN.tagName:
					const inlineAst = { tag: token, arguments: [], closed: false };
					inlineStack.push(inlineAst);
					current.push(inlineAst);
					inInline = true;
					break;
				case INLINE_TOKEN.openArg:
				case INLINE_TOKEN.nextArg:
					if (inInline) {
						current = appendArg(last(inlineStack));
					} else {
						current.push(token);
					}
					break;
				case INLINE_TOKEN.closeArg:
					if (inInline) {
						inlineStack.pop()!.closed = true;
						inInline = inlineStack.length > 0;
						current = inInline ? last(last(inlineStack).arguments) : root;
					} else {
						current.push(token);
					}
					break;
				default:
					const tag = schema.customTokens[i - INLINE_TOKEN._size].tag;
					current.push({ tag, arguments: [[token]], closed: true });
					break;
			}
		}
		return root;
	};
}

function generateInlineRegex(schema: Schema): RegExp {
	const customRegexps = schema.customTokens.map(_ => _.regex);
	const tokens = [...INLINE_TOKENS, ...customRegexps];
	const tokensUnion = tokens.map(_ => `(?:${_.source})`).join("|");
	return new RegExp(tokensUnion, "g");
}

function last<T>(seq: { [index: number]: T; length: number }): T {
	return seq[seq.length - 1];
}

function appendArg(inlineAst: Inline): Line {
	const arg: Line = [];
	inlineAst.arguments.push(arg);
	return arg;
}
