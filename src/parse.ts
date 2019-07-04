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
	/\\(.)/,
	/($)/
];
const INLINE = generateInlineRegex(defaultSchema);

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
	INLINE.lastIndex = 0;
	while (INLINE.lastIndex < input.length) {
		const [
			_,
			text,
			tagName,
			openArg,
			nextArg,
			closeArg,
			escaped,
			end,
			...customMatches
		] = INLINE.exec(input)!;

		if (text) current.push(text);

		if (tagName) {
			const inlineAst = { tag: tagName, arguments: [], closed: false };
			inlineStack.push(inlineAst);
			current.push(inlineAst);
			inInline = true;
			if (openArg) current = appendArg(inlineAst);
		} else if (nextArg) {
			if (inInline) {
				current = appendArg(last(inlineStack));
			} else {
				current.push(nextArg);
			}
		} else if (closeArg) {
			if (inInline) {
				inlineStack.pop()!.closed = true;
				inInline = inlineStack.length > 0;
				current = inInline ? last(last(inlineStack).arguments) : root;
			} else {
				current.push(closeArg);
			}
		} else if (escaped) {
			current.push(escaped);
		} else if (end === undefined) {
			const i = customMatches.findIndex(_ => _ !== undefined);
			const tag = schema.customTokens[i].tag;
			const arg = [customMatches[i]];
			const inlineAst = { tag, arguments: [arg], closed: true };
			current.push(inlineAst);
		}
	}
	return root;
}

function generateInlineRegex(schema: Schema): RegExp {
	const customRegexps = schema.customTokens.map(_ => _.regex);
	const tokens = [...INLINE_TOKENS, ...customRegexps];
	const tokensUnion = tokens.map(_ => `(?:${_.source})`).join("|");
	return new RegExp(`(.*?)(?:${tokensUnion})`, "g");
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
