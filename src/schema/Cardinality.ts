export interface Cardinality {
	/** Minimum number of occurrences, inclusive */
	min: number;
	/** Maximum number of occurrences, inclusive */
	max: number;
}

export function sumCardinalities(cardinalities: Cardinality[]): Cardinality {
	const min = cardinalities.map(_ => _.min).reduce((a, b) => a + b, 0);
	const max = cardinalities.map(_ => _.max).reduce((a, b) => a + b, 0);
	return { min, max };
}
