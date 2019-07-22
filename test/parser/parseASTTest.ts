import { assert } from "chai";
import { BlockElement, BlockParser, toJSON } from "../../src";
import { filePairs } from "../utils";
import { TestHandler } from "./TestHandler";

describe("parse AST", () => {
	let parser: BlockParser<BlockElement>;
	let handler: TestHandler;

	before(() => {
		handler = new TestHandler();
		parser = new BlockParser(handler);
	});

	for (const [input, output] of filePairs("parser", ".json")) {
		it(`works with ${output.name}`, () => {
			assert.strictEqual(
				JSON.stringify(toJSON(parser.parse(input.read())), null, "\t"),
				JSON.stringify(JSON.parse(output.read()), null, "\t")
			);
		});
	}

	for (const [input, output] of filePairs("parser-fullast", ".json")) {
		it(`works with ${output.name} (full ast)`, () => {
			assert.strictEqual(
				JSON.stringify(parser.parse(input.read()), null, "\t"),
				JSON.stringify(JSON.parse(output.read()), null, "\t")
			);
		});
	}
});
