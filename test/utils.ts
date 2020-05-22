import { readdirSync, readFileSync, existsSync, writeFileSync, mkdirSync } from "fs";
import * as path from "path";
import * as assert from "assert";

export class File {
	constructor(readonly filePath: string) {}

	get directory(): string {
		return path.dirname(this.filePath);
	}

	get name(): string {
		return path.basename(this.filePath, this.extension);
	}

	get extension(): string {
		return path.extname(this.filePath);
	}

	get exists(): boolean {
		return existsSync(this.filePath);
	}

	write(content: string): void {
		mkdirSync(this.directory, { recursive: true });
		return writeFileSync(this.filePath, content, { encoding: "utf-8" });
	}

	read(): string {
		return readFileSync(this.filePath, { encoding: "utf-8" }).toString();
	}
}

export function testSnapshots(dir: string, f: (input: string) => any) {
	const pairs = filesIn(resourcePath("input", dir)).map(file => [
		file,
		resourceFile("output", dir, file.name + ".json")
	]);
	for (const [input, output] of pairs) {
		it(input.name, () => {
			const actual = JSON.stringify(f(input.read()), null, 4);
			if (!output.exists) {
				output.write(actual);
				throw new Error(`Snapshot ${output.filePath} did not exist. Created it.`);
			}
			const expected = output.read().trim();
			assert.strictEqual(actual, expected);
		});
	}
}

export function filesIn(dir: string): File[] {
	return readdirSync(dir, { encoding: "utf-8" })
		.filter(filename => !filename.startsWith("."))
		.map(fileName => new File(path.join(dir, fileName)));
}

export function resourcePath(...paths: string[]): string {
	return path.join("test", "_resources", ...paths);
}

export function resourceFile(...paths: string[]): File {
	return new File(resourcePath(...paths));
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
