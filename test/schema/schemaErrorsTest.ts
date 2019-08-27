import { assert } from "chai";
import {
	DuplicatePropAssignmentError,
	DuplicatePropNameError,
	IllegalPropNameError
} from "../../src";
import {
	blockTag,
	dateArg,
	inline,
	lineTag,
	oneOrMore,
	prop,
	props,
	rawBodyTag,
	root,
	stringArg,
	stringTag,
	urlArg,
	zeroOrMore
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
						["test"]: blockTag(stringArg("foo"), prop("foo"))
					},
					inline: {}
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
					root: root(prop("body", zeroOrMore("foo"))),
					blocks: {},
					inline: {
						["foo"]: inline(stringArg("bar"), urlArg("bar"), dateArg("bar"))
					}
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
						)
					},
					inline: {}
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
						["bar"]: stringTag("prop")
					},
					inline: {}
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
						["test"]: rawBodyTag("$foo")
					},
					inline: {}
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
					root: root(prop("body", zeroOrMore("test"))),
					blocks: {
						["block"]: lineTag("prop", ["test"])
					},
					inline: {
						["test"]: inline(stringArg("$foo"))
					}
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
						["test"]: stringTag("test")
					},
					inline: {}
				};

				const errors = schemaErrors(schema);
				assert.lengthOf(errors, 1);

				const error = errors[0] as IllegalPropNameError;
				assert.instanceOf(error, IllegalPropNameError);
				assert.strictEqual(error.tag, ROOT);
				assert.deepStrictEqual(error.propName, "$body");
			});
		});
	});
});
