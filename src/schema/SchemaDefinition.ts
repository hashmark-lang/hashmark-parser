export const enum Reserved {
	rootTag = "root",
	defaultTag = "_default",
	rawLine = "_raw_line"
}

export const ROOT = "root";
export const INVALID_TAG = "*";

export interface SchemaDefinition {
	blocks: {
		[ROOT]: Omit<BlockSchemaDefinition, "head">;
		[tag: string]: BlockSchemaDefinition;
	};
	inline: {
		[tag: string]: InlineSchemaDefinition;
	};
}

export interface BlockSchemaDefinition {
	head?: InlinePropDefinition;
	defaultTag?: string;
	props: [RawBlockPropDefinition] | BlockPropDefinition[];
}

export interface RawBlockPropDefinition {
	name: string;
	raw: true;
}

export interface BlockPropDefinition {
	name: string;
	raw?: undefined; // TODO remove this while keeping discriminated union
	content: BlockPropContentDefinition[];
}

export interface BlockPropContentDefinition {
	tag: string;
	cardinality: Cardinality;
}

export const enum Cardinality {
	ZeroOrMore = "zeroOrMore",
	OneOrMore = "oneOrMore",
	One = "one",
	Optional = "optional"
}

export interface InlineSchemaDefinition {
	props: InlinePropDefinition[];
	sugar?: SugarSyntax;
}

export type InlinePropDefinition = RawInlinePropDefinition | ParsedInlinePropDefinition;

export interface RawInlinePropDefinition {
	name: string;
	raw: true;
}

export interface ParsedInlinePropDefinition {
	name: string;
	raw?: undefined;
	content: InlinePropContentDefinition[];
}

export interface InlinePropContentDefinition {
	schema: string;
	tag: string;
}

export interface SugarSyntax {
	start: string;
	separator?: string;
	end: string;
}
