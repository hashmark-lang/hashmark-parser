import { readSchema } from "../src/schema/readSchema";
import {
	blockTag,
	inline,
	inlineSugar,
	lineTag,
	optional,
	parsedArg,
	prop,
	rawBodyTag,
	root,
	stringArg,
	stringTag,
	sugar,
	urlArg,
	zeroOrMore,
} from "../src/schema/schema-generators";
import { BodyPropDefinitions, INVALID_TAG, SchemaDefinition } from "../src/schema/SchemaDefinition";
import { parseTyped } from "../src/schema/schemaSchemaInterface";
import { resourceFile } from "./utils";

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
		"link",
	];

	const blockProps: BodyPropDefinitions = prop("children", zeroOrMore(INVALID_TAG));
	const blockContent = blockTag(parsedArg("head", inlineTags), blockProps, "_default");

	return {
		root: root(blockProps, "_default"),
		blocks: {
			["rawHead"]: blockTag(stringArg("head"), blockProps),
			["rawBody"]: rawBodyTag("content"),
			["_default"]: blockContent,
			[INVALID_TAG]: blockContent,
		},
		inline: {
			["code"]: inlineSugar(sugar("`", "`"), stringArg("content")),
			["strong"]: inlineSugar(sugar("*", "*"), parsedArg("content", inlineTags)),
			["emphasis"]: inlineSugar(sugar("_", "_"), parsedArg("content", inlineTags)),
			["triplet"]: inlineSugar(
				sugar("{", "|", "}"),
				parsedArg("first", inlineTags),
				parsedArg("second", inlineTags),
				parsedArg("third", inlineTags)
			),
			["rawFirstArg"]: inlineSugar(
				sugar("{", "|", "}"),
				stringArg("first"),
				parsedArg("second", inlineTags)
			),
			["tag\\"]: inline(parsedArg("arg", inlineTags)),
			["inline"]: inline(parsedArg("arg", inlineTags)),
			["link"]: inline(urlArg("url"), parsedArg("title", inlineTags)),
		},
	};
}

export function getEmptySchema(): SchemaDefinition {
	return {
		root: root({}),
		blocks: {},
		inline: {},
	};
}

export function getDocumentSchema(): SchemaDefinition {
	const inlineTags = ["link", "bold", "code", "strong", "inline"];
	const blockContentProp = prop(
		"content",
		zeroOrMore("paragraph"),
		zeroOrMore("section"),
		zeroOrMore("code")
	);

	return {
		root: root(blockContentProp, "paragraph"),
		blocks: {
			["paragraph"]: lineTag("text", inlineTags),
			["section"]: blockTag(
				parsedArg("title", inlineTags),
				{ ...blockContentProp, id: optional("id") },
				"paragraph"
			),
			["id"]: stringTag("content"),
			["code"]: rawBodyTag("content", stringArg("language")),
		},
		inline: {
			["link"]: inlineSugar(
				sugar("[", "](", ")"),
				urlArg("url"),
				parsedArg("text", ["bold"])
			),
			["bold"]: inlineSugar(sugar("*", "*"), parsedArg("text", ["link"])),
			["strong"]: inline(parsedArg("text", ["link"])),
			["code"]: inlineSugar(sugar("`", "`"), stringArg("content")),
			["inline"]: inline(parsedArg("inlineContent", inlineTags)),
		},
	};
}

export function getDinosSchema() {
	const file = resourceFile("input", "schema_dinos.hm");
	const schema = parseTyped(file.read());
	if (schema instanceof Array) {
		throw new Error("Errors were found");
	}
	return readSchema(schema);
}
