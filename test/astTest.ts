import { assert } from "chai";
import { Block, getHeadString, query, queryAll, queryAllChildren, queryChildren } from "../src/ast";
import { parse } from "../src/parse";
import { readInputFile } from "./util";

describe("ast", () => {
	const bigFile = parse(readInputFile("bigfile.hm"));
	const doc = query(bigFile, "document") as Block;
	const os = parse(readInputFile("os.hm"));
	const list = parse(readInputFile("list.hm"));

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
			const document = query(bigFile, "document")!;
			assert.notEqual(document, undefined);
			assert.strictEqual(getHeadString(document), "Big file");
		});

		it("finds the first descendant", () => {
			const def = query(os, "def")!;
			assert.strictEqual(getHeadString(def), "Operating System");
		});
	});

	describe("queryChildren()", () => {
		it("finds the first matching child", () => {
			const section = queryChildren(doc, "section")!;
			assert.strictEqual(getHeadString(section), "1");
		});

		it("does not find lower descendants", () => {
			assert.isUndefined(queryChildren(bigFile, "section"));
		});
	});

	describe("getHeadString()", () => {
		it("returns the head string if the head is a single string", () => {
			const author = query(bigFile, "author")!;
			assert.strictEqual(getHeadString(author), "Matthieu Bovel");
		});

		it("returns an empty string when there is no head", () => {
			const listBlock = query(list, "list")!;
			assert.strictEqual(getHeadString(listBlock), "");
		});
	});
});
