import { assert } from "chai";
import { BlockParser, DisallowedDefaultTagError, HMError, UnknownBlockTagError } from "../../src";
import { IRBlockHandler } from "../../src/ir/IRBlockHandler";
import { IRNode } from "../../src/ir/IRNode";
import { Schema } from "../../src/schema/Schema";
import { SchemaDefinition } from "../../src/schema/SchemaDefinition";
import { getAllowAllSchema, getDocumentSchema, getEmptySchema } from "../schemas";
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
