export const enum Cardinality {
	ZeroOrMore = "zeroOrMore",
	OneOrMore = "oneOrMore",
	One = "one",
	Optional = "optional"
}

export interface CardinalityConstraint {
	/** Minimum number of occurrences, inclusive */
	min: number;
	/** Maximum number of occurrences, inclusive */
	max: number;
}

export const cardinalityConstraints = {
	[Cardinality.One]: { min: 1, max: 1 },
	[Cardinality.OneOrMore]: { min: 1, max: Infinity },
	[Cardinality.Optional]: { min: 0, max: 1 },
	[Cardinality.ZeroOrMore]: { min: 0, max: Infinity }
};

export function cardinalityToString(cardinality: Cardinality): string {
	const strings = {
		[Cardinality.One]: "exactly one",
		[Cardinality.OneOrMore]: "one or more",
		[Cardinality.Optional]: "zero or one",
		[Cardinality.ZeroOrMore]: "zero or more"
	};
	return strings[cardinality];
}
