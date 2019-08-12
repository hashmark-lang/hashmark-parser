import {
	BlockPropContentDefinition,
	BlockPropDefinition,
	BlockSchemaDefinition,
	Cardinality,
	InlinePropDefinition,
	RawBlockPropDefinition,
	RawInlinePropDefinition,
	SugarSyntax
} from "./SchemaDefinition";

// Cardinality:

export function oneOrMore(tag: string): BlockPropContentDefinition {
	return { tag, cardinality: Cardinality.OneOrMore };
}

export function one(tag: string): BlockPropContentDefinition {
	return { tag, cardinality: Cardinality.One };
}

export function zeroOrMore(tag: string): BlockPropContentDefinition {
	return { tag, cardinality: Cardinality.ZeroOrMore };
}

export function optional(tag: string): BlockPropContentDefinition {
	return { tag, cardinality: Cardinality.Optional };
}

// Sugar:

export function sugar(start: string, end: string): SugarSyntax;
// tslint:disable-next-line:unified-signatures
export function sugar(start: string, separator: string, end: string): SugarSyntax;
export function sugar(a: string, b: string, c?: string): SugarSyntax {
	if (c) {
		return { start: a, separator: b, end: c };
	} else {
		return { start: a, end: b };
	}
}

// Props:

export function prop(name: string, content: BlockPropContentDefinition[]): BlockPropDefinition {
	return { name, content: content.flat() };
}

export function rawProp(name: string): [RawBlockPropDefinition] {
	return [{ name, raw: true }];
}

export function inlineProp(name: string, content: string[]): InlinePropDefinition {
	return { name, content };
}

export function rawInlineProp(name: string): RawInlinePropDefinition {
	return { name, raw: true };
}

// Tag generators

export function flagTag(tag: string) {
	return { tag, props: [] };
}

export function rawTag(bodyPropName: string): BlockSchemaDefinition {
	return { props: [{ name: bodyPropName, raw: true }] };
}
