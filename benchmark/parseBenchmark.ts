/* tslint:disable:no-console */
import * as Benchmark from "benchmark";
import { parse } from "../src/parser/parse";
import { formatBytes, generateBenchmarkInput } from "./utils";

const input = generateBenchmarkInput();
console.log("Size of test input: " + formatBytes(input.length));
const jsonStr = JSON.stringify(parse(input, false));
new Benchmark.Suite("compare")
	.add("Parse Hashml", () => {
		return parse(input);
	})
	.add("Parse JSON", () => {
		return JSON.parse(jsonStr);
	})
	.add("String.matchAll", () => {
		return [
			...input.matchAll(
				/(?:((?:\r\n|\n|\r|^)(\t*)[\t ]*(?:#([^ \[\r\n]+)(?: |$))?)|(#([^ \[]+)(\[)?)|(]\[)|(\[)|(\\(.)))/g
			)
		];
	})
	.add("Iterate through chars", () => {
		const SHARP = "#";
		const OPENING_BRACKET = "[";
		let n = 0;
		const end = input.length;
		for (let i = 0; i < end; ++i) {
			switch (input.charAt(i)) {
				case SHARP:
				case OPENING_BRACKET:
					++n;
					break;
			}
		}
		return n;
	})
	// add listeners
	.on("cycle", (event: Event) => {
		console.log(String(event.target));
	})
	.on("complete", function (this: Benchmark[]) {
		console.log("JSON/Hashml ratio: " + (this[1].stats.mean / this[0].stats.mean).toFixed(2));
		console.log("Hashml throughput: " + formatBytes(input.length / this[0].stats.mean) + "/s");
	})
	// run async
	.run({ async: true });
