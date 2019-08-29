import {
	lineTag,
	one,
	optional,
	parsedArg,
	prop,
	stringTag,
	zeroOrMore
} from "./schema-generators";
import { SchemaDefinition } from "./SchemaDefinition";

const ROOT = "root";
const BLOCK = "block";
const INLINE = "inline";

const DEFAULT = "default";
const HEAD = "head";
const BODY = "body";
const PROP = "prop";

const OPTIONAL = "optional";
const ONE = "one";
const ONE_OR_MORE = "oneOrMore";
const ZERO_OR_MORE = "zeroOrMore";

const ARGS = "args";

const PARSED_ARG = "hashml";
const ITEM = "item";
const STRING_ARG = "string";
const DATE_ARG = "date";
const URL_ARG = "url";

const SUGAR = "sugar";
const START = "start";
const SEPARATOR = "separator";
const END = "end";

export const schemaSchema: SchemaDefinition = {
	root: {
		rawBody: false,
		props: {
			body: {
				root: one(ROOT),
				blocks: zeroOrMore(BLOCK),
				inline: zeroOrMore(INLINE)
			}
		}
	},

	blocks: {
		[ROOT]: {
			rawBody: false,
			props: {
				body: {
					defaultTag: optional(DEFAULT),
					body: one(BODY)
				}
			}
		},

		[BLOCK]: {
			rawBody: false,
			props: {
				head: parsedArg("name", []),
				body: {
					defaultTag: optional(DEFAULT),
					head: optional(HEAD),
					body: optional(BODY)
				}
			}
		},
		[DEFAULT]: lineTag("name", []),
		[HEAD]: {
			rawBody: false,
			props: {
				body: prop(
					"type",
					optional(PARSED_ARG),
					optional(STRING_ARG),
					optional(DATE_ARG),
					optional(URL_ARG)
				)
			}
		},
		[BODY]: {
			rawBody: false,
			props: {
				body: {
					props: zeroOrMore(PROP)
				}
			}
		},
		[PROP]: {
			rawBody: false,
			defaultTag: ITEM,
			props: {
				head: parsedArg("name", []),
				body: prop(
					"content",
					zeroOrMore(OPTIONAL),
					zeroOrMore(ONE),
					zeroOrMore(ONE_OR_MORE),
					zeroOrMore(ZERO_OR_MORE)
				)
			}
		},
		[OPTIONAL]: lineTag("target", []),
		[ONE]: lineTag("target", []),
		[ONE_OR_MORE]: lineTag("target", []),
		[ZERO_OR_MORE]: lineTag("target", []),

		[INLINE]: {
			rawBody: false,
			props: {
				head: parsedArg("name", []),
				body: {
					args: one(ARGS),
					sugar: optional(SUGAR)
				}
			}
		},
		[ARGS]: {
			rawBody: false,
			props: {
				body: prop(
					"args",
					zeroOrMore(PARSED_ARG),
					zeroOrMore(STRING_ARG),
					zeroOrMore(DATE_ARG),
					zeroOrMore(URL_ARG)
				)
			}
		},

		[PARSED_ARG]: {
			rawBody: false,
			defaultTag: ITEM,
			props: {
				head: parsedArg("propName", []),
				body: prop("content", zeroOrMore(ITEM))
			}
		},
		[ITEM]: lineTag("target", []),
		[STRING_ARG]: lineTag("propName", []),
		[DATE_ARG]: lineTag("propName", []),
		[URL_ARG]: lineTag("propName", []),

		[SUGAR]: {
			rawBody: false,
			props: {
				body: {
					[START]: one(START),
					[SEPARATOR]: optional(SEPARATOR),
					[END]: one(END)
				}
			}
		},
		[START]: stringTag("token"),
		[SEPARATOR]: stringTag("token"),
		[END]: stringTag("token")
	},
	inline: {}
};
