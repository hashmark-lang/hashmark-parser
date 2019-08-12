import { assert } from "chai";
import {
	BlockParser,
	DisallowedDefaultTagError,
	HMError,
	UnknownBlockTagError,
	UnknownInlineTagError
} from "../../src";
import { IRBlockHandler } from "../../src/ir/IRBlockHandler";
import { IRNode } from "../../src/ir/IRNode";
import { Schema } from "../../src/schema/Schema";
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
import { filePairs, resourceFile } from "../utils";

describe("IRHandler", () => {
	const errors: HMError[] = [];
	const logger = (x: HMError) => errors.push(x);

	beforeEach(() => {
		errors.length = 0;
	});

	let parse: (input: string) => IRNode;
	const makeParser = (schema: SchemaDefinition) => {
		const handler = new IRBlockHandler(new Schema(schema), logger);
		const parser = new BlockParser(handler);
		parse = (input: string): IRNode => {
			handler.reset();
			parser.parse(input);
			return handler.getResult();
		};
	};

	describe("empty-schema", () => {
		before(() => makeParser(getEmptySchema()));

		it("logs UnknownBlockTagError when a block is used", () => {
			const input = resourceFile("input", "block_tag.hm").read();
			parse(input);
			const error = errors.find(e => e instanceof UnknownBlockTagError)!;
			assert.notStrictEqual(error, undefined);
		});

		it("logs DisallowedDefaultTagError when a default is used", () => {
			const input = resourceFile("input", "paragraphs.hm").read();
			parse(input);
			const error = errors.find(e => e instanceof DisallowedDefaultTagError)!;
			assert.notStrictEqual(error, undefined);
		});

		testOutput("empty-schema");
	});

	describe("document-schema", () => {
		before(() => makeParser(getDocumentSchema()));

		it("logs UnknownBlockTagError when an unknown block is used", () => {
			const input = resourceFile("input", "nested_blocks.hm").read();
			parse(input);
			// #def is not in document schema
			const error = errors.find(e => e instanceof UnknownBlockTagError)!;
			assert.notStrictEqual(error, undefined);
		});

		it("logs UnknownInlineError when an inline element is used", () => {
			parse(resourceFile("input", "inline_start_of_line.hm").read());
			assert.exists(errors.find(e => e instanceof UnknownInlineTagError));
		});

		testOutput("document-schema");
	});

	describe("allow-all-schema", () => {
		before(() => makeParser(getAllowAllSchema()));

		testOutput("allow-all-schema");
	});

	function testOutput(folder: string) {
		for (const [input, output] of filePairs(`parser-ir/${folder}`, ".json")) {
			it(`works with ${input.name}`, () => {
				assert.strictEqual(
					JSON.stringify(parse(input.read()), null, "\t"),
					JSON.stringify(JSON.parse(output.read()), null, "\t")
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
