import { assert } from "chai";
import { Schema, schemaSchema } from "../../src";
import { readSchema } from "../../src/schema/readSchema";
import * as SchemaSchema from "../../src/schema/schemaSchemaInterface";
import { File, makeTestParser, resourceFile } from "../utils";

function parseSchemaFile(file: File): SchemaSchema.Root {
	const parse = makeTestParser(schemaSchema);
	const [errors, tree] = parse(file.read());
	assert.isEmpty(errors, errors.join());
	return (tree as unknown) as SchemaSchema.Root;
}

describe("readSchema()", () => {
	describe("schema_schema.hm", () => {
		const schemaSchemaFile = resourceFile("input", "schema_schema.hm");

		it("produces a valid Schema", () => {
			const root = parseSchemaFile(schemaSchemaFile);
			const schemaDef = readSchema(root);
			assert.doesNotThrow(() => new Schema(schemaDef));
		});

		it("reproduces schemaSchema exactly", () => {
			const root = parseSchemaFile(schemaSchemaFile);
			const schemaDef = readSchema(root);
			assert.deepStrictEqual(schemaDef, schemaSchema);
		});
	});
});
