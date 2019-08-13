import { DisallowedArgError, ErrorLogger } from "..";
import { InlineHandler, Sugar, SugarsByStart } from "../parser/InlineHandler";
import { InputPosition } from "../parser/InputPosition";
import {
	DisallowedInArgError,
	DisallowedInHeadError,
	UnknownInlineTagError
} from "../schema/errors";
import { InlineGroupSchema, InlineSchema, Schema } from "../schema/Schema";
import { last } from "../utils";
import { emptyBlockProps, IRNode, IRNodeList } from "./IRNode";

export class IRInlineHandler implements InlineHandler {
	protected readonly inlineGroupStack: Array<{
		nodeList: IRNodeList;
		schema: InlineGroupSchema;
	} | null> = [];
	protected readonly inlineElementStack: Array<{
		node: IRNode;
		schema: InlineSchema;
	} | null> = [];

	constructor(private schema: Schema, private readonly log: ErrorLogger) {}

	getResult(): IRNodeList {
		return this.inlineGroupStack[0]!.nodeList;
	}

	reset(rootSchema: InlineGroupSchema) {
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

		if (!parent.schema.isValidChild(tag)) {
			if (this.inlineElementStack.length > 0) {
				this.log(new DisallowedInArgError(tag, parent.schema.name, pos));
			} else {
				this.log(new DisallowedInHeadError(tag, parent.schema.parentTag, pos));
			}
			return;
		}

		const propNames = schema ? schema.propNames : [];
		const node = { tag, namespace: "[base]", props: emptyBlockProps(propNames) };
		parent.nodeList.push(node);
		this.inlineElementStack.push({ node, schema });
	}

	closeInlineTag(pos: InputPosition): void {
		this.inlineElementStack.pop();
	}

	openArgument(index: number, pos: InputPosition): false | SugarsByStart {
		const parent = last(this.inlineElementStack);
		if (!parent) {
			this.inlineGroupStack.push(null);
			return false;
		}
		if (index >= parent.schema.numberArgs) {
			this.log(new DisallowedArgError(parent.schema.tag, index, length, pos));
			this.inlineGroupStack.push(null);
			return false;
		}

		const schema = parent.schema.argsSchemas[index];
		this.inlineGroupStack.push({ nodeList: parent.node.props[schema.name], schema });
		if (schema.raw) return false;
		return parent.schema.getAllowedSugars(index);
	}

	closeArgument() {
		this.inlineGroupStack.pop();
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

	get allSugars(): Sugar[] {
		return this.schema.allSugars;
	}
}
