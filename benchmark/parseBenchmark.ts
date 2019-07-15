/* tslint:disable:no-console */
import { Event, Suite } from "benchmark";
import { parse } from "../src/Parser";
import { toJSON } from "../src/json";

const N_CHILDREN = 10;
const MAX_DEPTH = 3;

const LINE_CONTENT =
	// tslint:disable-next-line:max-line-length
	"#tag Lorem \\# ipsum #tag[dolor *sit* amet, consectetur] adipiscing elit. #tag[Integer convallis nec turpis] quis \\[ ullamcorper. _Integer_ ultricies velit accumsan volutpat viverra. Nulla et nibh \\# sed nisl interdum \\[ fringilla \\[ id in leo. #tag[Integer laoreet leo mi, _non_ accumsan] diam sodales eu. Praesent sagittis _efficitur_ turpis, non ullamcorper velit dictum ac. _In_ hac habitasse #tag[platea #tag[dictumst]. Donec molestie #tag[#tag[#tag[eros] a nisi] elementum]], eu eleifend velit #tag[blandit]. #tag[Maecenas] ac neque in sapien tempus \\\\ ullamcorper quis vel magna. Morbi sed justo quis orci mattis dapibus. #tag Nulla #tag[tristique] elit magna.\n";

function generateBenchmarkInput(indent = "", depth = 0): string {
	if (depth > MAX_DEPTH) return "";
	return (indent + LINE_CONTENT + generateBenchmarkInput(indent + "\t", depth + 1)).repeat(
		N_CHILDREN
	);
}

// https://stackoverflow.com/a/18650828
function formatBytes(bytes: number, decimals = 2) {
	if (bytes === 0) return "0 Bytes";

	const k = 1000;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

const input = generateBenchmarkInput();
console.log("Size of test input: " + formatBytes(input.length));
const jsonAst = JSON.stringify(toJSON(parse(input)));
new Suite("compare")
	.add("Parse Hashmark", () => {
		parse(input);
	})
	.add("Parse JSON", () => {
		JSON.parse(jsonAst);
	})
	.add("String.matchAll", () => {
		for (const token of input.matchAll(
			/(?:((?:\r\n|\n|\r|^)(\t*)[\t ]*(?:#([^ \[\r\n]+)(?: |$))?)|(#([^ \[]+)(\[)?)|(]\[)|(\[)|(\\(.)))/g
		));
	})
	.add("Iterate through chars", () => {
		const SHARP = "#";
		const OPENING_BRACKET = "[";
		const end = input.length;
		for (let i = 0; i < end; ++i) {
			switch (input.charAt(i)) {
				case SHARP:
					break;
				case OPENING_BRACKET:
					break;
			}
		}
	})
	// add listeners
	.on("cycle", (event: Event) => {
		console.log(String(event.target));
	})
	.on("complete", function() {
		console.log("JSON/Hashmark ratio: " + (this[1].stats.mean / this[0].stats.mean).toFixed(2));
	})
	// run async
	.run({ async: true });
