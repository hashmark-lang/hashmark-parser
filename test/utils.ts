import { readdirSync, readFileSync } from "fs";
import * as path from "path";
import { HMError } from "../src";
import { IRNode } from "../src/ir/IRNode";
import { makeParser } from "../src/parser/parse";
import { SchemaDefinition } from "../src/schema/SchemaDefinition";

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

	read(): string {
		return readFileSync(this.filePath).toString();
	}
}

export function filePairs(
	outputDir: string,
	outputExtension: string,
	inputExtension: string = ".hm"
): Array<[File, File]> {
	return filesIn(resourcePath("output", outputDir))
		.filter((file) => file.extension === outputExtension)
		.map((file) => [resourceFile("input", file.name + inputExtension), file]);
}

export function filesIn(dir: string): File[] {
	return readdirSync(dir, { encoding: "utf-8" }).map(
		(fileName) => new File(path.join(dir, fileName))
	);
}

export function resourcePath(...paths: string[]): string {
	return path.join("test", "_resources", ...paths);
}

export function resourceFile(...paths: string[]): File {
	return new File(resourcePath(...paths));
}

// De-indents a multiline string to match the indentation level of the first line
export function deindent(multiline: string): string {
	const lines = multiline.split(/\r\n|\n|\r/).filter((line) => line.trim().length > 0);
	if (lines.length <= 1) {
		return multiline;
	}
	const indentation = lines[0].search(/[^\t]/);
	const deindented = lines.map((line) => line.substring(indentation)).join("\n");
	return deindented;
}

export function makeTestParser(schema: SchemaDefinition): (input: string) => [HMError[], IRNode] {
	const errors: HMError[] = [];
	const logger = (error: HMError): void => {
		errors.push(error);
	};
	const parse = makeParser(schema, logger);
	return (input: string) => {
		errors.length = 0;
		const result = parse(input);
		return [errors, result];
	};
}
