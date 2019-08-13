/* tslint:disable:no-console */
import { Event, Suite } from "benchmark";
import { toXML } from "../src/output/xml";
import { getAllowAllSchema } from "../test/schemas";
import { makeTestParser } from "../test/utils";
import { formatBytes, generateBenchmarkInput } from "./utils";

const input = generateBenchmarkInput();
console.log("Size of test input: " + formatBytes(input.length));

const [errors, ast] = makeTestParser(getAllowAllSchema())(input);
if (errors.length > 0) {
	throw new Error("There were parsing errors. " + errors);
}

new Suite("XML serialization")
	.add("toXML", () => {
		toXML(ast);
	})
	.add("JSON.stringify", () => {
		JSON.stringify(ast, null, "\t");
	})
	// add listeners
	.on("cycle", (event: Event) => {
		console.log(String(event.target));
	})
	.on("complete", function(this: any[]) {
		console.log("JSON/XML ratio: " + (this[1].stats.mean / this[0].stats.mean).toFixed(2));
	})
	// run async
	.run({ async: true });
