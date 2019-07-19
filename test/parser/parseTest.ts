import { assert } from "chai";
import { toJSON } from "../../src/output/json";
import { BlockParser } from "../../src/parser/BlockParser";
import { FileInfo, filesIn } from "../utils";
import { TestHandler } from "./TestHandler";

/* tslint:disable:only-arrow-functions */
describe("parse()", function() {
	before(function() {
		const handler = new TestHandler();
		this.parser = new BlockParser(handler);
	});

	for (const output of filesIn("test/resources/output/parser", ".json")) {
		it(`works with ${output.name}`, function() {
			const input = new FileInfo("test/resources/input", output.name, ".hm");
			assert.strictEqual(
				JSON.stringify(toJSON(this.parser.parse(input.readContent())), null, "\t"),
				JSON.stringify(JSON.parse(output.readContent()), null, "\t")
			);
		});
	}

	for (const output of filesIn("test/resources/output/parser-fullast", ".json")) {
		it(`works with ${output.name} (full ast)`, function() {
			const input = new FileInfo("test/resources/input", output.name, ".hm");
			assert.strictEqual(
				JSON.stringify(this.parser.parse(input.readContent()), null, "\t"),
				JSON.stringify(JSON.parse(output.readContent()), null, "\t")
			);
		});
	}
});
