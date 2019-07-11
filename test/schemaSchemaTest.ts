import { assert } from "chai";
import { readFileSync } from "fs";
import { parse } from "../src/Parser";
import { ParsedSchema } from "../src/parseSchema";
import { filesIn } from "./utils";

function errorsToString(errors: Error[]): string {
	return "\n\t" + errors.map(e => "- " + e.message).join("\n\t") + "\n";
}

describe("schema-schema.hm", () => {
	const schemaSchema = new ParsedSchema(parse(readFileSync("src/schema-schema.hm", "utf-8")));

	it("validates itself", () => {
		const schemaSchemaFile = readFileSync("src/schema-schema.hm", "utf-8");
		const schemaSchemaAst = parse(schemaSchemaFile, schemaSchema);
		const errors = schemaSchema.validateBlock(schemaSchemaAst);
		assert.isEmpty(errors, errorsToString(errors));
	});

	for (const file of filesIn("test/input", ".hm")) {
		if (file.name.startsWith("schema_")) {
			const schema = parse(file.readContent(), schemaSchema);
			it("validates " + file.name + file.extension, () => {
				const errors = schemaSchema.validateBlock(schema);
				assert.isEmpty(errors, errorsToString(errors));
			});
		}
	}
});
