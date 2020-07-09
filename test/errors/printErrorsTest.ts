import { resourceFile, assertEqualsSnapshot } from "../utils";
import { parse } from "../../src/parser/parse";
import { printErrors } from "../../src/printErrors";

describe("printErrors", () => {
	it("works", () => {
		const input = resourceFile("input", "blocks", "os.hm");
		const snapshot = resourceFile("output", "printErrors.txt");
		const ast = parse(input.read());
		ast.get("title")!.parsedLabel.get("strong")!.error = "Strong not allowed in title";
		ast.get("subtitle")!.parsedLabel.get("link")!.args[1].error = "404 not found";
		ast.get("published")!.labelError = "Invalid date";
		ast.get("section")!.tagError = "Invalid tag";
		ast.get(undefined)!.tagError = "Paragraph not allowed after section";
		assertEqualsSnapshot(printErrors(ast), snapshot);
	});
});
