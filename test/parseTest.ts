import { assert } from "chai";
import { parse } from "../src/parse";
import { FileInfos, filesIn } from "./util";

describe("parse()", () => {
	for (const output of filesIn("test/output", ".json")) {
		it(`works with ${output.name}`, () => {
			const input = new FileInfos("test/input", output.name, ".hm");
			assert.deepStrictEqual(parse(input.content), JSON.parse(output.content));
		});
	}
});
