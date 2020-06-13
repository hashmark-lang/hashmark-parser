import { BlockElement } from "../ast/BlockElement";
import { ErrorsMap } from "./ErrorsMap";

export function printBlockErrors(els: BlockElement[], errors: ErrorsMap, line: number = 0, depth: number = 0) {
	let output = "";
	for (const el of els) {
		line += el.lineDelta;
		const indent = "\t".repeat(depth); // Do we really want to indent? Maybe a constant indent?
		if (errors.tagErrors.has(el)) {
			output += `Line ${line}: ${errors.tagErrors.get(el)}:\n`;
			output += indent + el.source + "\n";
			const length = el.tag ? el.tagSource.length - 1 : 1; // What length for null tags?
			output += indent + colIndicator(0, length) + "\n\n";
		}
		if (errors.labelErrors.has(el)) {
			output += `Line ${line}: ${errors.labelErrors.get(el)}:\n`;
			output += indent + el.source + "\n";
			output += indent + colIndicator(el.tagSource.length, el.labelSource.length) + "\n\n";
		}
		if()
		output += printBlockErrors(el.children, errors, line, depth + 1);
	}
	return output;
}

// The error position is indicated by "^^^^" under it:
function colIndicator(start: number, length: number): string {
	return " ".repeat(start) + "^".repeat(length);
}
