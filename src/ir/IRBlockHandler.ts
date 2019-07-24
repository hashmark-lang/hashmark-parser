import { BlockHandler } from "../parser/BlockHandler";
import { InlineParser } from "../parser/InlineParser";
import {
	DisallowedDefaultTagError,
	DisallowedHeadError,
	DisallowedInBlockError,
	ErrorLogger,
	UnknownBlockTagError
} from "../schema/errors";
import { Schema } from "../schema/Schema";
import { ROOT } from "../schema/SchemaDefinition";
import { IRInlineHandler } from "./IRInlineHandler";
import { emptyBlockProps, IRNode, IRNodeList } from "./IRNode";

export class IRBlockHandler implements BlockHandler<IRNode | null> {
	protected readonly inlineParser: InlineParser<IRNodeList | null, IRNode | null, string>;

	constructor(private readonly schema: Schema, private readonly log: ErrorLogger) {
		this.inlineParser = new InlineParser(new IRInlineHandler(schema, log));
	}

	rootBlock() {
		const schema = this.schema.getBlockSchema(ROOT)!;
		const data = IRBlockHandler.createNode("root", emptyBlockProps(schema.propNames));
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

		const parentSchema = this.schema.getBlockSchema(parent.tag)!;
		const pos = { line, startCol: tagStart, endCol: tagEnd };
		const tag = tagString || parentSchema.defaultTag;
		if (!tag) {
			this.log(new DisallowedDefaultTagError(parent.tag, pos));
			return { data: null, rawBody: true };
		}

		const childSchema = this.schema.getBlockSchema(tag);
		if (!childSchema) {
			this.log(new UnknownBlockTagError(tag, pos));
			return { data: null, rawBody: true };
		}

		const propName = parentSchema.getPropName(tag);
		if (!propName) {
			this.log(new DisallowedInBlockError(parent.tag, tag, pos));
			return { data: null, rawBody: true };
		}

		const data = IRBlockHandler.createNode(tag, emptyBlockProps(childSchema.propNames));
		parent.props[propName].push(data);

		if (childSchema.head) {
			data.props[childSchema.head.name] = childSchema.head.raw
				? [headContent]
				: this.inlineParser.parse(headContent, line, headStart, data.tag) || [];
		} else if (headContent) {
			const headPos = { line, startCol: headStart, endCol: headStart + headContent.length };
			this.log(new DisallowedHeadError(data.tag, headPos));
		}

		return { data, rawBody: !data || Boolean(childSchema.rawPropName) };
	}

	rawLine(parent: IRNode | null, content: string) {
		if (!parent) return;
		const rawPropName = this.schema.getBlockSchema(parent.tag)!.rawPropName!;
		parent.props[rawPropName].push(content);
	}

	private static createNode(tag: string, props: IRNode["props"]): IRNode {
		return { tag, namespace: "[base]", props };
	}
}
