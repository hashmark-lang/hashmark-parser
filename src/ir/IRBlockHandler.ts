import { BlockHandler } from "../parser/BlockHandler";
import { InlineParser } from "../parser/InlineParser";
import {
	DisallowedDefaultTagError,
	DisallowedHeadError,
	DisallowedInBlockError,
	ErrorLogger,
	UnknownBlockTagError
} from "../schema/errors";
import { BlockSchema, INVALID_TAG, ROOT, Schema } from "../schema/schema";
import { IRInlineHandler } from "./IRInlineHandler";
import { IRNode, IRNodeList } from "./IRNode";

interface BlockSchemaAugmented extends BlockSchema {
	childTagToProp: Map<string, string>;
	propsList: string[];
	rawProp?: string;
}

export class IRBlockHandler implements BlockHandler<IRNode | null> {
	protected readonly inlineParser: InlineParser<IRNodeList | null, IRNode | null, string>;
	private readonly blockSchemas: Map<string, BlockSchemaAugmented> = new Map();

	constructor(schema: Schema, private readonly log: ErrorLogger) {
		this.inlineParser = new InlineParser(new IRInlineHandler(schema, log));
		for (const [tag, blockSchema] of Object.entries(schema.blocks)) {
			this.blockSchemas.set(tag, IRBlockHandler.augmentBlockSchema(blockSchema));
		}
	}

	private static augmentBlockSchema(schema: BlockSchema): BlockSchemaAugmented {
		const propsSet = new Set<string>();
		const childTagToProp = new Map<string, string>();
		let rawProp: string | undefined;
		if (schema.head) propsSet.add(schema.head.name);
		for (const prop of schema.props) {
			if (prop.raw) {
				if (rawProp) throw new Error("Should have only one raw prop!");
				rawProp = prop.name;
				propsSet.add(prop.name);
			} else {
				for (const rule of prop.content) {
					propsSet.add(prop.name);
					childTagToProp.set(rule.tag, prop.name);
				}
			}
		}
		return { ...schema, rawProp, childTagToProp, propsList: [...propsSet] };
	}

	rootBlock() {
		const data = IRBlockHandler.createNode("root", this.getBlockSchema(ROOT)!);
		return { data, rawBody: false };
	}

	openBlock(
		parent: IRNode | null,
		tagString: string | undefined,
		headContent: string,
		line: number,
		tagStart: number,
		tagEnd: number,
		headStart: number
	) {
		if (!parent) return { data: null, rawBody: true };

		const parentSchema = this.getBlockSchema(parent.tag)!;
		const pos = { line, startCol: tagStart, endCol: tagEnd };

		const tag = tagString || parentSchema.defaultTag;
		if (!tag) {
			this.log(new DisallowedDefaultTagError(parent.tag, pos));
			return { data: null, rawBody: true };
		}

		const childSchema = this.getBlockSchema(tag);
		if (!childSchema) {
			this.log(new UnknownBlockTagError(tag, pos));
			return { data: null, rawBody: true };
		}

		const propName =
			parentSchema.childTagToProp.get(tag) || parentSchema.childTagToProp.get(INVALID_TAG);
		if (!propName) {
			this.log(new DisallowedInBlockError(parent.tag, tag, pos));
			return { data: null, rawBody: true };
		}

		const data = IRBlockHandler.createNode(tag, childSchema);
		parent.props[propName].push(data);

		if (childSchema.head) {
			data.props[childSchema.head.name] = childSchema.head.raw
				? [headContent]
				: this.inlineParser.parse(headContent, line, headStart, data.tag) || [];
		} else if (headContent) {
			const headPos = { line, startCol: headStart, endCol: headStart + headContent.length };
			this.log(new DisallowedHeadError(data.tag, headPos));
		}

		return { data, rawBody: !data || Boolean(childSchema.rawProp) };
	}

	rawLine(parent: IRNode | null, content: string) {
		if (!parent) return;
		const rawPropName = this.getBlockSchema(parent.tag)!.rawProp!;
		parent.props[rawPropName].push(content);
	}

	private getBlockSchema(tag: string): BlockSchemaAugmented | undefined {
		return this.blockSchemas.get(tag) || this.blockSchemas.get(INVALID_TAG);
	}

	private static createNode(tag: string, schema: BlockSchemaAugmented): IRNode {
		const props = Object.fromEntries(schema.propsList.map(x => [x, []]));
		return { tag, namespace: "[base]", props };
	}
}
