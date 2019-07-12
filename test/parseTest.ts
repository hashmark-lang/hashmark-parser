import { assert } from "chai";
import { Parser } from "../src/Parser";
import { defaultSchema } from "../src/schema";
import { FileInfo, filesIn } from "./utils";

/* tslint:disable:only-arrow-functions */

describe("parse()", function() {
	for (const output of filesIn("test/output/parse", ".json")) {
		before(function() {
			const schema = {
				...defaultSchema,
				sugars: [
					{
						start: "`",
						end: "`",
						tag: "code"
					},
					{
						start: "*",
						end: "*",
						tag: "strong"
					},
					{
						start: "_",
						end: "_",
						tag: "emphasis"
					},
					{
						start: "{",
						separator: "|",
						end: "}",
						tag: "set"
					}
				],
				isRawBlock(name: string): boolean {
					return name === "rawBody";
				},

				isRawHead(name: string): boolean {
					return name === "rawHead";
				},

				isRawArg(name: string, index: number): boolean {
					return (name === "rawArg1" && index === 1) || name === "code";
				},

				isValidArgChild(parent: string, index: number, child: string): boolean {
					return child !== "code";
				}
			};
			this.parser = new Parser(schema);
		});

		it(`works with ${output.name}`, function() {
			const input = new FileInfo("test/input", output.name, ".hm");
			assert.deepStrictEqual(
				this.parser.parse(input.readContent()),
				JSON.parse(output.readContent())
			);
		});
	}
});
