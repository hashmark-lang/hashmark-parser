import { DisallowedArgError, ErrorLogger } from "..";
import { InlineHandler, Sugar, SugarsByStart } from "../parser/InlineHandler";
import { InputPosition } from "../parser/InputPosition";
import { HMError } from "../schema/errors";
import { InlineSchema, Schema } from "../schema/Schema";
import { last } from "../utils";
import { emptyBlockProps, IRNode, IRNodeList } from "./IRNode";

export class IRInlineHandler implements InlineHandler {
	protected readonly inlineGroupStack: IRNodeList[] = [];
	protected readonly inlineElementStack: Array<{ node: IRNode; schema: InlineSchema }> = [];
	protected ignoreFlag: boolean = false;

	constructor(private schema: Schema, private readonly logger: ErrorLogger) {}

	getResult(): IRNodeList {
		return this.inlineGroupStack[0];
	}

	reset() {
		this.inlineGroupStack.length = 0;
		this.inlineElementStack.length = 0;
		this.inlineGroupStack.push([]);
		this.ignoreFlag = false;
	}

	openInlineTag(tag: string, pos: InputPosition): void {
		if (this.ignoreFlag) return;
		const parent = last(this.inlineGroupStack);
		const schema = this.schema.getInlineSchema(tag);
		if (!schema) throw new Error("blop");
		// TODO: check that tag is valid child of parent tag
		// TODO: check that tag is known inline
		const propNames = schema ? schema.propNames : [];
		const node = { tag, namespace: "[base]", props: emptyBlockProps(propNames) };
		parent.push(node);
		this.inlineElementStack.push({ node, schema });
	}

	closeInlineTag(pos: InputPosition): void {
		if (this.ignoreFlag) return;
		this.inlineElementStack.pop();
	}

	openArgument(index: number, pos: InputPosition): false | SugarsByStart {
		const parent = last(this.inlineElementStack);
		if (index >= parent.schema.numberArgs) {
			return this.argError(new DisallowedArgError(parent.schema.tag, index, length, pos));
		}

		const propName = parent.schema.getArgName(index);
		this.inlineGroupStack.push(parent.node.props[propName]);
		if (parent.schema.isRawArg(index)) return false;
		return parent.schema.getAllowedSugars(index);
	}

	closeArgument() {
		if (this.ignoreFlag) {
			this.ignoreFlag = false;
			return;
		}
		this.inlineGroupStack.pop();
	}

	private argError(error: HMError): false {
		this.ignoreFlag = true;
		this.logger(error);
		return false;
	}

	pushText(content: string): void {
		const parent = last(this.inlineGroupStack);
		if (parent) {
			const lastIndex = parent.length - 1;
			if (lastIndex < 0 || typeof parent[lastIndex] !== "string") {
				parent.push(content);
			} else {
				parent[lastIndex] += content;
			}
		}
	}

	get allSugars(): Sugar[] {
		return this.schema.allSugars;
	}
}
