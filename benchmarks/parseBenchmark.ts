import { Event, Suite } from "benchmark";
import * as fs from "fs";
import { parse } from "../src/parse";

/* tslint:disable:no-console */
if (process.argv.length !== 3) {
	console.error("Usage: node parseBechmark.js [input]");
}

const input: string = fs.readFileSync(process.argv[2], { encoding: "utf-8" });

console.log(JSON.stringify(parse(input)));

// add tests
new Suite("os")
	.add("parse all", () => {
		parse(input);
	})
	// add listeners
	.on("cycle", (event: Event) => {
		console.log(String(event.target));
	})
	.on("complete", function() {
		console.log("Fastest is " + this.filter("fastest").map("name"));
	})
	// run async
	.run({ async: true });
