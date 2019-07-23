// Additional rule:
//   All prop names within an element must be different

export const enum Reserved {
	rootTag = "root",
	defaultTag = "_default",
	rawLine = "_raw_line"
}

export const ROOT = "root";
export const INVALID_TAG = "*";

export interface Schema {
	blocks: {
		[ROOT]: Omit<BlockSchema, "head">;
		[tag: string]: BlockSchema;
	};
	inline: {
		[tag: string]: InlineSchema;
	};
}

export interface BlockSchema {
	head?: InlineProp;
	defaultTag?: string;
	props: [RawBlockProp] | BlockProp[];
}

export interface RawBlockProp {
	name: string;
	raw: true;
}

export interface BlockProp {
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

export interface InlineSchema {
	props: InlineProp[];
	sugar?: Sugar;
}

export type InlineProp =
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

export interface Sugar {
	start: string;
	separator?: string;
	end: string;
}
