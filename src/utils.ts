// From https://stackoverflow.com/a/16046903
export function countCaptureGroups(regex: RegExp) {
	return new RegExp(regex.source + "|").exec("")!.length - 1;
}

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
export function escapeRegExp(regexp: string): RegExp {
	const escaped = regexp.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
	return new RegExp(escaped);
}

export function last<T>(seq: ArrayLike<T>): T {
	return seq[seq.length - 1];
}

export function countOccurrences<T>(arr: T[]): Map<T, number> {
	const map = new Map<T, number>();
	for (const item of arr) {
		const count = map.get(item) || 0;
		map.set(item, count + 1);
	}
	return map;
}
