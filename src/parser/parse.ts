import { IRBlockHandler } from "../ir/IRBlockHandler";
import { IRNode } from "../ir/IRNode";
import { BlockParser } from "../parser/BlockParser";
import { ErrorLogger } from "../schema/errors";
import { Schema } from "../schema/Schema";
import { SchemaDefinition } from "../schema/SchemaDefinition";

export function makeParser(
	schema: SchemaDefinition,
	logger: ErrorLogger
): (input: string) => IRNode {
	const handler = new IRBlockHandler(new Schema(schema), logger);
	const parser = new BlockParser(handler);
	return (input: string) => {
		handler.reset();
		parser.parse(input);
		return handler.getResult();
	};
}

export function parse(input: string, schema: SchemaDefinition, logger: ErrorLogger): IRNode {
	return makeParser(schema, logger)(input);
}
