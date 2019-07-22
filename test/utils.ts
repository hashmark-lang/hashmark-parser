import { readdirSync, readFileSync } from "fs";
import * as path from "path";

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
	const filePath = path.join("test", "_resources", "input", fileName);
	return readFileSync(filePath).toString();
}

// De-indents a multiline string to match the indentation level of the first line
export function deindent(multiline: string): string {
	const lines = multiline.split(/\r\n|\n|\r/).filter(line => line.trim().length > 0);
	if (lines.length <= 1) {
		return multiline;
	}
	const indentation = lines[0].search(/[^\t]/);
	const deindented = lines.map(line => line.substring(indentation)).join("\n");
	return deindented;
}
