import { ArgSchema, BlockSchema, BodyPropSchema, InlineSchema, Schema } from "../schema/Schema";
import { SchemaDefinition } from "../schema/SchemaDefinition";
import { capitalize } from "../utils";
import {
	createArrayType,
	createImport,
	createInterface,
	createInterfaceMember,
	createLiteralStringType,
	createParserFunction,
	createSchema,
	createTypeAlias,
	createUnionType,
	disclaimer,
} from "./printers";

const ROOT_TYPE = "Root";
const TAG_TYPE = "Tag";
const BLOCK_TYPE = "Block";
const INLINE_TYPE = "Inline";

const TAG_KEY = "$tag";

export function convertSchemaToTypescript(
	schema: Schema,
	definition: SchemaDefinition,
	importPath: string = "@hashml/hashml"
): string {
	const blockIdentifiers = createIdentifierMap(
		schema.blocks.map((_) => _.tag),
		"",
		"Block"
	);
	const inlineIdentifiers = createIdentifierMap(
		schema.inlines.map((_) => _.tag),
		"",
		"Inline"
	);

	function createBlock(typeName: string, block: BlockSchema): string {
		const props = block.bodyProps.map((prop) =>
			createInterfaceMember(prop.name, bodyPropType(prop))
		);
		if (block.head) props.push(createInterfaceMember(block.head.name, argType(block.head)));
		return createTagType(typeName, block.tag, props);
	}

	function createInline(typeName: string, inline: InlineSchema): string {
		const props = inline.args.map((arg) => createInterfaceMember(arg.name, argType(arg)));
		return createTagType(typeName, inline.tag, props);
	}

	function bodyPropType(prop: BodyPropSchema): string {
		if (prop.raw) return "string[]";
		const refs = prop.children.map((child) => blockIdentifiers.get(child)!);
		if (prop.isArrayType) return createArrayType(createUnionType(refs));
		if (prop.cardinality.max === 0) return "null";
		if (prop.cardinality.min === 0) return createUnionType([...refs, "null"]);
		if (prop.cardinality.min === 1 && prop.cardinality.max === 1) return createUnionType(refs);
		throw new Error(`Could not convert cardinality ${JSON.stringify(prop.cardinality)}`);
	}

	function argType(arg: ArgSchema): string {
		switch (arg.type) {
			case "parsed": {
				const refs = [...arg.validChildren].map((child) => inlineIdentifiers.get(child)!);
				return createArrayType(createUnionType([...refs, "string"]));
			}
			case "date":
				return "Date";
			case "url":
				return "URL";
			case "string":
				return "string";
		}
	}

	const imports = createImport(["HMError", "parse", "SchemaDefinition"], importPath);
	const parseFunction = createParserFunction(ROOT_TYPE);
	const tagUnion = createTypeAlias(TAG_TYPE, createUnionType([BLOCK_TYPE, INLINE_TYPE]));
	const blockUnion = createTypeAlias(BLOCK_TYPE, createUnionType([...blockIdentifiers.values()]));
	const inlineUnion = createTypeAlias(
		INLINE_TYPE,
		createUnionType([...inlineIdentifiers.values()])
	);
	const root = createBlock(ROOT_TYPE, schema.rootSchema);
	const blocks = schema.blocks.map((block) =>
		createBlock(blockIdentifiers.get(block.tag)!, block)
	);
	const inlines = schema.inlines.map((inline) =>
		createInline(inlineIdentifiers.get(inline.tag)!, inline)
	);

	return (
		[
			disclaimer,
			imports,
			tagUnion,
			blockUnion,
			inlineUnion,
			root,
			...blocks,
			...inlines,
			createSchema(definition),
			parseFunction,
		].join("\n") + "\n"
	);
}

// Creates a map from tag name to tag type
function createIdentifierMap(
	names: string[],
	prefix: string = "",
	suffix: string = ""
): ReadonlyMap<string, string> {
	return new Map(names.map((name) => [name, identifier(prefix, name, suffix)]));
}

function identifier(prefix: string, name: string, suffix: string): string {
	return (capitalize(prefix) + capitalize(name) + capitalize(suffix)).replace(/\W+/g, "_");
}

function createTagType(typeName: string, tagName: string, propsTypeMembers: string[]): string {
	return createInterface(typeName, [
		createInterfaceMember(TAG_KEY, createLiteralStringType(tagName)),
		...propsTypeMembers,
	]);
}
