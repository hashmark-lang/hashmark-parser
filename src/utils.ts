// From https://stackoverflow.com/a/16046903
export function countCaptureGroups(regex: RegExp) {
	return new RegExp(regex.source + "|").exec("")!.length - 1;
}

export function last<T>(seq: { [index: number]: T; length: number }): T {
	return seq[seq.length - 1];
}
