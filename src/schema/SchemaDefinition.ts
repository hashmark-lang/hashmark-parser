// Additional rule:
//   All prop names within an element must be different

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
	content: Array<{
		tag: string;
		cardinality: Cardinality;
	}>;
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

export type InlinePropDefinition =
	| {
			name: string;
			raw: true;
	  }
	| {
			name: string;
			raw?: undefined; // TODO remove this while keeping discriminated union
			content: Array<{
				schema: string;
				tag: string;
			}>;
	  };

export interface SugarSyntax {
	start: string;
	separator?: string;
	end: string;
}
