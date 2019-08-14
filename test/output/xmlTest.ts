import { assert } from "chai";
import { HMError } from "../../src";
import { IRBlockHandler } from "../../src/ir/IRBlockHandler";
import { IRNode } from "../../src/ir/IRNode";
import { toXML } from "../../src/output/xml";
import { BlockParser } from "../../src/parser/BlockParser";
import { Cardinality } from "../../src/schema/Cardinality";
import { Schema } from "../../src/schema/Schema";
import { ROOT, SchemaDefinition } from "../../src/schema/SchemaDefinition";
import { filePairs } from "../utils";

describe("xml", () => {
	const errors: HMError[] = [];
	const logger = (x: HMError) => errors.push(x);
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

	before(() => makeParser(getDocumentSchema()));

	for (const [input, output] of filePairs("xml", ".xml")) {
		it(`works with ${output.name}`, () => {
			const ast = parse(input.read());
			const xml = toXML(ast);
			assert.strictEqual(xml, output.read().trim());
		});
	}
});

function getDocumentSchema(): SchemaDefinition {
	const inlineTags = ["link", "strong", "inline", "code"];
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
				props: [{ name: "url", raw: true }, { name: "text", content: ["strong"] }]
			},
			["strong"]: {
				sugar: {
					start: "*",
					end: "*"
				},
				props: [{ name: "text", content: ["link"] }]
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
