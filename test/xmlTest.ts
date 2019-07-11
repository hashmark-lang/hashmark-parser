import { assert } from "chai";
import { parse } from "../src/Parser";
import { toXML } from "../src/xml";
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
