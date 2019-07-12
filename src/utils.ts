// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
export function escapeRegExp(regexp: string): string {
	return regexp.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
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
