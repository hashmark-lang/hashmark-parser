/* tslint:disable:no-console */
import { Event, Suite } from "benchmark";
import { IRBlockHandler } from "../src/ir/IRBlockHandler";
import { toXML } from "../src/output/xml";
import { BlockParser } from "../src/parser/BlockParser";
import { SchemaDecorator } from "../src/schema/Schema";
import { Cardinality, INVALID_TAG, ROOT, SchemaDefinition } from "../src/schema/SchemaDefinition";
import { formatBytes, generateBenchmarkInput } from "./utils";

const input = generateBenchmarkInput();
console.log("Size of test input: " + formatBytes(input.length));

const parser = new BlockParser(
	new IRBlockHandler(new SchemaDecorator(getAllowAllSchema()), item => item)
);

const ast = parser.parse(input);
if (ast === null) {
	throw new Error("AST was null");
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

function getAllowAllSchema(): SchemaDefinition {
	const blockProps = [
		{ name: "children", content: [{ tag: INVALID_TAG, cardinality: Cardinality.ZeroOrMore }] }
	];

	const blockContent = {
		head: { name: "head", content: [] },
		props: blockProps,
		defaultTag: "_default"
	};

	return {
		blocks: {
			[ROOT]: blockContent,
			["_default"]: blockContent,
			[INVALID_TAG]: blockContent
		},
		inline: {
			[INVALID_TAG]: {
				props: [{ name: "arg", content: [{ tag: INVALID_TAG, schema: "[base]" }] }]
			}
		}
	};
}
