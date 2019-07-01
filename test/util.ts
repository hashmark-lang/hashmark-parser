import * as assert from "assert";
import { readdirSync, readFileSync } from "fs";

export class FileInfos {
	readonly path: string;
	readonly content: string;
	constructor(readonly dir: string, readonly name: string, readonly extension: string) {
		this.path = dir + "/" + name + extension;
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
