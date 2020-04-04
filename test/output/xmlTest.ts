import { assert } from "chai";
import { HMError } from "../../src";
import { IRBlockHandler } from "../../src/ir/IRBlockHandler";
import { IRNode } from "../../src/ir/IRNode";
import { toXML } from "../../src/output/xml";
import { BlockParser } from "../../src/parser/BlockParser";
import { Schema } from "../../src/schema/Schema";
import { SchemaDefinition } from "../../src/schema/SchemaDefinition";
import { getDocumentSchema } from "../schemas";
import { filePairs } from "../utils";

describe("toXML()", () => {
	const errors: HMError[] = [];
	const logger = (x: HMError): void => {
		errors.push(x);
	};
	let parse: (input: string) => IRNode;
	const makeParser = (schema: SchemaDefinition): void => {
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
