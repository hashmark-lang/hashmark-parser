import * as assert from "assert";
import parse from "../src/parse";
import { FileInfos, filesIn } from "./util";

describe("parse()", () => {
	for (const output of filesIn("test/output", ".json")) {
		it(`works with ${output.name}`, () => {
			const input = new FileInfos("test/input", output.name, ".hm");
			assert.strictEqual(
				JSON.stringify(parse(input.content).children, null, "\t"),
				JSON.stringify(JSON.parse(output.content), null, "\t")
			);
		});
	}
});
