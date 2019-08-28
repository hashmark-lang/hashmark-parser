import { DisallowedArgError, ErrorLogger } from "..";
import { InlineHandler } from "../parser/InlineHandler";
import { InputPosition } from "../parser/InputPosition";
import {
	DisallowedInArgError,
	DisallowedInHeadError,
	TooFewArgsError,
	UnknownInlineTagError
} from "../schema/errors";
import { ArgSchema, InlineSchema, Schema } from "../schema/Schema";
import { last } from "../utils";
import { IRNode, IRNodeList } from "./IRNode";

export class IRInlineHandler implements InlineHandler {
	protected readonly inlineGroupStack: Array<{
		nodeList: IRNodeList;
		schema: ArgSchema;
	} | null> = [];
	protected readonly inlineElementStack: Array<{
		node: IRNode;
		schema: InlineSchema;
		args: number;
	} | null> = [];

	constructor(private schema: Schema, private readonly log: ErrorLogger) {}

	getResult(): IRNodeList {
		return this.inlineGroupStack[0]!.nodeList;
	}

	reset(rootSchema: ArgSchema) {
		this.inlineGroupStack.length = 0;
		this.inlineElementStack.length = 0;
		this.inlineGroupStack.push({ nodeList: [], schema: rootSchema });
	}

	openInlineTag(tag: string, pos: InputPosition): void {
		const parent = last(this.inlineGroupStack);
		if (!parent) {
			this.inlineElementStack.push(null);
			return;
		}
		const schema = this.schema.getInlineSchema(tag);
		if (!schema) {
			this.log(new UnknownInlineTagError(tag, pos));
			return;
		}

		if (parent.schema.raw) throw new Error("");

		if (!parent.schema.validChildren.has(tag)) {
			if (this.inlineElementStack.length > 0) {
				this.log(new DisallowedInArgError(tag, parent.schema.name, pos));
			} else {
				this.log(new DisallowedInHeadError(tag, parent.schema.parentTag, pos));
			}
			return;
		}

		const propNames = schema ? schema.propNames : [];
		const props = Object.fromEntries(propNames.map(name => [name, []]));
		const node = { $tag: tag, ...props };
		parent.nodeList.push(node);
		this.inlineElementStack.push({ node, schema, args: 0 });
	}

	closeInlineTag(pos: InputPosition): void {
		const top = this.inlineElementStack.pop();
		if (top && top.args < top.schema.args.length) {
			this.log(new TooFewArgsError(top.node.$tag, top.args, top.schema.args.length, pos));
		}
	}

	openArgument(index: number, pos: InputPosition): boolean {
		const parent = last(this.inlineElementStack);
		if (!parent) {
			this.inlineGroupStack.push(null);
			return false;
		}
		const length = parent.schema.args.length;
		if (index >= length) {
			this.log(new DisallowedArgError(parent.schema.tag, index, length, pos));
			this.inlineGroupStack.push(null);
			return false;
		}
		parent.args += 1;

		const schema = parent.schema.args[index];
		this.inlineGroupStack.push({
			nodeList: parent.node[schema.name] as IRNodeList, // TODO remove cast
			schema
		});
		return !schema.raw;
	}

	closeArgument() {
		const parent = last(this.inlineElementStack);
		const current = this.inlineGroupStack.pop();
		if (!parent || !current) return;
		if (current.schema.raw) parent.node[current.schema.name] = current.nodeList.join("");
	}

	pushText(content: string): void {
		const parent = last(this.inlineGroupStack);
		if (!parent) return;
		const nodeList = parent.nodeList;
		const lastIndex = nodeList.length - 1;
		if (lastIndex < 0 || typeof nodeList[lastIndex] !== "string") {
			nodeList.push(content);
		} else {
			nodeList[lastIndex] += content;
		}
	}
}
