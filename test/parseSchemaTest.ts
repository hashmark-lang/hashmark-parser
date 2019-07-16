import { assert } from "chai";
import { parse } from "../src/parser/Parser";
import {
	ArgumentCountError,
	BlockUsedAsInlineError,
	DisallowedInArgError,
	InlineUsedAsBlockError,
	UnknownTagError
} from "../src/schema/errors";
import { ParsedSchema } from "../src/schema/parseSchema";
import { Schema } from "../src/schema/schema";
import { deindent, getSchemaSchema, readInputFile } from "./utils";

describe("ParsedSchema", () => {
	let schemaSchema: Schema;

	let inlinesSchema: ParsedSchema;
	let blocksSchema: ParsedSchema;
	let defaultsSchema: ParsedSchema;
	let headsSchema: ParsedSchema;

	function loadSchema(fileName: string): ParsedSchema {
		if (!schemaSchema) {
			schemaSchema = getSchemaSchema();
		}
		const file = readInputFile(fileName);
		const parsed = parse(file, schemaSchema);
		return new ParsedSchema(parsed);
	}

	before(() => {
		inlinesSchema = loadSchema("schema_inlines.hm");
		blocksSchema = loadSchema("schema_blocks.hm");
		defaultsSchema = loadSchema("schema_defaults.hm");
		headsSchema = loadSchema("schema_heads.hm");
	});

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

	describe("isRawHead()", () => {
		it("returns true when the head is marked as raw in the schema", () => {
			assert.isTrue(headsSchema.isRawHead("date"));
		});

		it("returns false when the head isn't marked as raw", () => {
			assert.isFalse(headsSchema.isRawHead("author"));
		});

		it("returns false when the element is unknown", () => {
			assert.isFalse(headsSchema.isRawHead("unknown"));
		});
	});

	describe("isValidHeadChild()", () => {
		it("returns true when the element is marked as valid content", () => {
			assert.isTrue(headsSchema.isValidHeadChild("paragraph", "emphasis"));
		});

		it("returns false when the element is not marked as valid content", () => {
			assert.isFalse(headsSchema.isValidHeadChild("author", "emphasis"));
		});

		it("returns false when the parent element is unknown", () => {
			assert.isFalse(headsSchema.isValidHeadChild("unknown", "emphasis"));
		});

		it("returns false when the child element is unknown", () => {
			assert.isFalse(headsSchema.isValidHeadChild("paragraph", "unknown"));
		});

		it("returns false when the head is raw", () => {
			assert.isFalse(headsSchema.isValidHeadChild("date", "emphasis"));
		});
	});

	describe("isValidArgChild()", () => {
		it("returns true when the arg is marked as valid content", () => {
			assert.isTrue(inlinesSchema.isValidArgChild("url", 1, "bold"));
		});

		it("returns false when the arg is marked as valid content", () => {
			assert.isFalse(inlinesSchema.isValidArgChild("url", 1, "paragraph"));
		});

		it("returns false when the arg is not defined in the schema", () => {
			assert.isFalse(inlinesSchema.isValidArgChild("url", 123, "bold"));
		});

		it("returns false when the parent element is unknown", () => {
			assert.isFalse(inlinesSchema.isValidArgChild("unknown", 0, "bold"));
		});

		it("returns false when the arg is raw", () => {
			assert.isFalse(inlinesSchema.isValidArgChild("url", 0, "bold"));
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

	describe("validateBlock()", () => {
		function getErrors(file: string, schema: Schema) {
			const block = parse(file, schema);
			return schema.validateBlock(block);
		}

		it("returns an UnknownTagError an unknown block tag is used", () => {
			const file = "#unknown tag";
			const error = getErrors(file, blocksSchema).find(e => e instanceof UnknownTagError);
			assert.notStrictEqual(error, undefined);
		});

		it("returns an UnknownTagError an unknown inline tag is used", () => {
			const file = "#parent #unknown[tag]";
			const error = getErrors(file, blocksSchema).find(e => e instanceof UnknownTagError);
			assert.notStrictEqual(error, undefined);
		});

		it("returns an InlineUsedAsBlockError when an inline tag is used as a block", () => {
			const file = "#url should be inline";
			const error = getErrors(file, inlinesSchema).find(
				e => e instanceof InlineUsedAsBlockError
			);
			assert.notStrictEqual(error, undefined);
		});

		it("returns a BlockUsedAsInlineError when a block tag is used inline", () => {
			const file = "#parent #child[should not be inline]";
			const error = getErrors(file, blocksSchema).find(
				e => e instanceof BlockUsedAsInlineError
			);
			assert.notStrictEqual(error, undefined);
		});

		it("returns an ArgumentCountError when too few arguments are used", () => {
			const file = "#paragraph #url[1]";
			const error = getErrors(file, inlinesSchema).find(e => e instanceof ArgumentCountError);
			assert.notStrictEqual(error, undefined);
		});

		it("does not return ArgumentCountError when the right number of arguments are used", () => {
			const file = "#paragraph #url[1][2]";
			const error = getErrors(file, inlinesSchema).find(e => e instanceof ArgumentCountError);
			assert.isUndefined(error);
		});

		it("returns an ArgumentCountError when too many arguments are used", () => {
			const file = "#paragraph #url[1][2][3]";
			const error = getErrors(file, inlinesSchema).find(e => e instanceof ArgumentCountError);
			assert.notStrictEqual(error, undefined);
		});

		it("returns a DisallowedInArgError when a disallowed tag is used in an arg", () => {
			const file = "#url[https://example.com][#url[1][2]]";
			const error = getErrors(file, inlinesSchema).find(
				e => e instanceof DisallowedInArgError
			);
			assert.notStrictEqual(error, undefined);
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

		function makeSchema(cardinality: string | undefined): ParsedSchema {
			const rule = cardinality ? `#${cardinality} element` : "element";
			const schemaFile = deindent(`
			#block root
				#content
					${rule}
			#block element`);
			const schema = parse(schemaFile, schemaSchema);
			return new ParsedSchema(schema);
		}

		for (const test of cardinalities) {
			describe(test.name, () => {
				let schema: ParsedSchema;

				before(() => {
					schema = makeSchema(test.cardinality);
				});

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
		const schemaFile = deindent(`
			#block title
				#head
					inline
			#inline inline
				#arg
					#zeroOrMore bold
				#arg
					#raw
			#inline bold
				#arg`);

		let schema: ParsedSchema;

		before(() => {
			schema = new ParsedSchema(parse(schemaFile, schemaSchema));
		});

		for (let i = 0; i <= 2; ++i) {
			it(`allows ${i} elements`, () => {
				const bolds = "#bold[test] ".repeat(i);
				const file = `#title #inline[hello ${bolds} world][test]`;
				const root = parse(file);
				const line = root.children[0].head;

				const errors = schema.validateLine(line);

				const message =
					`Did not validate the following file correctly:\n\n${file}\n\n` +
					`Got the following errors: \n${errors
						.map(err => "\t- " + err.message)
						.join("\n")}\n\n`;
				assert.isEmpty(errors, message);
			});
		}
	});

	describe("sugars", () => {
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
