// Additional rule:
//   All prop names within an element must be different

export const enum Reserved {
	rootTag = "root",
	defaultTag = "_default",
	rawLine = "_raw_line"
}

export const enum Cardinality {
	ZeroOrMore = "zeroOrMore",
	OneOrMore = "oneOrMore",
	One = "one",
	Optional = "optional"
}

interface BlockSchema {
	default?: string;
	props:
		| [{ name: string; content: "raw" }]
		| Array<{
				name: string;
				content: {
					[tag: string]: Cardinality;
				};
		  }>;
}

export interface Schema {
	root: BlockSchema;

	blockElements: {
		[tag: string]: BlockSchema & {
			head?: {
				name: string;
				content: "raw" | string[];
			};
		};
	};

	inlineElements: {
		[tag: string]: {
			props: Array<{
				name: string;
				content: "raw" | string[];
			}>;
			sugar?: {
				start: string;
				separator?: string;
				end: string;
			};
		};
	};
}
