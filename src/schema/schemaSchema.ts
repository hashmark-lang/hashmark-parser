import { Cardinality, Schema } from "./schema";

export const schemaSchema: Schema = {
	root: {
		props: [
			{ name: "root", content: { ["root"]: Cardinality.One } },
			{ name: "blockElements", content: { ["block"]: Cardinality.OneOrMore } },
			{ name: "inlineElements", content: { ["inline"]: Cardinality.OneOrMore } }
		]
	},

	blockElements: {
		["root"]: {
			props: [
				{ name: "props", content: { ["prop"]: Cardinality.ZeroOrMore } },
				{ name: "default", content: { ["default"]: Cardinality.Optional } }
			]
		},

		["block"]: {
			head: {
				name: "name",
				content: "raw"
			},
			props: [
				{ name: "head", content: { ["head"]: Cardinality.Optional } },
				{ name: "default", content: { ["default"]: Cardinality.Optional } },
				{ name: "props", content: { ["prop"]: Cardinality.ZeroOrMore } }
			]
		},

		["inline"]: {
			head: {
				name: "name",
				content: "raw"
			},
			props: [
				{ name: "props", content: { ["prop"]: Cardinality.OneOrMore } },
				{ name: "sugar", content: { ["sugar"]: Cardinality.Optional } }
			]
		},

		["sugar"]: {
			props: [
				{ name: "start", content: { ["start"]: Cardinality.One } },
				{ name: "separator", content: { ["separator"]: Cardinality.Optional } },
				{ name: "end", content: { ["end"]: Cardinality.One } }
			]
		},

		["prop"]: {
			head: {
				name: "name",
				content: "raw"
			},
			props: [
				{
					name: "content",
					content: {
						[Cardinality.ZeroOrMore]: Cardinality.ZeroOrMore,
						[Cardinality.OneOrMore]: Cardinality.ZeroOrMore,
						[Cardinality.One]: Cardinality.ZeroOrMore,
						[Cardinality.Optional]: Cardinality.ZeroOrMore
					}
				},
				{
					name: "raw",
					content: {
						["raw"]: Cardinality.Optional
					}
				}
			]
		},

		["head"]: {
			head: {
				name: "name",
				content: "raw"
			},
			props: [
				{
					name: "content",
					content: {
						[Cardinality.ZeroOrMore]: Cardinality.ZeroOrMore,
						[Cardinality.OneOrMore]: Cardinality.ZeroOrMore,
						[Cardinality.One]: Cardinality.ZeroOrMore,
						[Cardinality.Optional]: Cardinality.ZeroOrMore
					}
				}
			]
		},

		["default"]: {
			head: {
				name: "tag",
				content: "raw"
			},
			props: []
		},

		[Cardinality.ZeroOrMore]: {
			head: {
				name: "tag",
				content: "raw"
			},
			props: []
		},

		[Cardinality.OneOrMore]: {
			head: {
				name: "tag",
				content: "raw"
			},
			props: []
		},

		[Cardinality.One]: {
			head: {
				name: "tag",
				content: "raw"
			},
			props: []
		},

		[Cardinality.Optional]: {
			head: {
				name: "tag",
				content: "raw"
			},
			props: []
		},

		["start"]: {
			head: {
				name: "delimiter",
				content: "raw"
			},
			props: []
		},

		["separator"]: {
			head: {
				name: "delimiter",
				content: "raw"
			},
			props: []
		},

		["end"]: {
			head: {
				name: "delimiter",
				content: "raw"
			},
			props: []
		},

		["raw"]: {
			props: []
		}
	},

	inlineElements: {}
};
