import { assert } from "chai";
// import * as ts from "typescript";
import { Schema } from "../../src/schema/Schema";
import { convertSchemaToTypescript } from "../../src/schema/typescript";
import { getDocumentSchema, getEmptySchema, getTestSchema } from "../schemas";
import { File, resourceFile } from "../utils";

describe("Typescript", () => {
	const documentSchema = () => new Schema(getDocumentSchema());
	const emptySchema = () => new Schema(getEmptySchema());
	const testSchema = () => new Schema(getTestSchema());

	const expectedDocumentSchema = resourceFile("output", "typescript", "documentSchema.d.ts");
	const expectedEmptySchema = resourceFile("output", "typescript", "emptySchema.d.ts");
	const expectedTestSchema = resourceFile("output", "typescript", "testSchema.d.ts");

	// function assertValidTypescript(file: File) {
	// 	const program = ts.createProgram({
	// 		rootNames: [file.filePath],
	// 		options: {}
	// 	});
	// 	const diagnostics = ts.getPreEmitDiagnostics(program);
	// 	assert.isEmpty(diagnostics, diagnostics.map(d => d.messageText).join(", "));
	// }

	const tests: Array<{ name: string; getSchema: () => Schema; expected: File }> = [
		{ name: "documentSchema", getSchema: documentSchema, expected: expectedDocumentSchema },
		{ name: "emptySchema", getSchema: emptySchema, expected: expectedEmptySchema },
		{ name: "testSchema", getSchema: testSchema, expected: expectedTestSchema }
	];

	for (const { name, getSchema, expected } of tests) {
		describe(name, () => {
			let schema: Schema;
			before(() => (schema = getSchema()));

			// it("expects valid Typescript", function() {
			// 	this.timeout(4000);
			// 	assertValidTypescript(expected);
			// });

			it("produces the expected output", () => {
				const actual = convertSchemaToTypescript(schema);
				assert.strictEqual(actual, expected.read());
			});
		});
	}
});
