/* tslint:disable:no-console */
import * as Benchmark from "benchmark";
import { BlockElement, BlockParser } from "../src";
import { AstHandler } from "../src/ast/AstHandler";
import { toJSON } from "../src/output/json";
import { formatBytes, generateBenchmarkInput } from "./utils";

(function run() {
	const input = generateBenchmarkInput();
	console.log("Size of test input: " + formatBytes(input.length));
	const jsonAst = JSON.stringify(toJSON(parse(input)));
	new Benchmark.Suite("compare")
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
		.on("complete", function(this: Benchmark[]) {
			console.log(
				"JSON/Hashmark ratio: " + (this[1].stats.mean / this[0].stats.mean).toFixed(2)
			);
		})
		// run async
		.run({ async: true });
})();

const handler = new AstHandler();
const parser = new BlockParser(handler);

function parse(input: string): BlockElement {
	handler.reset();
	parser.parse(input);
	return handler.getResult();
}
