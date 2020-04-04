import { assert } from "chai";
import {
	DuplicatePropAssignmentError,
	DuplicatePropNameError,
	IllegalPropNameError,
	IllegalTagNameError,
	UndefinedBlockTagError,
	UndefinedInlineTagError,
} from "../../src";
import {
	blockTag,
	dateArg,
	inline,
	lineTag,
	oneOrMore,
	parsedArg,
	prop,
	props,
	rawBodyTag,
	root,
	stringArg,
	stringTag,
	urlArg,
	zeroOrMore,
} from "../../src/schema/schema-generators";
import { ROOT, SchemaDefinition } from "../../src/schema/SchemaDefinition";
import { schemaErrors } from "../../src/schema/schemaErrors";
import { getDocumentSchema, getEmptySchema } from "../schemas";

describe("schemaErrors()", () => {
	let emptySchema: Readonly<SchemaDefinition>;
	let documentSchema: Readonly<SchemaDefinition>;

	before(() => {
		emptySchema = getEmptySchema();
		documentSchema = getDocumentSchema();
	});

	describe("No error", () => {
		it("is returned for an empty schema", () => {
			assert.isEmpty(schemaErrors(emptySchema));
		});

		it("is returned for a valid schema", () => {
			assert.isEmpty(schemaErrors(documentSchema));
		});
	});

	describe("SchemaDefinitionError", () => {
		describe("DuplicatePropNameError", () => {
			it("is returned when a body prop has the same name as a head prop", () => {
				const schema: SchemaDefinition = {
					root: root(prop("body", zeroOrMore("test"))),
					blocks: {
						["test"]: blockTag(stringArg("foo"), prop("foo")),
					},
					inline: {},
				};

				const errors = schemaErrors(schema);
				assert.lengthOf(errors, 1);

				const error = errors[0] as DuplicatePropNameError;
				assert.instanceOf(error, DuplicatePropNameError);
				assert.strictEqual(error.tag, "test");
				assert.strictEqual(error.propName, "foo");
				assert.strictEqual(error.repetitions, 2);
			});

			it("is returned when two inline props have the same name", () => {
				const schema: SchemaDefinition = {
					root: root(prop("body", zeroOrMore("test"))),
					blocks: {
						["test"]: lineTag("head", ["foo"]),
					},
					inline: {
						["foo"]: inline(stringArg("bar"), urlArg("bar"), dateArg("bar")),
					},
				};

				const errors = schemaErrors(schema);
				assert.lengthOf(errors, 1);

				const error = errors[0] as DuplicatePropNameError;
				assert.instanceOf(error, DuplicatePropNameError);
				assert.strictEqual(error.tag, "foo");
				assert.strictEqual(error.propName, "bar");
				assert.strictEqual(error.repetitions, 3);
			});
		});

		describe("DuplicatePropAssignmentError", () => {
			it("is returned when the same tag is assigned to multiple props", () => {
				const schema: SchemaDefinition = {
					root: root(prop("body", zeroOrMore("test"))),
					blocks: {
						["test"]: blockTag(
							undefined,
							props(
								prop("foo", zeroOrMore("bar")),
								prop("baz", oneOrMore("bar")),
								prop("qux", oneOrMore("bar"))
							)
						),
						["bar"]: stringTag("head"),
					},
					inline: {},
				};

				const errors = schemaErrors(schema);
				assert.lengthOf(errors, 1);

				const error = errors[0] as DuplicatePropAssignmentError;
				assert.instanceOf(error, DuplicatePropAssignmentError);
				assert.strictEqual(error.tag, "test");
				assert.deepStrictEqual(error.propNames, ["foo", "baz", "qux"]);
				assert.strictEqual(error.contentTag, "bar");
			});
		});

		describe("IllegalPropNameError", () => {
			it("is returned when a parsed block tag has an illegal prop name", () => {
				const schema: SchemaDefinition = {
					root: root(prop("body", zeroOrMore("test"))),
					blocks: {
						["test"]: blockTag(undefined, prop("$foo", zeroOrMore("bar"))),
						["bar"]: stringTag("prop"),
					},
					inline: {},
				};

				const errors = schemaErrors(schema);
				assert.lengthOf(errors, 1);

				const error = errors[0] as IllegalPropNameError;
				assert.instanceOf(error, IllegalPropNameError);
				assert.strictEqual(error.tag, "test");
				assert.deepStrictEqual(error.propName, "$foo");
			});

			it("is returned when a raw block has an illegal raw body name", () => {
				const schema: SchemaDefinition = {
					root: root(prop("body", zeroOrMore("test"))),
					blocks: {
						["test"]: rawBodyTag("$foo"),
					},
					inline: {},
				};

				const errors = schemaErrors(schema);
				assert.lengthOf(errors, 1);

				const error = errors[0] as IllegalPropNameError;
				assert.instanceOf(error, IllegalPropNameError);
				assert.strictEqual(error.tag, "test");
				assert.deepStrictEqual(error.propName, "$foo");
			});

			it("is returned when an inline tag has an illegal arg name", () => {
				const schema: SchemaDefinition = {
					root: root(prop("body", zeroOrMore("block"))),
					blocks: {
						["block"]: lineTag("prop", ["test"]),
					},
					inline: {
						["test"]: inline(stringArg("$foo")),
					},
				};

				const errors = schemaErrors(schema);
				assert.lengthOf(errors, 1);

				const error = errors[0] as IllegalPropNameError;
				assert.instanceOf(error, IllegalPropNameError);
				assert.strictEqual(error.tag, "test");
				assert.deepStrictEqual(error.propName, "$foo");
			});

			it("is returned when the root has an illegal prop name", () => {
				const schema: SchemaDefinition = {
					root: root(prop("$body", zeroOrMore("test"))),
					blocks: {
						["test"]: stringTag("test"),
					},
					inline: {},
				};

				const errors = schemaErrors(schema);
				assert.lengthOf(errors, 1);

				const error = errors[0] as IllegalPropNameError;
				assert.instanceOf(error, IllegalPropNameError);
				assert.strictEqual(error.tag, ROOT);
				assert.deepStrictEqual(error.propName, "$body");
			});
		});

		describe("UndefinedInlineTagError", () => {
			it("is returned when an unknown inline tag is referenced in the head prop", () => {
				const schema: SchemaDefinition = {
					root: root(prop("body", zeroOrMore("test"))),
					blocks: {
						["test"]: lineTag("head", ["unknown"]),
						["unknown"]: stringTag("head"),
					},
					inline: {},
				};

				const errors = schemaErrors(schema);
				assert.lengthOf(errors, 1);

				const error = errors[0] as UndefinedInlineTagError;
				assert.instanceOf(error, UndefinedInlineTagError);
				assert.strictEqual("test", error.schemaTag);
				assert.strictEqual("head", error.propName);
				assert.strictEqual("unknown", error.referencedTag);
			});

			it("is returned when an unknown tag is referenced in an arg", () => {
				const schema: SchemaDefinition = {
					root: root(prop("body", zeroOrMore("test"))),
					blocks: {
						["test"]: lineTag("head", ["inline"]),
						["unknown"]: lineTag("head", ["inline"]),
					},
					inline: {
						["inline"]: inline(parsedArg("arg", ["unknown"])),
					},
				};

				const errors = schemaErrors(schema);
				assert.lengthOf(errors, 1);

				const error = errors[0] as UndefinedInlineTagError;
				assert.instanceOf(error, UndefinedInlineTagError);
				assert.strictEqual("inline", error.schemaTag);
				assert.strictEqual("arg", error.propName);
				assert.strictEqual("unknown", error.referencedTag);
			});
		});

		describe("UndefinedBlockTagError", () => {
			it("is returned when an unknown tag is referenced in a body prop", () => {
				const schema: SchemaDefinition = {
					root: root(prop("body", zeroOrMore("test"))),
					blocks: {
						["test"]: {
							rawBody: false,
							props: {
								body: {
									["prop"]: oneOrMore("unknown"),
								},
							},
						},
					},
					inline: {
						["unknown"]: inline(),
					},
				};

				const errors = schemaErrors(schema);
				assert.lengthOf(errors, 1);

				const error = errors[0] as UndefinedBlockTagError;
				assert.instanceOf(error, UndefinedBlockTagError);
				assert.strictEqual("test", error.schemaTag);
				assert.strictEqual("prop", error.propName);
				assert.strictEqual("unknown", error.referencedTag);
			});

			it("is returned when an unknown 'root' tag is referenced in a body prop", () => {
				const schema: SchemaDefinition = {
					root: root(prop("body", zeroOrMore("test"))),
					blocks: {
						["test"]: {
							rawBody: false,
							props: {
								body: {
									["prop"]: oneOrMore("root"),
								},
							},
						},
					},
					inline: {
						["root"]: inline(),
					},
				};

				const errors = schemaErrors(schema);
				assert.lengthOf(errors, 1);

				const error = errors[0] as UndefinedBlockTagError;
				assert.instanceOf(error, UndefinedBlockTagError);
				assert.strictEqual("test", error.schemaTag);
				assert.strictEqual("prop", error.propName);
				assert.strictEqual("root", error.referencedTag);
			});
		});

		describe("IllegalTagNameError", () => {
			const testChars = ["#", "[", " "];
			for (const char of testChars) {
				const tag = "te" + char + "st";
				it(`is returned for tag name '${tag}'`, () => {
					const schema: SchemaDefinition = {
						root: root(prop("body", zeroOrMore(tag))),
						blocks: {
							[tag]: {
								rawBody: false,
								props: {
									body: {
										// It is not an error in a prop:
										["pr" + char + "op"]: {},
									},
								},
							},
						},
						inline: {},
					};

					const errors = schemaErrors(schema);
					assert.lengthOf(errors, 1);

					const error = errors[0] as IllegalTagNameError;
					assert.instanceOf(error, IllegalTagNameError);
					assert.strictEqual(tag, error.tag);
					assert.strictEqual(char, error.illegalChar);
				});
			}
		});
	});
});
