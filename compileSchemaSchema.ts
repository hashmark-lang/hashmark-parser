// tslint:disable:no-console
import { writeFileSync } from "fs";
import { convertSchemaToTypescript, Schema, schemaSchema } from "./src";

const path = process.argv[2];
if (!path) {
	console.error("Usage: ts-node compileSchemaSchema.ts <path>");
	console.error("Expected a path argument");
	process.exit(1);
}

try {
	const output = convertSchemaToTypescript(new Schema(schemaSchema), schemaSchema, "..");
	writeFileSync(path, output);
} catch (e) {
	console.error(e);
	process.exit(1);
}
