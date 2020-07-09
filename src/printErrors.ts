import { BlockElement } from "./ast/BlockElement";
import { InlineContent } from "./ast/InlineContent";
import { SpanElement } from "./ast/SpanElement";

export function printErrors(root: BlockElement) {
	let output = "";
	let line = 0;
	for (const child of root.children) {
		line += child.lineDelta;
		output += printBlockErrors(child, line, 0);
	}
	return output;
}

function printBlockErrors(el: BlockElement, line: number = 0, depth: number = -1) {
	let output = "";
	const indent = "\t".repeat(depth); // Do we really want to indent? Maybe a constant indent?
	if (el.tagError) {
		output += `Line ${line}: ${el.tagError}:\n`;
		output += indent + el.source + "\n";
		const length = el.tag ? el.tagSource.length - 1 : 1; // What length for null tags?
		output += indent + colIndicator(0, length) + "\n";
	}
	if (el.labelError) {
		output += `Line ${line}: ${el.labelError}:\n`;
		output += indent + el.source + "\n";
		output += indent + colIndicator(el.tagSource.length, el.labelSource.length) + "\n";
	}
	output += printInlineErrors(el.parsedLabel, line, el.tagSource.length, indent, el.source);
	for (const child of el.children) {
		line += child.lineDelta;
		output += printBlockErrors(child, line, depth + 1);
	}
	return output;
}

function printInlineErrors(content: InlineContent, line: number, column: number, indent: string, lineSource: string) {
	let output = "";
	if (content.error) {
		output += `Line ${line}: ${content.error}:\n`;
		output += indent + lineSource + "\n";
		output += indent + colIndicator(column, content.source.length) + "\n";
	}
	for (const el of content.content) {
		if (typeof el === "string") {
			column += el.length;
		} else {
			output += printSpanErrors(el, line, column, indent, lineSource);
			column += el.source.length;
		}
	}
	return output;
}

function printSpanErrors(el: SpanElement, line: number, column: number, indent: string, lineSource: string) {
	let output = "";
	if (el.error) {
		output += `Line ${line}: ${el.error}:\n`;
		output += indent + lineSource + "\n";
		output += indent + colIndicator(column, el.source.length) + "\n";
	}
	if (el.sugar) {
		column += 1;
		output += printInlineErrors(el.args[0], line, column, indent, lineSource);
		column += el.args[0].source.length;
	} else {
		column += 1 + el.tag.length;
		for (const arg of el.args) {
			column += 1;
			output += printInlineErrors(arg, line, column, indent, lineSource);
			column += arg.source.length;
			column += 1;
		}
	}
	return output;
}

// The error position is indicated by "^^^^" under it:
function colIndicator(start: number, length: number): string {
	return " ".repeat(start) + "^".repeat(length);
}
