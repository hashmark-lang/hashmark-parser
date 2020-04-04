import { assert } from "chai";
import {
	CardinalityError,
	DisallowedDefaultTagError,
	HMError,
	SchemaDefinition,
	TooFewArgsError,
	UnknownBlockTagError,
	UnknownInlineTagError,
} from "../../src";
import { IRNode } from "../../src/ir/IRNode";
import { lineTag, prop, root } from "../../src/schema/schema-generators";
import { getDinosSchema, getDocumentSchema, getEmptySchema, getTestSchema } from "../schemas";
import { filePairs, makeTestParser, resourceFile } from "../utils";

function assertError(errors: HMError[], expected: Function): void {
	const error = errors.find((err) => err instanceof expected);
	assert.exists(error, `Expected to see a ${expected.name} error in ${errors.join(", ")}`);
}

describe("IRHandler", () => {
	describe("Schemas", () => {
		const testSchemas: Array<{ name: string; getSchema: () => SchemaDefinition }> = [
			{ name: "empty-schema", getSchema: getEmptySchema },
			{ name: "test-schema", getSchema: getTestSchema },
			{ name: "document-schema", getSchema: getDocumentSchema },
			{ name: "dino-schema", getSchema: getDinosSchema },
		];

		for (const { name, getSchema } of testSchemas) {
			describe(name, () => {
				let parse: (input: string) => [HMError[], IRNode];
				beforeEach(() => (parse = makeTestParser(getSchema())));

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
		let emptyParser: (input: string) => [HMError[], IRNode];
		let documentParser: (input: string) => [HMError[], IRNode];

		beforeEach(() => {
			emptyParser = makeTestParser(getEmptySchema());
			documentParser = makeTestParser(getDocumentSchema());
		});

		describe("UnknownBlockTagError", () => {
			it("is returned when a block is used in empty schema", () => {
				const input = resourceFile("input", "block_tag.hm").read();
				const [errors] = emptyParser(input);
				assertError(errors, UnknownBlockTagError);
			});

			it("is returned when an unknown block is used", () => {
				const input = resourceFile("input", "nested_blocks.hm").read();
				const [errors] = documentParser(input);
				assertError(errors, UnknownBlockTagError); // #def is not in document schema
			});
		});

		describe("DisallowedDefaultTagError", () => {
			it("is returned when a disallowed default is used", () => {
				const input = resourceFile("input", "paragraphs.hm").read();
				const [errors] = emptyParser(input);
				assertError(errors, DisallowedDefaultTagError);
			});
		});

		describe("UnknownInlineError", () => {
			it("is returned when an unknown inline element is used", () => {
				const input = "#unknown[inline]";
				const [errors] = documentParser(input);
				assertError(errors, UnknownInlineTagError);
			});
		});

		describe("TooFewArgsError", () => {
			it("is returned when 1 arg is given instead of two", () => {
				const input = "#link[http://google.com]";
				const [errors] = documentParser(input);
				assertError(errors, TooFewArgsError);
			});

			it("is not returned when the right number of args is given", () => {
				const input = "#link[http://google.com][Google]";
				const [errors] = documentParser(input);
				assert.isEmpty(errors);
			});
		});

		describe("CardinalityError", () => {
			const tests = [
				{ cardinality: { min: 1, max: 1 }, accepts: [false, true, false] },
				{ cardinality: { min: 1, max: Infinity }, accepts: [false, true, true] },
				{ cardinality: { min: 0, max: 1 }, accepts: [true, true, false] },
				{ cardinality: { min: 0, max: Infinity }, accepts: [true, true, true] },
			];

			for (const { cardinality, accepts } of tests) {
				describe(`{ min: ${cardinality.min}, max: ${cardinality.max} }`, () => {
					let parse: (input: string) => [HMError[], IRNode];
					beforeEach(() => {
						parse = makeTestParser({
							root: root(prop("content", { ["child"]: cardinality })),
							blocks: {
								["child"]: lineTag("head", []),
							},
							inline: {},
						});
					});

					accepts.forEach((accept, index) => {
						it(`${index} elements are ${accept ? "accepted" : "not accepted"}`, () => {
							const input = "#child test\n".repeat(index);
							const [errors] = parse(input);
							if (accept) {
								assert.isEmpty(errors);
							} else {
								assertError(errors, CardinalityError);
							}
						});
					});
				});
			}
		});
	});
});
