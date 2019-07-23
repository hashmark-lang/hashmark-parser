import { assert } from "chai";
import { BlockParser, HMError } from "../../src";
import { IRBlockHandler } from "../../src/ir/IRBlockHandler";
import { IRNode } from "../../src/ir/IRNode";
import { Cardinality, INVALID_TAG, ROOT, Schema } from "../../src/schema/schema";
import { filePairs } from "../utils";

describe("parse IR", () => {
	const schemas: ReadonlyArray<{ folder: string; schema: Schema }> = [
		{
			folder: "empty-schema",
			schema: {
				blocks: { [ROOT]: { props: [] } },
				inline: {}
			}
		},
		{
			folder: "allow-all-schema",
			schema: getAllowAllSchema()
		},
		{
			folder: "document-schema",
			schema: getDocumentSchema()
		}
	];

	for (const { folder, schema } of schemas) {
		describe(folder, () => {
			const errors: HMError[] = [];
			let parser: BlockParser<IRNode | null>;

			before(() => {
				parser = new BlockParser(new IRBlockHandler(schema, x => errors.push(x)));
			});

			beforeEach(() => {
				errors.length = 0; // clear
			});

			for (const [input, output] of filePairs(`parser-ir/${folder}`, ".json")) {
				it(`works with ${input.name}`, () => {
					assert.strictEqual(
						JSON.stringify(parser.parse(input.read()), null, "\t"),
						JSON.stringify(JSON.parse(output.read()), null, "\t")
					);
				});
			}
		});
	}
});

function getAllowAllSchema(): Schema {
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

function getDocumentSchema(): Schema {
	const inlineTags = [
		{ schema: "[base]", tag: "link" },
		{ schema: "[base]", tag: "bold" },
		{ schema: "[base]", tag: "inline" },
		{ schema: "[base]", tag: "code" }
	];
	const blockContent = [
		{ tag: "paragraph", cardinality: Cardinality.ZeroOrMore },
		{ tag: "section", cardinality: Cardinality.ZeroOrMore },
		{ tag: "code", cardinality: Cardinality.ZeroOrMore }
	];

	return {
		blocks: {
			[ROOT]: {
				defaultTag: "paragraph",
				props: [
					{
						name: "content",
						content: blockContent
					}
				]
			},
			["paragraph"]: {
				head: { name: "text", content: inlineTags },
				props: []
			},
			["section"]: {
				head: { name: "title", content: inlineTags },
				defaultTag: "paragraph",
				props: [
					{
						name: "content",
						content: blockContent
					}
				]
			},
			["code"]: {
				props: [{ name: "content", raw: true }]
			}
		},

		inline: {
			["link"]: {
				sugar: {
					start: "[",
					separator: "](",
					end: ")"
				},
				props: [
					{ name: "url", raw: true },
					{ name: "text", content: [{ schema: "[base]", tag: "bold" }] }
				]
			},
			["bold"]: {
				sugar: {
					start: "*",
					end: "*"
				},
				props: [{ name: "text", content: [{ schema: "[base]", tag: "link" }] }]
			},
			["inline"]: {
				props: [
					{
						name: "inlineContent",
						content: inlineTags
					}
				]
			},
			["code"]: {
				props: [{ name: "content", raw: true }],
				sugar: {
					start: "`",
					end: "`"
				}
			}
		}
	};
}
