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

const cardinalityConstraints = {
	[Cardinality.One]: { min: 1, max: 1 },
	[Cardinality.OneOrMore]: { min: 1, max: Infinity },
	[Cardinality.Optional]: { min: 0, max: 1 },
	[Cardinality.ZeroOrMore]: { min: 0, max: Infinity }
};
export function cardinalityToConstraint(cardinality: Cardinality): CardinalityConstraint {
	return cardinalityConstraints[cardinality];
}

const cardinalityStrings = {
	[Cardinality.One]: "exactly one",
	[Cardinality.OneOrMore]: "one or more",
	[Cardinality.Optional]: "zero or one",
	[Cardinality.ZeroOrMore]: "zero or more"
};
export function cardinalityToString(cardinality: Cardinality): string {
	return cardinalityStrings[cardinality];
}

export function constraintToCardinality({ min, max }: CardinalityConstraint): Cardinality {
	if (min === 0 && max === 1) return Cardinality.Optional;
	if (min === 1) {
		if (max === 1) return Cardinality.One;
		return Cardinality.OneOrMore;
	}
	return Cardinality.ZeroOrMore;
}

export function sumCardinalities(cardinalities: Cardinality[]): Cardinality {
	const constraints = cardinalities.map(card => cardinalityConstraints[card]);
	const min = constraints.map(_ => _.min).reduce((a, b) => a + b, 0);
	const max = constraints.map(_ => _.max).reduce((a, b) => a + b, 0);
	return constraintToCardinality({ min, max });
}
