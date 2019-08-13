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

	describe("test-schema", () => {
		before(() => (parse = makeTestParser(getTestSchema())));
		testOutput("test-schema");
	});

	describe("empty-schema", () => {
		before(() => (parse = makeTestParser(getEmptySchema())));

		it("logs UnknownBlockTagError when a block is used", () => {
			const input = resourceFile("input", "block_tag.hm").read();
			const [errors] = parse(input);
			assertError(errors, UnknownBlockTagError);
		});

		it("logs DisallowedDefaultTagError when a default is used", () => {
			const input = resourceFile("input", "paragraphs.hm").read();
			const [errors] = parse(input);
			assertError(errors, DisallowedDefaultTagError);
		});

		testOutput("empty-schema");
	});

	describe("document-schema", () => {
		before(() => (parse = makeTestParser(getDocumentSchema())));

		it("logs UnknownBlockTagError when an unknown block is used", () => {
			const input = resourceFile("input", "nested_blocks.hm").read();
			const [errors] = parse(input);
			assertError(errors, UnknownBlockTagError); // #def is not in document schema
		});

		it("logs UnknownInlineError when an inline element is used", () => {
			const input = resourceFile("input", "inline_start_of_line.hm").read();
			const [errors] = parse(input);
			assertError(errors, UnknownInlineTagError);
		});

		testOutput("document-schema");
	});

	function testOutput(folder: string) {
		for (const [input, output] of filePairs(`ir/${folder}`, ".json")) {
			it(`works with ${input.name}`, () => {
				const [, result] = parse(input.read());
				const expected = JSON.parse(output.read());
				assert.strictEqual(
					JSON.stringify(result, null, "\t"),
					JSON.stringify(expected, null, "\t")
				);
			});
		}
	}
});
