import {
	inlineProp,
	prop,
	rawInlineProp,
	rawTag,
	sugar,
	zeroOrMore
} from "../src/schema/schema-generators";
import { Cardinality, INVALID_TAG, ROOT, SchemaDefinition } from "../src/schema/SchemaDefinition";

export function getTestSchema(): SchemaDefinition {
	const inlineTags = [
		"triplet",
		"strong",
		"emphasis",
		"inline",
		"code",
		"rawFirstArg",
		"tag\\",
		"inline",
		"link"
	];

	const blockProps = [
		{ name: "children", content: [{ tag: INVALID_TAG, cardinality: Cardinality.ZeroOrMore }] }
	];

	const blockContent = {
		head: { name: "head", content: inlineTags },
		props: blockProps,
		defaultTag: "_default"
	};

	return {
		blocks: {
			[ROOT]: blockContent,
			["rawHead"]: {
				head: { name: "head", raw: true },
				props: blockProps
			},
			["rawBody"]: {
				props: [{ name: "content", raw: true }]
			},
			["_default"]: blockContent,
			[INVALID_TAG]: blockContent
		},
		inline: {
			["code"]: {
				sugar: { start: "`", end: "`" },
				props: [{ name: "content", raw: true }]
			},
			["strong"]: {
				sugar: { start: "*", end: "*" },
				props: [{ name: "content", content: inlineTags }]
			},
			["emphasis"]: {
				sugar: { start: "_", end: "_" },
				props: [{ name: "content", content: inlineTags }]
			},
			["triplet"]: {
				sugar: { start: "{", separator: "|", end: "}" },
				props: [
					{ name: "first", content: inlineTags },
					{ name: "second", content: inlineTags },
					{ name: "third", content: inlineTags }
				]
			},
			["rawFirstArg"]: {
				sugar: { start: "{", separator: "|", end: "}" },
				props: [{ name: "first", raw: true }, { name: "second", content: inlineTags }]
			},
			["tag\\"]: {
				props: [{ name: "arg", content: inlineTags }]
			},
			["inline"]: {
				props: [{ name: "arg", content: inlineTags }]
			},
			["link"]: {
				props: [{ name: "url", raw: true }, { name: "title", content: inlineTags }]
			}
		}
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
	const inlineTags = ["link", "bold", "code"];
	const blockContent = ["paragraph", "section", "code"].map(tag => zeroOrMore(tag));

	return {
		blocks: {
			[ROOT]: {
				defaultTag: "paragraph",
				props: [prop("content", blockContent)]
			},
			["paragraph"]: {
				head: inlineProp("text", inlineTags),
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
			["code"]: {
				props: [rawInlineProp("content")],
				sugar: sugar("`", "`")
			}
		}
	};
}
