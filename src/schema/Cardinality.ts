export const enum Cardinality {
	ZeroOrMore = "zeroOrMore",
	OneOrMore = "oneOrMore",
	One = "one",
	Optional = "optional"
}

export function cardinalityToString(cardinality: Cardinality): string {
	const strings = {
		[Cardinality.One]: "exactly one",
		[Cardinality.OneOrMore]: "one or more",
		[Cardinality.Optional]: "zero or one",
		[Cardinality.ZeroOrMore]: "zero or more"
	};
	return strings[cardinality];
}

/**
 * Returns whether a count is acceptable according to a given cardinality
 * constraint.
 *
 * @remarks
 * The behaviour of this function is undefined for anything else than positive
 * integers.
 *
 * @param count positive integer representing the count to check
 * @param constraint cardinality to check whether `count` is valid for
 * @returns `true` if `count` is allowed by `cardinality`, `false` otherwise
 */
export function isValidCount(count: number, constraint: Cardinality): boolean {
	switch (constraint) {
		case Cardinality.One:
			return count === 1;
		case Cardinality.OneOrMore:
			return count >= 1;
		case Cardinality.Optional:
			return count <= 1;
		case Cardinality.ZeroOrMore:
			return true;
	}
}
