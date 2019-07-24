import {
	BlockPropContentDefinition,
	BlockPropDefinition,
	BlockSchemaDefinition,
	Cardinality,
	InlinePropContentDefinition,
	InlinePropDefinition,
	RawBlockPropDefinition,
	RawInlinePropDefinition,
	SugarDefinition
} from "./SchemaDefinition";

type Nested<T> = Array<T | T[]>;

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

export function sugar(start: string, end: string): SugarDefinition;
// tslint:disable-next-line:unified-signatures
export function sugar(start: string, separator: string, end: string): SugarDefinition;
export function sugar(a: string, b: string, c?: string): SugarDefinition {
	if (c) {
		return { start: a, separator: b, end: c };
	} else {
		return { start: a, end: b };
	}
}

// Props:

export function prop(
	name: string,
	...content: Nested<BlockPropContentDefinition>
): BlockPropDefinition {
	return { name, content: content.flat() };
}

export function rawProp(name: string): [RawBlockPropDefinition] {
	return [{ name, raw: true }];
}

export function inlineProp(
	name: string,
	...content: Nested<InlinePropContentDefinition>
): InlinePropDefinition {
	return { name, content: content.flat() };
}

export function rawInlineProp(name: string): RawInlinePropDefinition {
	return { name, raw: true };
}

// Tag generators

export function flagTag(tag: string) {
	return { tag, props: [] };
}

export function lineTag(
	headName: string,
	...headContent: Nested<InlinePropContentDefinition>
): BlockSchemaDefinition {
	return { head: { name: headName, content: headContent.flat() }, props: [] };
}

export function rawTag(bodyPropName: string): BlockSchemaDefinition {
	return { props: [{ name: bodyPropName, raw: true }] };
}

export function ref(tag: string, schema: string = "[base]") {
	return { tag, schema };
}
