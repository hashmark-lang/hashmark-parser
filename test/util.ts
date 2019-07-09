import { readdirSync, readFileSync } from "fs";
import * as path from "path";

export class FileInfos {
	readonly path: string;
	readonly content: string;
	constructor(readonly dir: string, readonly name: string, readonly extension: string) {
		this.path = path.join(dir, name + extension);
		this.content = readFileSync(this.path).toString();
	}
}

export function* filesIn(dir: string, extension: string): IterableIterator<FileInfos> {
	for (const file of readdirSync(dir)) {
		if (file.endsWith(extension)) {
			yield new FileInfos(dir, file.slice(0, -extension.length), extension);
		}
	}
}

export function readInputFile(fileName: string): string {
	const filePath = path.join("test", "input", fileName);
	return readFileSync(filePath).toString();
}
