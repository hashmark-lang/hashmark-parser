import { assert } from "chai";
import { BlockParser, DisallowedDefaultTagError, HMError, UnknownBlockTagError } from "../../src";
import { IRBlockHandler } from "../../src/ir/IRBlockHandler";
import { IRNode } from "../../src/ir/IRNode";
import { SchemaDecorator } from "../../src/schema/Schema";
import {
	inlineProp,
	lineTag,
	prop,
	rawInlineProp,
	rawTag,
	ref,
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

	let parser: BlockParser<IRNode | null>;
	const makeParser = (schema: SchemaDefinition) => {
		parser = new BlockParser(new IRBlockHandler(new SchemaDecorator(schema), logger));
	};

	describe("empty-schema", () => {
		before(() => makeParser(getEmptySchema()));

		it("logs UnknownBlockTagError when a block is used", () => {
			const input = resourceFile("input", "block_tag.hm").read();
			parser.parse(input);
			const error = errors.find(e => e instanceof UnknownBlockTagError)!;
			assert.notStrictEqual(error, undefined);
		});

		it("logs DisallowedDefaultTagError when a default is used", () => {
			const input = resourceFile("input", "paragraphs.hm").read();
			parser.parse(input);
			const error = errors.find(e => e instanceof DisallowedDefaultTagError)!;
			assert.notStrictEqual(error, undefined);
		});

		testOutput("empty-schema");
	});

	describe("document-schema", () => {
		before(() => makeParser(getDocumentSchema()));

		it("logs UnknownBlockTagError when an unknown block is used", () => {
			const input = resourceFile("input", "nested_blocks.hm").read();
			const res = parser.parse(input);
			// #def is not in document schema
			const error = errors.find(e => e instanceof UnknownBlockTagError)!;
			assert.notStrictEqual(error, undefined);
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
					JSON.stringify(parser.parse(input.read()), null, "\t"),
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
	const inlineTags = ["link", "bold", "inline", "code"].map(tag => ref(tag));
	const blockContent = ["paragraph", "section", "code"].map(tag => zeroOrMore(tag));

	return {
		blocks: {
			[ROOT]: {
				defaultTag: "paragraph",
				props: [prop("content", blockContent)]
			},
			["paragraph"]: lineTag("text", inlineTags),
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
				props: [rawInlineProp("url"), inlineProp("text", ref("bold"))]
			},
			["bold"]: {
				sugar: sugar("*", "*"),
				props: [inlineProp("text", ref("link"))]
			},
			["inline"]: {
				props: [inlineProp("inlineContent", inlineTags)]
			},
			["code"]: {
				props: [rawInlineProp("content")],
				sugar: sugar("`", "`")
			}
		}
	};
}
