import { assert } from "chai";
import {
	DisallowedDefaultTagError,
	HMError,
	UnknownBlockTagError,
	UnknownInlineTagError
} from "../../src";
import { IRNode } from "../../src/ir/IRNode";
import { getDocumentSchema, getEmptySchema, getTestSchema } from "../schemas";
import { filePairs, makeTestParser, resourceFile } from "../utils";

// tslint:disable-next-line:ban-types
function assertError(result: HMError[] | IRNode, expected: Function) {
	assert.instanceOf(result, Array, "Expected the result to be a list of errors");
	const error = (result as HMError[]).find(err => err instanceof expected);
	assert.exists(error, `Expected to see a ${expected.name} error`);
}

describe("IRHandler", () => {
	let parse: (input: string) => [HMError[], IRNode];

	const testSchemas = [
		{ name: "test-schema", schemaGetter: getTestSchema },
		{ name: "empty-schema", schemaGetter: getEmptySchema },
		{ name: "document-schema", schemaGetter: getDocumentSchema }
	];

	describe("Schemas", () => {
		for (const { name, schemaGetter } of testSchemas) {
			describe(name, () => {
				before(() => (parse = makeTestParser(schemaGetter())));

				for (const [input, output] of filePairs(`ir/${name}`, ".json")) {
					it(`works with ${input.name}`, () => {
						const [, result] = parse(input.read());
						const expected = JSON.parse(output.read());
						assert.strictEqual(
							JSON.stringify(result, null, "\t"),
							JSON.stringify(expected, null, "\t")
						);
					});
				}
			});
		}
	});

	describe("ValidationError", () => {
		describe("UnknownBlockTagError", () => {
			it("is returned when a block is used in empty schema", () => {
				before(() => (parse = makeTestParser(getEmptySchema())));
				const input = resourceFile("input", "block_tag.hm").read();
				const [errors] = parse(input);
				assertError(errors, UnknownBlockTagError);
			});

			it("is returned when an unknown block is used", () => {
				before(() => (parse = makeTestParser(getDocumentSchema())));
				const input = resourceFile("input", "nested_blocks.hm").read();
				const [errors] = parse(input);
				assertError(errors, UnknownBlockTagError); // #def is not in document schema
			});
		});

		describe("DisallowedDefaultTagError", () => {
			it("is returned when a disallowed default is used", () => {
				before(() => (parse = makeTestParser(getEmptySchema())));
				const input = resourceFile("input", "paragraphs.hm").read();
				const [errors] = parse(input);
				assertError(errors, DisallowedDefaultTagError);
			});
		});

		describe("UnknownInlineError", () => {
			it("is returned when an inline element is used in empty schema", () => {
				before(() => (parse = makeTestParser(getEmptySchema())));
				const input = resourceFile("input", "inline_start_of_line.hm").read();
				const [errors] = parse(input);
				assertError(errors, UnknownInlineTagError);
			});
		});
	});
});
