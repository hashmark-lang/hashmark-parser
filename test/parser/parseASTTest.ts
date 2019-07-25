import { assert } from "chai";
import { BlockElement } from "../../src/ast/ast";
import { toJSON } from "../../src/output/json";
import { BlockParser } from "../../src/parser/BlockParser";
import { filePairs } from "../utils";
import { TestHandler } from "./TestHandler";

describe("parse AST", () => {
	let parse: (input: string) => BlockElement;

	before(() => {
		const handler = new TestHandler();
		const parser = new BlockParser(handler);
		parse = (input: string): BlockElement => {
			handler.reset();
			parser.parse(input);
			return handler.getResult();
		};
	});

	for (const [input, output] of filePairs("parser", ".json")) {
		it(`works with ${output.name}`, () => {
			assert.strictEqual(
				JSON.stringify(toJSON(parse(input.read())), null, "\t"),
				JSON.stringify(JSON.parse(output.read()), null, "\t")
			);
		});
	}

	for (const [input, output] of filePairs("parser-fullast", ".json")) {
		it(`works with ${output.name} (full ast)`, () => {
			assert.strictEqual(
				JSON.stringify(parse(input.read()), null, "\t"),
				JSON.stringify(JSON.parse(output.read()), null, "\t")
			);
		});
	}
});
