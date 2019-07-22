import { assert } from "chai";
import { toXML } from "../../src/output/xml";
import { parse } from "../../src/parser/BlockParser";
import { filePairs } from "../utils";

describe("xml", () => {
	for (const [input, output] of filePairs("xml", ".xml")) {
		it(`works with ${output.name}`, () => {
			const ast = parse(input.read());
			const xml = toXML(ast);
			assert.strictEqual(xml, output.read().trim());
		});
	}
});
