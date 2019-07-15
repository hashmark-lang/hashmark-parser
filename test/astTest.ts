import { assert } from "chai";
import {
	BlockElement,
	getHeadString,
	query,
	queryAll,
	queryAllChildren,
	queryChildren
} from "../src/ast";
import { parse } from "../src/Parser";
import { readInputFile } from "./utils";

describe("ast", () => {
	let bigFile: BlockElement;
	let doc: BlockElement;
	let os: BlockElement;
	let list: BlockElement;
	let dfs: BlockElement;

	before(() => {
		bigFile = parse(readInputFile("bigfile.hm"));
		doc = query(bigFile, "document") as BlockElement;
		os = parse(readInputFile("os.hm"));
		list = parse(readInputFile("list.hm"));
		dfs = parse(readInputFile("dfs.hm"));
	});

	describe("queryAll()", () => {
		it("finds all descendants", () => {
			assert.lengthOf(queryAll(doc, "section"), 90);
		});

		it("returns an empty list if no descendants match", () => {
			assert.isEmpty(queryAll(doc, "unknown"));
		});

		it("finds descendants in document order", () => {
			const bars = queryAll(dfs, "bar")!;
			assert.notStrictEqual(bars, undefined);
			const heads = bars.map(getHeadString);
			assert.deepStrictEqual(heads, ["1", "2"]);
		});

		it("does not return the query node", () => {
			assert.isEmpty(queryAll(doc, "document"));
		});
	});

	describe("queryAllChildren()", () => {
		it("finds all children", () => {
			assert.lengthOf(queryAllChildren(doc, "section"), 9);
		});

		it("returns an empty list if no child matches", () => {
			assert.isEmpty(queryAllChildren(bigFile, "section"));
		});

		it("finds children in document order", () => {
			const sections = queryAllChildren(doc, "section")!;
			const heads = sections.map(getHeadString);
			const expected = Array.from({ length: 9 }, (_, index) => String(index + 1));
			assert.deepStrictEqual(heads, expected);
		});

		it("does not return the query node", () => {
			assert.isEmpty(queryAllChildren(doc, "document"));
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

		it("finds the first node in document order", () => {
			const bar = query(dfs, "bar")!;
			const head = getHeadString(bar);
			assert.notEqual(bar, undefined);
			assert.strictEqual(head, "1");
		});

		it("does not return the query node", () => {
			assert.isUndefined(query(doc, "document"));
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

		it("does not return the query node", () => {
			assert.isUndefined(queryChildren(doc, "document"));
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
