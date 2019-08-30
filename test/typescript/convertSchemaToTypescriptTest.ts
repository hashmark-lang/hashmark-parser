import { assert } from "chai";
import { SchemaDefinition } from "../../src";
import { Schema } from "../../src/schema/Schema";
import { convertSchemaToTypescript } from "../../src/typescript/convertSchemaToTypescript";
import { getDocumentSchema, getEmptySchema, getTestSchema } from "../schemas";
import { File, resourceFile } from "../utils";

describe("convertSchemaToTypescript()", () => {
	const expectedDocumentSchema = resourceFile("output", "typescript", "documentSchema.ts");
	const expectedEmptySchema = resourceFile("output", "typescript", "emptySchema.ts");
	const expectedTestSchema = resourceFile("output", "typescript", "testSchema.ts");

	const tests: Array<{ name: string; getSchema: () => SchemaDefinition; expected: File }> = [
		{ name: "documentSchema", getSchema: getDocumentSchema, expected: expectedDocumentSchema },
		{ name: "emptySchema", getSchema: getEmptySchema, expected: expectedEmptySchema },
		{ name: "testSchema", getSchema: getTestSchema, expected: expectedTestSchema }
	];

	for (const { name, getSchema, expected } of tests) {
		describe(name, () => {
			let schema: Schema;
			let definition: SchemaDefinition;

			before(() => {
				definition = getSchema();
				schema = new Schema(definition);
			});

			it("produces the expected output", () => {
				const actual = convertSchemaToTypescript(schema, definition, "../../../../src");
				assert.strictEqual(actual, expected.read());
			});
		});
	}
});
