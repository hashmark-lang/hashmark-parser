import { SugarSyntax } from "../parser/Sugar";
import { Cardinality } from "./Cardinality";
import {
	ArgDefinition,
	BlockDefinition,
	BodyPropDefinitions,
	InlineDefinition,
	RootDefinition,
	SchemaDefinition,
} from "./SchemaDefinition";
import * as SchemaSchema from "./schemaSchemaInterface";

export function readSchema(root: SchemaSchema.Root): SchemaDefinition {
	return {
		root: convertRoot(root.root),
		blocks: Object.fromEntries(root.blocks.map((block) => [block.name, convertBlock(block)])),
		inline: Object.fromEntries(
			root.inline.map((inline) => [inline.name, convertInline(inline)])
		),
	};
}

function convertRoot(root: SchemaSchema.RootBlock): RootDefinition {
	const res: RootDefinition = {
		rawBody: false,
		props: {
			body: convertBody(root.body),
		},
	};
	if (root.defaultTag) res.defaultTag = root.defaultTag.name;
	return res;
}

function convertBlock(block: SchemaSchema.BlockBlock): BlockDefinition {
	const res: BlockDefinition = {
		rawBody: false,
		props: {},
	};
	if (block.head) res.props.head = convertHead(block.head);
	if (block.body) res.props.body = convertBody(block.body);
	if (block.defaultTag) res.defaultTag = block.defaultTag.name;
	return res;
}

function convertHead(head: SchemaSchema.HeadBlock): ArgDefinition {
	// TODO Temporary until we have a more powerful schema:
	if (head.type.length === 0) throw new Error("Head should have at least one type");
	if (head.type.length > 1) throw new Error("Head should have at most one type");

	const type = head.type[0];
	const name = type.propName;

	if (type.$tag === "hashml") {
		return {
			raw: false,
			name,
			content: convertItems(type.content),
		};
	} else {
		return {
			raw: true,
			name,
			type: type.$tag,
		};
	}
}

function convertBody(body: SchemaSchema.BodyBlock): BodyPropDefinitions {
	return Object.fromEntries(
		body.props.map((prop) => [prop.name, convertPropContent(prop.content)])
	);
}

function convertItems(items: SchemaSchema.ItemBlock[]): string[] {
	return items.map((item) => item.target);
}

function convertPropContent(
	propContent: SchemaSchema.PropBlock["content"]
): { [tag: string]: Cardinality } {
	return Object.fromEntries(
		propContent.map((content) => [content.target, convertCardinality(content)])
	);
}

function convertCardinality(
	cardinality:
		| SchemaSchema.OneBlock
		| SchemaSchema.OneOrMoreBlock
		| SchemaSchema.OptionalBlock
		| SchemaSchema.ZeroOrMoreBlock
): Cardinality {
	switch (cardinality.$tag) {
		case "one":
			return { min: 1, max: 1 };
		case "oneOrMore":
			return { min: 1, max: Infinity };
		case "optional":
			return { min: 0, max: 1 };
		case "zeroOrMore":
			return { min: 0, max: Infinity };
	}
}

function convertInline(inline: SchemaSchema.InlineBlock): InlineDefinition {
	const res: InlineDefinition = {
		args: convertArgs(inline.args),
	};
	if (inline.sugar) res.sugar = convertSugar(inline.sugar);
	return res;
}

function convertArgs(args: SchemaSchema.ArgsBlock): ArgDefinition[] {
	return args.args.map((arg) => {
		const name = arg.propName;
		if (arg.$tag === "hashml") {
			return { raw: false, name, content: convertItems(arg.content) };
		} else {
			return { raw: true, name, type: arg.$tag };
		}
	});
}

function convertSugar(sugar: SchemaSchema.SugarBlock): SugarSyntax {
	const res: SugarSyntax = {
		start: sugar.start.token,
		end: sugar.end.token,
	};
	if (sugar.separator) res.separator = sugar.separator.token;
	return res;
}
