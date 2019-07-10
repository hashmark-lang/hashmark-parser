import { assert } from "chai";
import { parse } from "../src/parse";
import { FileInfo, filesIn } from "./util";

describe("parse()", () => {
	for (const output of filesIn("test/output/parse", ".json")) {
		it(`works with ${output.name}`, () => {
			const input = new FileInfo("test/input", output.name, ".hm");
			assert.deepStrictEqual(parse(input.readContent()), JSON.parse(output.readContent()));
		});
	}
});
