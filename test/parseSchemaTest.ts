import { assert } from "chai";
import { parse } from "../src/parse";
import { ParsedSchema } from "../src/parseSchema";
import { hm, readInputFile } from "./util";

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

	describe("getDefault()", () => {
		const defaultsSchema = loadSchema("schema_defaults.hm");

		it("returns the default defined in the schema", () => {
			assert.strictEqual(defaultsSchema.getDefault("root"), "top");
			assert.strictEqual(defaultsSchema.getDefault("top"), "mid");
		});

		it("returns undefined if no default is defined in the schema", () => {
			assert.isUndefined(defaultsSchema.getDefault("bottom"));
		});

		it("returns undefined for unknown elements", () => {
			assert.isUndefined(defaultsSchema.getDefault("unknown"));
		});
	});

	describe("validateBlock()", () => {
		const cardinalities = [
			{
				name: "implicit zeroOrMore",
				cardinality: undefined,
				allowed: [0, 1, 2]
			},
			{
				name: "explicit zeroOrMore",
				cardinality: "zeroOrMore",
				allowed: [0, 1, 2]
			},
			{
				name: "optional",
				cardinality: "optional",
				allowed: [0, 1]
			},
			{
				name: "oneOrMore",
				cardinality: "oneOrMore",
				allowed: [1, 2]
			},
			{
				name: "one",
				cardinality: "one",
				allowed: [1]
			}
		];

		function makeSchema(cardinality: string | undefined): ParsedSchema {
			const rule = cardinality ? `#${cardinality} element` : "element";
			const schema = hm`
			#block root
				#content
					${rule}
			#block element`;
			return new ParsedSchema(schema);
		}

		for (const test of cardinalities) {
			describe(test.name, () => {
				const schema = makeSchema(test.cardinality);
				for (let i = 0; i <= 2; ++i) {
					const allowed = test.allowed.includes(i);
					it(`${allowed ? "allows" : "does not allow"} ${i} elements`, () => {
						const file = Array(i)
							.fill("#element hello")
							.join("\n");
						const errors = schema.validateBlock(parse(file));
						const message = "Did not validate the following file correctly:\n" + file;
						if (allowed) {
							assert.isEmpty(errors, message);
						} else {
							assert.isNotEmpty(errors, message);
						}
					});
				}
			});
		}
	});
});
