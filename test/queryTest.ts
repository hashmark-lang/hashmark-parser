import { assert } from "chai";
import { Block, Inline, query, queryAll, queryAllChildren, queryChildren } from "../src/ast";
import { parse } from "../src/parse";
import { readInputFile } from "./util";

function getHead(block: Block | undefined): string | Inline | undefined {
	if (block) {
		return block.head[0];
	}
	return undefined;
}

describe("query", () => {
	const bigFile = parse(readInputFile("bigfile.hm"));
	const doc = query(bigFile, "document") as Block;
	const os = parse(readInputFile("os.hm"));

	describe("queryAll()", () => {
		it("finds all descendants", () => {
			assert.lengthOf(queryAll(doc, "section"), 90);
		});

		it("returns an empty list if no descendants match", () => {
			assert.isEmpty(queryAll(doc, "unknown"));
		});
	});

	describe("queryAllChildren()", () => {
		it("finds all children", () => {
			assert.lengthOf(queryAllChildren(doc, "section"), 9);
		});

		it("returns an empty list if no child matches", () => {
			assert.isEmpty(queryAllChildren(bigFile, "section"));
		});
	});

	describe("query()", () => {
		it("finds the first child element", () => {
			const document = query(bigFile, "document");
			assert.notEqual(document, undefined);
			assert.strictEqual(getHead(document), "Big file");
		});

		it("finds the first descendant", () => {
			const def = query(os, "def");
			assert.strictEqual(getHead(def), "Operating System");
		});
	});

	describe("queryChildren()", () => {
		it("finds the first matching child", () => {
			const section = queryChildren(doc, "section");
			assert.strictEqual(getHead(section), "1");
		});

		it("does not find lower descendants", () => {
			assert.strictEqual(queryChildren(bigFile, "section"), undefined);
		});
	});
});
