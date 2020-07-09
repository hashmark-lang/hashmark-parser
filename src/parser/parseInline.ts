import { InlineContent } from "../ast/InlineContent";
import { SpanElement } from "../ast/SpanElement";
import { last } from "../utils";

const INLINE_TOKEN = /(\\.|#(?:[^ \[]+)\[?|]\[|[\]*_$`])/;
const DEFAULT_SUGARS = new Map([["*", "strong"], ["_", "emphasis"], ["`", "code"], ["$", "math"]]);

export function parseInline(input: string, sugars: Map<string, string> = DEFAULT_SUGARS): InlineContent {
	const root = new InlineContent();
	const stack: SpanElement[] = [];
	let current = root;
	let inInline = false;
	let currentSugar = null;
	let isText = false;
	const tokens = input.split(INLINE_TOKEN);
	for (const token of tokens) {
		// Every second token is plain text (that's what returns string.split() with a matching group).
		isText = !isText;
		if (!token) {
			continue;
		} else if (isText) {
			// Just plain text to append to the content.
			current.content.push(token);
		} else if (token[0] == "\\") {
			// An escaped character.
			current.content.push(token[1]);
		} else if (currentSugar == token) {
			// Close a sugared element (ex: ...*...).
			current = stack.length > 0 ? last(last(stack).args) : root;
			currentSugar = null;
		} else if (currentSugar) {
			// This token doesn't have a special meaning inside a sugar, so we push it as plain text.
			// Tokens that have an effect (escaped character or sugar end) have been handled in the two previous cases.
			current.content.push(token);
		} else if (token[0] === "#") {
			// Start a new element (ex: ...#cite[...).
			const endsWithBracket = last(token) === "[";
			const tag = token.slice(1, endsWithBracket ? -1 : undefined);
			const element: SpanElement = new SpanElement(tag);
			current.content.push(element);
			if (token[token.length - 1] === "[") {
				current = element.addArg();
				inInline = true;
				stack.push(element);
			}
		} else if (inInline && token === "][") {
			// Next argument of the element (...][...).
			current = last(stack).addArg();
		} else if (inInline && token === "]") {
			// Close the element (...]...).
			stack.pop();
			inInline = stack.length > 0;
			current = inInline ? last(last(stack).args) : root;
		} else if (sugars.has(token)) {
			// Open a sugared element (ex: ...*...).
			// This is last because the map lookup is the most costly case.
			const element: SpanElement = new SpanElement(sugars.get(token)!, token);
			current.content.push(element);
			current = element.addArg();
			// Sugared elements cannot have children, so we don't need to push them on the stack.
			currentSugar = token;
		} else {
			current.content.push(token);
		}
	}
	return root;
}
