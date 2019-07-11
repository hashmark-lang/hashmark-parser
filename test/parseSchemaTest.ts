import { assert } from "chai";
import { parse } from "../src/Parser";
import { ParsedSchema } from "../src/parseSchema";
import { hm, readInputFile } from "./utils";

function loadSchema(fileName: string): ParsedSchema {
	const file = readInputFile(fileName);
	const parsed = parse(file);
	return new ParsedSchema(parsed);
}

describe("ParsedSchema", () => {
	const inlinesSchema = loadSchema("schema_inlines.hm");
	const blocksSchema = loadSchema("schema_blocks.hm");
	const defaultsSchema = loadSchema("schema_defaults.hm");

	describe("isRawBlock()", () => {
		it("returns true for blocks marked as raw in the schema", () => {
			assert.isTrue(blocksSchema.isRawBlock("child"));
		});

		it("returns false for blocks not marked as raw in the schema", () => {
			assert.isFalse(blocksSchema.isRawBlock("parent"));
			assert.isFalse(blocksSchema.isRawBlock("root"));
		});

		it("returns false for inline tags", () => {
			assert.isFalse(inlinesSchema.isRawBlock("url"));
			assert.isFalse(inlinesSchema.isRawBlock("bold"));
		});
	});

	describe("isRawArg()", () => {
		it("returns true when the argument is marked as raw in the schema", () => {
			assert.isTrue(inlinesSchema.isRawArg("url", 0));
		});

		it("returns false when the argument is not marked as raw in the schema", () => {
			assert.isFalse(inlinesSchema.isRawArg("url", 1));
		});

		it("returns false when the argument is not defined in the schema", () => {
			assert.isFalse(inlinesSchema.isRawArg("url", 123));
		});

		it("throws an error when the argument index is negative", () => {
			assert.throws(() => inlinesSchema.isRawArg("url", -1));
		});

		it("returns false for block tags", () => {
			assert.isFalse(inlinesSchema.isRawArg("paragraph", 0));
			assert.isFalse(inlinesSchema.isRawArg("paragraph", 1));
		});
	});

	describe("getDefault()", () => {
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

	interface CardinalityDescription {
		name: string;
		cardinality: string | undefined;
		allowed: number[];
	}
	const cardinalities: CardinalityDescription[] = [
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

	describe("validateBlock()", () => {
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

				it("does not allow any unknown elements", () => {
					const file = `#unknown element`;
					const errors = schema.validateBlock(parse(file));
					const expected = test.allowed.includes(0) ? 1 : 2;
					const message = errors.map(e => e.message).join("\n");
					assert.lengthOf(errors, expected, message);
				});
			});
		}
	});

	describe("validateLine()", () => {
		function makeSchema(cardinality: string | undefined): ParsedSchema {
			const rule = cardinality ? `#${cardinality} bold` : "bold";
			const schema = hm`
			#block title
				#head
					inline
			#inline inline
				#arg
					#content
						${rule}
				#arg
					#raw
			#inline bold
				#arg`;
			return new ParsedSchema(schema);
		}

		for (const test of cardinalities) {
			describe(test.name, () => {
				const schema = makeSchema(test.cardinality);
				for (let i = 0; i <= 2; ++i) {
					const allowed = test.allowed.includes(i);
					it(`${allowed ? "allows" : "does not allow"} ${i} elements`, () => {
						const bolds = Array(i)
							.fill("#bold[test]")
							.join(" ");
						const file = `#title #inline[hello ${bolds} world][test]`;
						const root = parse(file);
						const line = root.children[0].head;

						const errors = schema.validateLine(line);

						const message =
							`Did not validate the following file correctly:\n\n${file}\n\n` +
							`Got the following errors: \n${errors
								.map(err => "\t- " + err.message)
								.join("\n")}\n\n`;
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

	describe("customTokens", () => {
		it("is empty when no sugar is defined", () => {
			assert.isEmpty(blocksSchema.sugars);
		});

		it("only contains the defined sugar", () => {
			const boldSugar = inlinesSchema.sugars.find(c => c.tag === "bold")!;
			assert.notStrictEqual(boldSugar, undefined);
			assert.lengthOf(inlinesSchema.sugars, 1);
		});

		it(".start contains a RegExp corresponding to the specified start character", () => {
			const boldSugar = inlinesSchema.sugars.find(c => c.tag === "bold")!;
			assert.notStrictEqual(boldSugar, undefined);
			assert.strictEqual(boldSugar.start, "*");
		});

		it(".end contains a RegExp corresponding to the specified end character", () => {
			const boldSugar = inlinesSchema.sugars.find(c => c.tag === "bold")!;
			assert.notStrictEqual(boldSugar, undefined);
			assert.strictEqual(boldSugar.end, "*");
		});
	});
});
