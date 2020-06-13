import { resourceFile, assertEqualsSnapshot } from "../utils";
import { ErrorsMap } from "../../src/errors/ErrorsMap";
import { parse } from "../../src/parser/parse";
import { printBlockErrors } from "../../src/errors/printBlocksErrors";

describe("printBlocksErrors", () => {
	it("works", () => {
		const input = resourceFile("input", "blocks", "os.hm");
		const snapshot = resourceFile("output", "printBlocksErrors.txt");
		const ast = parse(input.read());
		const errors: ErrorsMap = {
			labelErrors: new WeakMap([[ast[0].get("published")!, "Invalid date"]]),
			tagErrors: new WeakMap([[ast[0].get("section")!, "Invalid tag"]]),
			argErrors: new WeakMap()
		};
		assertEqualsSnapshot(printBlockErrors(ast, errors), snapshot);
	});
});
