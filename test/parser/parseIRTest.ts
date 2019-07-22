import { assert } from "chai";
import { BlockParser, HMError } from "../../src";
import { IRHandler } from "../../src/ir/IRBlockHandler";
import { IRNode } from "../../src/ir/IRNode";
import { Cardinality, Schema } from "../../src/schema/schema";
import { filePairs } from "../utils";

describe("parse IR", () => {
	const schemas: ReadonlyArray<{ folder: string; schema: Schema }> = [
		{
			folder: "empty-schema",
			schema: {
				root: { props: [] },
				blockElements: [],
				inlineElements: []
			}
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
				parser = new BlockParser(new IRHandler(schema, errors.push));
			});

			beforeEach(() => {
				errors.length = 0; // clear
			});

			for (const [input, output] of filePairs(`parser-ir/${folder}`, ".json")) {
				it(`works with ${input.name}`, () => {
					assert.strictEqual(
						JSON.stringify(parser.parse(input.read()), null, "\t"),
						JSON.stringify(JSON.parse(output.read()), null, "\t"),
						errors.join("\n")
					);
				});
			}
		});
	}
});

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
		root: {
			defaultTag: "paragraph",
			props: [
				{
					name: "content",
					content: blockContent
				}
			]
		},

		blockElements: [
			{
				tag: "paragraph",
				head: { name: "text", content: inlineTags },
				props: []
			},
			{
				tag: "section",
				head: { name: "title", content: inlineTags },
				defaultTag: "paragraph",
				props: [
					{
						name: "content",
						content: blockContent
					}
				]
			},
			{
				tag: "code",
				props: [{ name: "content", raw: true }]
			}
		],

		inlineElements: [
			{
				tag: "link",
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
			{
				tag: "bold",
				sugar: {
					start: "*",
					end: "*"
				},
				props: [{ name: "text", content: [{ schema: "[base]", tag: "link" }] }]
			},
			{
				tag: "inline",
				props: [
					{
						name: "inlineContent",
						content: inlineTags
					}
				]
			},
			{
				tag: "code",
				props: [{ name: "content", raw: true }]
			}
		]
	};
}
