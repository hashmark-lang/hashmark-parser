import { BlockHandler } from "../parser/BlockHandler";
import { InlineParser } from "../parser/InlineParser";
import { InputPosition } from "../parser/InputPosition";
import {
	DisallowedDefaultTagError,
	DisallowedHeadError,
	DisallowedInBlockError,
	ErrorLogger,
	HMError,
	UnknownBlockTagError
} from "../schema/errors";
import { BlockSchema, Schema } from "../schema/Schema";
import { ROOT } from "../schema/SchemaDefinition";
import { last } from "../utils";
import { IRInlineHandler } from "./IRInlineHandler";
import { emptyBlockProps, IRNode } from "./IRNode";

export class IRBlockHandler implements BlockHandler {
	private readonly inlineHandler: IRInlineHandler;
	private readonly inlineParser: InlineParser;
	private readonly stack: Array<{ node: IRNode; schema: BlockSchema }> = [];
	private ignoreFlag: boolean = false;

	constructor(private readonly schema: Schema, private readonly log: ErrorLogger) {
		this.inlineHandler = new IRInlineHandler(schema, log);
		this.inlineParser = new InlineParser(this.inlineHandler, schema.sugars);
		this.reset();
	}

	reset(): void {
		this.stack.length = 0;
		this.pushBlock(ROOT, this.schema.getBlockSchema(ROOT)!);
		this.ignoreFlag = false;
	}

	getResult(): IRNode {
		return this.stack[0].node;
	}

	private pushBlock(tag: string, schema: BlockSchema): IRNode {
		const node = { tag, props: emptyBlockProps(schema.propNames) };
		this.stack.push({ node, schema });
		return node;
	}

	openBlock(tagString: string | undefined, pos: InputPosition): boolean {
		const parent = last(this.stack);

		const tag = tagString || parent.schema.defaultTag;
		if (!tag) return this.blockError(new DisallowedDefaultTagError(parent.node.tag, pos));

		const schema = this.schema.getBlockSchema(tag);
		if (!schema) return this.blockError(new UnknownBlockTagError(tag, pos));

		const propName = parent.schema.getPropName(tag);
		if (!propName) {
			return this.blockError(new DisallowedInBlockError(parent.node.tag, tag, pos));
		}

		const node = this.pushBlock(tag, schema);
		parent.node.props[propName].push(node);
		return !Boolean(schema.rawPropName);
	}

	closeBlock(): void {
		if (this.ignoreFlag) {
			this.ignoreFlag = false;
			return;
		}
		this.stack.pop();
	}

	private blockError(error: HMError): false {
		this.log(error);
		this.ignoreFlag = true;
		return false;
	}

	head(content: string, pos: InputPosition) {
		const parent = last(this.stack);
		const headSchema = parent.schema.head;

		if (!headSchema) {
			this.log(new DisallowedHeadError(parent.node.tag, pos));
			return;
		}

		if (headSchema.raw) {
			parent.node.props[headSchema.name] = [content];
			return;
		}

		this.inlineHandler.reset(headSchema);
		this.inlineParser.parse(content, pos);
		parent.node.props[headSchema.name] = this.inlineHandler.getResult();
	}

	rawLine(content: string, pos: InputPosition) {
		if (this.ignoreFlag) return;
		const parent = last(this.stack);
		parent.node.props[parent.schema.rawPropName!].push(content);
	}
}
