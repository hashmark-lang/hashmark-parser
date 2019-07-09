import { assert } from "chai";
import { parse } from "../src/parse";
import { ParsedSchema } from "../src/parseSchema";
import { readInputFile } from "./util";

function loadSchema(fileName: string): ParsedSchema {
	const file = readInputFile(fileName);
	const parsed = parse(file);
	return new ParsedSchema(parsed);
}

describe("ParsedSchema", () => {
	describe("schema_blocks.hm", () => {
		const simpleSchema = loadSchema("schema_blocks.hm");

		it("has a default of 'child' for 'parent'", () => {
			assert.equal(simpleSchema.getDefault("parent"), "child");
		});

		it("has no default for 'child'", () => {
			assert.isUndefined(simpleSchema.getDefault("child"));
		});

		it("says 'child' is raw", () => {
			assert.isTrue(simpleSchema.isRawBlock("child"));
		});

		it("does not say 'parent' is raw", () => {
			assert.isFalse(simpleSchema.isRawBlock("parent"));
		});

		it("does not says an unknown element is raw", () => {
			assert.isFalse(simpleSchema.isRawBlock("unknown"));
		});
	});

	describe("schema_inlines.hm", () => {
		const inlinesSchema = loadSchema("schema_inlines.hm");

		it("does not say an inline block is raw", () => {
			assert.isFalse(inlinesSchema.isRawBlock("url"));
		});

		it("says the first argument of 'url' is raw", () => {
			assert.isTrue(inlinesSchema.isRawArg("url", 0));
		});

		it("does not say the second argument of 'url' is raw", () => {
			assert.isFalse(inlinesSchema.isRawArg("url", 1));
		});

		it("does not say an non-existant argument of 'url' is raw", () => {
			assert.isFalse(inlinesSchema.isRawArg("url", 123));
		});
	});
});
