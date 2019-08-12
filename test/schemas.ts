import {
	inlineProp,
	prop,
	rawInlineProp,
	rawTag,
	sugar,
	zeroOrMore
} from "../src/schema/schema-generators";
import { Cardinality, INVALID_TAG, ROOT, SchemaDefinition } from "../src/schema/SchemaDefinition";

export function getAllowAllSchema(): SchemaDefinition {
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
		inline: {}
	};
}

export function getEmptySchema(): SchemaDefinition {
	return {
		blocks: {
			[ROOT]: { props: [] }
		},
		inline: {}
	};
}

export function getDocumentSchema(): SchemaDefinition {
	const inlineTags = ["link", "bold", "inline", "code"];
	const blockContent = ["paragraph", "section", "code"].map(tag => zeroOrMore(tag));

	return {
		blocks: {
			[ROOT]: {
				defaultTag: "paragraph",
				props: [prop("content", blockContent)]
			},
			["paragraph"]: {
				head: inlineProp("title", inlineTags),
				props: []
			},
			["section"]: {
				head: inlineProp("title", inlineTags),
				defaultTag: "paragraph",
				props: [prop("content", blockContent)]
			},
			["code"]: rawTag("content")
		},

		inline: {
			["link"]: {
				sugar: sugar("[", "](", ")"),
				props: [rawInlineProp("url"), inlineProp("text", ["bold"])]
			},
			["bold"]: {
				sugar: sugar("*", "*"),
				props: [inlineProp("text", ["link"])]
			},
			["inline"]: {
				props: [inlineProp("inlineContent", inlineTags)]
			},
			["code"]: {
				props: [rawInlineProp("content")],
				sugar: sugar("`", "`")
			}
		}
	};
}
