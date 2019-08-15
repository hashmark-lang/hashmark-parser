import { assert } from "chai";
import {
	CardinalityError,
	DisallowedDefaultTagError,
	HMError,
	ROOT,
	UnknownBlockTagError,
	UnknownInlineTagError
} from "../../src";
import { IRNode } from "../../src/ir/IRNode";
import { Cardinality } from "../../src/schema/Cardinality";
import { prop } from "../../src/schema/schema-generators";
import { getDocumentSchema, getEmptySchema, getTestSchema } from "../schemas";
import { filePairs, makeTestParser, resourceFile } from "../utils";

// tslint:disable-next-line:ban-types
function assertError(errors: HMError[], expected: Function) {
	const error = errors.find(err => err instanceof expected)!;
	assert.exists(error, `Expected to see a ${expected.name} error`);
}

describe("IRHandler", () => {
	let parse: (input: string) => [HMError[], IRNode];

	describe("Schemas", () => {
		const testSchemas = [
			{ name: "test-schema", schemaGetter: getTestSchema },
			{ name: "empty-schema", schemaGetter: getEmptySchema },
			{ name: "document-schema", schemaGetter: getDocumentSchema }
		];

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

		describe("CardinalityError", () => {
			const tests = [
				{ cardinality: Cardinality.One, accepts: [false, true, false] },
				{ cardinality: Cardinality.OneOrMore, accepts: [false, true, true] },
				{ cardinality: Cardinality.Optional, accepts: [true, true, false] },
				{ cardinality: Cardinality.ZeroOrMore, accepts: [true, true, true] }
			];

			for (const { cardinality, accepts } of tests) {
				describe(cardinality, () => {
					beforeEach(() => {
						parse = makeTestParser({
							blocks: {
								[ROOT]: {
									props: [prop("content", [{ tag: "child", cardinality }])]
								},
								["child"]: {
									head: { name: "head", content: [] },
									props: []
								}
							},
							inline: {}
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
