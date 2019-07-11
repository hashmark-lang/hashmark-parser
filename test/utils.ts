import { readdirSync, readFileSync } from "fs";
import * as path from "path";
import { BlockElement } from "../src/ast";
import { parse } from "../src/Parser";

export class FileInfo {
	readonly path: string;
	constructor(readonly dir: string, readonly name: string, readonly extension: string) {
		this.path = path.join(dir, name + extension);
	}

	readContent(): string {
		return readFileSync(this.path).toString();
	}
}

export function* filesIn(dir: string, extension: string): IterableIterator<FileInfo> {
	for (const file of readdirSync(dir)) {
		if (file.endsWith(extension)) {
			yield new FileInfo(dir, file.slice(0, -extension.length), extension);
		}
	}
}

export function readInputFile(fileName: string): string {
	const filePath = path.join("test", "input", fileName);
	return readFileSync(filePath).toString();
}

// Tagged literal
export function hm(literals: TemplateStringsArray, ...placeholders: string[]): BlockElement {
	let result = "";
	for (let i = 0; i < placeholders.length; ++i) {
		result += literals[i];
		result += placeholders[i];
	}
	result += literals[literals.length - 1];
	const lines = result.split(/\r\n|\n|\r/).filter(line => line.trim().length > 0);
	if (lines.length <= 1) {
		return parse(result);
	}
	const indentation = lines[0].search(/[^\t]/);
	const deindented = lines.map(line => line.substring(indentation)).join("\n");
	return parse(deindented);
}
