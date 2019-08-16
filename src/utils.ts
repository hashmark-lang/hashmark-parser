/**
 * Convert a string to a regexp, escaping any special characters.
 *
 * From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
 *
 * @param regexp String that the regex will match.
 * @category RegExp
 */
export function stringToRegexp(regexp: string): RegExp {
	return new RegExp(regexp.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")); // $& means the whole matched string
}

/**
 * Returns a union of regular expressions, in the given order.
 *
 * @param regExps Array of regular expressions to produce the union of
 * @category RegExp
 */
export function regexpUnion(...regExps: RegExp[]): RegExp {
	return new RegExp("(" + regExps.map(_ => `(?:${_.source})`).join("|") + ")", "g");
}

/**
 * Returns a copy of a sequence with duplicates removed.
 *
 * @remarks
 * Order of the first occurrences is preserved.
 * To see how this implementation respects that, see [the MDN documentation for `Set`][1].
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#Description
 *
 * @param seq Sequence of items, potentially with duplicates.
 * @category Array
 */
export function unique<T>(seq: Iterable<T>): T[] {
	return [...new Set<T>(seq)];
}

/**
 * Returns the last item in a sequence.
 *
 * @remarks
 * If the last item does not exist, this function will return `undefined`.
 * This is coherent with the behavior of arrays in TS, but means that this function should only
 * be called when we know that a last item exists.
 *
 * @typeparam T Type of the items in the sequence
 * @param seq String, array, or other array-like sequence
 * @category Array
 */
export function last<T>(seq: ArrayLike<T>): T {
	return seq[seq.length - 1];
}

/**
 * Returns a map of items to their occurrence count.
 *
 * @typeparam T Type of the items in the array
 * @param arr Array of repeated items
 * @category Array
 */
export function countOccurrences<T>(arr: T[]): Map<T, number> {
	const map = new Map<T, number>();
	for (const item of arr) {
		const count = map.get(item) || 0;
		map.set(item, count + 1);
	}
	return map;
}

/**
 * Returns the ordinal form of a number.
 * For example, the ordinal of 1 is "1st".
 *
 * @param i Number to convert to an ordinal.
 */
export function ordinal(i: number): string {
	function suffix(j: number) {
		const tens = j % 100;
		if (10 <= tens && tens <= 20) return "th";
		const units = tens % 10;
		if (units === 1) return "st";
		if (units === 2) return "nd";
		if (units === 3) return "rd";
		return "th";
	}
	return i + suffix(Math.abs(i));
}

export function capitalize(s: string): string {
	return s.charAt(0).toUpperCase() + s.slice(1);
}
