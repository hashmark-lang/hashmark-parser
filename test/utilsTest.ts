import { assert } from "chai";
import { capitalize, countOccurrences, ordinal } from "../src/utils";

describe("utils", () => {
	describe("ordinal()", () => {
		it("returns 1st for 1", () => {
			assert.strictEqual(ordinal(1), "1st");
		});

		it("returns 2nd for 2", () => {
			assert.strictEqual(ordinal(2), "2nd");
		});

		it("returns 3rd for 3", () => {
			assert.strictEqual(ordinal(3), "3rd");
		});

		it("returns 4th for 4", () => {
			assert.strictEqual(ordinal(4), "4th");
		});

		it("returns 11th for 11", () => {
			assert.strictEqual(ordinal(11), "11th");
		});

		it("returns 21st for 21", () => {
			assert.strictEqual(ordinal(21), "21st");
		});
	});

	describe("countOccurrences()", () => {
		it("returns an empty map for an empty array", () => {
			assert.isEmpty(countOccurrences([]));
		});

		it("returns the correct occurrence count", () => {
			const count = countOccurrences([1, 3, 2, 3, 2, 3]);
			assert.strictEqual(count.get(1), 1);
			assert.strictEqual(count.get(2), 2);
			assert.strictEqual(count.get(3), 3);
			assert.isUndefined(count.get(0));
		});
	});

	describe("capitalize()", () => {
		it('returns "" for ""', () => {
			const result = capitalize("");
			assert.strictEqual(result, "");
		});

		it('returns "Capitalized" for "capitalized"', () => {
			const result = capitalize("capitalized");
			assert.strictEqual(result, "Capitalized");
		});
	});
});
