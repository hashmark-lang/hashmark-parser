export interface IRNode {
	tag: string;
	props: {
		[name: string]: Prop;
	};
}

// TODO remove later
export type IRNodeList = Array<string | IRNode>;

export type Prop =
	| string // Prop containing unparsed, type "string" content (head or arg)
	| URL // Prop containing unparsed, type "url" content (head or arg)
	| Date // Prop containing unparsed, type "date" content (head or arg)
	| Array<IRNode | string> // Prop containing parsed content (head or arg)
	| Quantified<IRNode>; // Prop containing other nodes (body)

type Quantified<T> =
	| T // Cardinality.One
	| [T, ...T[]] // Cardinality.OneOrMore
	| (T | null) // Cardinality.Optional
	| T[]; // Cardinality.ZeroOrMore

export function emptyBlockProps(propNames: ReadonlyArray<string>): { [key: string]: [] } {
	return Object.fromEntries(propNames.map(x => [x, []]));
}
