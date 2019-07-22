// Additional rule:
//   All prop names within an element must be different

export const enum Reserved {
	rootTag = "root",
	defaultTag = "_default",
	rawLine = "_raw_line"
}

export interface Schema {
	root: Omit<BlockSchema, "tag" | "head">;
	blockElements: BlockSchema[];
	inlineElements: InlineSchema[];
}

export interface BlockSchema {
	defaultTag?: string;
	invalidTag?: string;
	props: [RawBlockProp] | BlockProp[];
	tag: string;
	head?: InlineProp;
}

export interface RawBlockProp {
	name: string;
	raw: true;
}

export interface BlockProp {
	name: string;
	raw: undefined;
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
	tag: string;
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
			raw: undefined;
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
