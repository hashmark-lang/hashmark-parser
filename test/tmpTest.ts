import { generateDocs } from "../src/schema/docgen";
import { getDocumentSchema } from "./schemas";

describe("generate docs", () => {
	it("works", async () => {
		const res = await generateDocs(getDocumentSchema(), "docs2");
	});
});
