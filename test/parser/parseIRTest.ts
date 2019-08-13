import { assert } from "chai";
import {
	DisallowedDefaultTagError,
	HMError,
	UnknownBlockTagError,
	UnknownInlineTagError
} from "../../src";
import { IRNode } from "../../src/ir/IRNode";
import {
	inlineProp,
	prop,
	rawInlineProp,
	rawTag,
	sugar,
	zeroOrMore
} from "../../src/schema/schema-generators";
import {
	Cardinality,
	INVALID_TAG,
	ROOT,
	SchemaDefinition
} from "../../src/schema/SchemaDefinition";
import { filePairs, makeTestParser, resourceFile } from "../utils";

// tslint:disable-next-line:ban-types
function assertError(result: HMError[] | IRNode, expected: Function) {
	assert.instanceOf(result, Array, "Expected the result to be a list of errors");
	const error = (result as HMError[]).find(err => err instanceof expected);
	assert.exists(error, `Expected to see a ${expected.name} error`);
}

describe("IRHandler", () => {
	let parse: (input: string) => [HMError[], IRNode];

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

	describe("allow-all-schema", () => {
		before(() => (parse = makeTestParser(getAllowAllSchema())));

		testOutput("allow-all-schema");
	});

	function testOutput(folder: string) {
		for (const [input, output] of filePairs(`parser-ir/${folder}`, ".json")) {
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

function getAllowAllSchema(): SchemaDefinition {
	const blockProps = [
		{ name: "children", content: [{ tag: INVALID_TAG, cardinality: Cardinality.ZeroOrMore }] }
	];

	const blockContent = {
		head: { name: "head", content: [] },
		props: blockProps,
		defaultTag: "_default"
	};

	return {
		blocks: {
			[ROOT]: blockContent,
			["_default"]: blockContent,
			[INVALID_TAG]: blockContent
		},
		inline: {}
	};
}

function getEmptySchema(): SchemaDefinition {
	return {
		blocks: {
			[ROOT]: { props: [] }
		},
		inline: {}
	};
}

function getDocumentSchema(): SchemaDefinition {
	const inlineTags = ["link", "bold", "inline", "code"];
	const blockContent = ["paragraph", "section", "code"].map(tag => zeroOrMore(tag));

	return {
		blocks: {
			[ROOT]: {
				defaultTag: "paragraph",
				props: [prop("content", blockContent)]
			},
			["paragraph"]: {
				head: inlineProp("text", inlineTags),
				props: []
			},
			["section"]: {
				head: inlineProp("title", inlineTags),
				defaultTag: "paragraph",
				props: [prop("content", blockContent)]
			},
			["code"]: rawTag("content")
		},

		inline: {
			["link"]: {
				sugar: sugar("[", "](", ")"),
				props: [rawInlineProp("url"), inlineProp("text", ["bold"])]
			},
			["bold"]: {
				sugar: sugar("*", "*"),
				props: [inlineProp("text", ["link"])]
			},
			["code"]: {
				props: [rawInlineProp("content")],
				sugar: sugar("`", "`")
			}
		}
	};
}
