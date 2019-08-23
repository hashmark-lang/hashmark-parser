/*
import * as ts from "typescript";
import { capitalize } from "../utils";
import { Cardinality } from "./Cardinality";
import {
	BlockPropDefinition,
	BlockSchemaDefinition,
	InlinePropDefinition,
	InlineSchemaDefinition,
	RawBlockPropDefinition,
	SchemaDefinition
} from "./SchemaDefinition";

const STRING_TYPE = ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
const UNDEFINED_TYPE = ts.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword);

interface TypescriptConverterOptions {
	target: ts.ScriptTarget;
	newLine: ts.NewLineKind;
}

const defaultOptions: TypescriptConverterOptions = {
	target: ts.ScriptTarget.Latest,
	newLine: ts.NewLineKind.LineFeed
};

export function convertSchemaToTypescript(
	schema: SchemaDefinition,
	conversionOptions: Partial<TypescriptConverterOptions> = defaultOptions
) {
	const options = { ...defaultOptions, ...conversionOptions };
	const blockIdentifiers = createIdentifierMap(Object.keys(schema.blocks), "block");
	const inlineIdentifiers = createIdentifierMap(Object.keys(schema.inline), "inline");

	function createBlock(
		name: string,
		blockSchema: BlockSchemaDefinition
	): ts.InterfaceDeclaration {
		const props = blockSchema.props as Array<RawBlockPropDefinition | BlockPropDefinition>;
		const typeName = blockIdentifiers.get(name)!;
		const propsTypes = props.map(prop => createBlockProp(prop));
		if (blockSchema.head) {
			propsTypes.push(createInlineProp(blockSchema.head));
		}
		return createInterface(typeName, [
			createInterfaceMember("tag", ts.createLiteralTypeNode(ts.createStringLiteral(name))),
			createInterfaceMember("props", ts.createTypeLiteralNode(propsTypes))
		]);
	}

	function createBlockProp(prop: BlockPropDefinition | RawBlockPropDefinition): ts.TypeElement {
		if (prop.raw) {
			return createInterfaceMember(prop.name, STRING_TYPE);
		}
		// TODO temporary! Add a combineCardinalities() function later.
		const cardinality =
			prop.content.length === 1 ? prop.content[0].cardinality : Cardinality.ZeroOrMore;
		const refs = prop.content.map(rule =>
			ts.createTypeReferenceNode(blockIdentifiers.get(rule.tag)!, undefined)
		);
		return createInterfaceMember(
			prop.name,
			createCardinalityType(ts.createUnionTypeNode(refs), cardinality)
		);
	}

	function createInline(
		name: string,
		inlineSchema: InlineSchemaDefinition
	): ts.InterfaceDeclaration {
		const typeName = inlineIdentifiers.get(name)!;
		return createInterface(typeName, inlineSchema.props.map(prop => createInlineProp(prop)));
	}

	function createInlineProp(prop: InlinePropDefinition): ts.TypeElement {
		if (prop.raw) {
			return createInterfaceMember(prop.name, STRING_TYPE);
		}
		const refs: ts.TypeNode[] = prop.content.map(tag =>
			ts.createTypeReferenceNode(inlineIdentifiers.get(tag)!, undefined)
		);
		return createInterfaceMember(
			prop.name,
			ts.createArrayTypeNode(ts.createUnionTypeNode(refs.concat(STRING_TYPE)))
		);
	}

	const declarationFile = ts.createSourceFile(
		"out.d.ts",
		"",
		options.target,
		false,
		ts.ScriptKind.TS
	);
	const printer = ts.createPrinter({ newLine: options.newLine });
	const blocks = Object.entries(schema.blocks).map(([name, def]) => createBlock(name, def));
	const inlines = Object.entries(schema.inline).map(([name, def]) => createInline(name, def));
	return printer.printList(
		ts.ListFormat.MultiLine,
		ts.createNodeArray(blocks.concat(inlines)),
		declarationFile
	);
}

function createIdentifierMap(names: string[], prefix: string): ReadonlyMap<string, ts.Identifier> {
	const identifierCounts: Map<string, number> = new Map();
	function identifier(name: string): ts.Identifier {
		let id = capitalize(prefix) + capitalize(name).replace(/\W+/g, "_");
		const count = identifierCounts.get(id);
		identifierCounts.set(id, (count || 0) + 1);
		if (count) {
			id += "_" + count;
		}
		return ts.createIdentifier(id);
	}
	return new Map(names.map(name => [name, identifier(name)]));
}

function createCardinalityType(type: ts.TypeNode, cardinality: Cardinality): ts.TypeNode {
	switch (cardinality) {
		case Cardinality.One:
			return type;
		case Cardinality.OneOrMore:
			return ts.createTupleTypeNode([type, ts.createRestTypeNode(type)]);
		case Cardinality.Optional:
			return ts.createUnionTypeNode([type, UNDEFINED_TYPE]);
		case Cardinality.ZeroOrMore:
			return ts.createArrayTypeNode(type);
	}
}

function createInterface(
	name: string | ts.Identifier,
	members: ts.TypeElement[]
): ts.InterfaceDeclaration {
	const decorators: ts.Decorator[] = [];
	const modifiers: ts.Modifier[] = [ts.createModifier(ts.SyntaxKind.ExportKeyword)];
	const typeParameters: ts.TypeParameterDeclaration[] = [];
	const heritageClauses: ts.HeritageClause[] = [];
	return ts.createInterfaceDeclaration(
		decorators,
		modifiers,
		name,
		typeParameters,
		heritageClauses,
		members
	);
}

function createInterfaceMember(name: string, type: ts.TypeNode): ts.TypeElement {
	const modifiers = undefined;
	const questionToken = undefined;
	const initializer = undefined;
	return ts.createPropertySignature(modifiers, name, questionToken, type, initializer);
}
*/
