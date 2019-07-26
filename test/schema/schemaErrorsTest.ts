import { assert } from "chai";
import {
	DuplicatePropAssignmentError,
	DuplicatePropNameError,
	DuplicatePropTagsError
} from "../../src";
import { oneOrMore, prop, zeroOrMore } from "../../src/schema/schema-generators";
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

	it("returns no errors for an empty schema", () => {
		assert.isEmpty(schemaErrors(emptySchema));
	});

	it("returns no errors for a valid schema", () => {
		assert.isEmpty(schemaErrors(documentSchema));
	});

	it("returns a DuplicatePropNameError when two block props have the same name", () => {
		const schema: SchemaDefinition = {
			blocks: {
				[ROOT]: {
					props: [{ name: "foo", content: [] }, { name: "foo", content: [] }]
				}
			},
			inline: {}
		};

		const errors = schemaErrors(schema);
		assert.lengthOf(errors, 1);

		const error = errors[0] as DuplicatePropNameError;
		assert.instanceOf(error, DuplicatePropNameError);
		assert.strictEqual(error.tag, ROOT);
		assert.strictEqual(error.propName, "foo");
		assert.strictEqual(error.repetitions, 2);
	});

	it("returns a DuplicatePropNameError when two inline props have the same name", () => {
		const schema: SchemaDefinition = {
			inline: {
				["foo"]: {
					props: [
						{ name: "bar", content: [] },
						{ name: "bar", content: [] },
						{ name: "bar", content: [] }
					]
				}
			},
			blocks: {
				[ROOT]: {
					props: [{ name: "foo", content: [] }]
				}
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

	it("returns a DuplicatePropTagsError when a block prop has the same content multiple times", () => {
		const schema: SchemaDefinition = {
			blocks: {
				[ROOT]: {
					props: [prop("foo", zeroOrMore("bar"), oneOrMore("bar"))]
				}
			},
			inline: {}
		};

		const errors = schemaErrors(schema);
		assert.lengthOf(errors, 1);

		const error = errors[0] as DuplicatePropTagsError;
		assert.instanceOf(error, DuplicatePropTagsError);
		assert.strictEqual(error.tag, ROOT);
		assert.strictEqual(error.propName, "foo");
		assert.strictEqual(error.contentTag, "bar");
		assert.strictEqual(error.repetitions, 2);
	});

	it("returns a DuplicatePropAssignmentError when the same tag is assigned to multiple props", () => {
		const schema: SchemaDefinition = {
			blocks: {
				[ROOT]: {
					props: [
						prop("foo", zeroOrMore("bar")),
						prop("baz", oneOrMore("bar")),
						prop("qux", oneOrMore("bar"))
					]
				}
			},
			inline: {}
		};

		const errors = schemaErrors(schema);
		assert.lengthOf(errors, 1);

		const error = errors[0] as DuplicatePropAssignmentError;
		assert.instanceOf(error, DuplicatePropAssignmentError);
		assert.strictEqual(error.tag, ROOT);
		assert.deepStrictEqual(error.propNames, ["foo", "baz", "qux"]);
		assert.strictEqual(error.contentTag, "bar");
	});
});
