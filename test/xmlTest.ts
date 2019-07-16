import { assert } from "chai";
import { toXML } from "../src/output/xml";
import { parse } from "../src/parser/Parser";
import { FileInfo, filesIn } from "./utils";

describe("xml", () => {
	for (const output of filesIn("test/output/xml", ".xml")) {
		it(`works with ${output.name}`, () => {
			const input = new FileInfo("test/input", output.name, ".hm");
			const ast = parse(input.readContent());
			const xml = toXML(ast);
			assert.strictEqual(xml, output.readContent().trim());
		});
	}
});
