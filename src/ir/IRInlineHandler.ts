import { DisallowedArgError, ErrorLogger } from "..";
import { InlineContext, InlineHandler, Sugar } from "../parser/InlineHandler";
import { Schema } from "../schema/Schema";
import { emptyBlockProps, IRNode, IRNodeList } from "./IRNode";

export class IRInlineHandler implements InlineHandler<IRNodeList | null, IRNode | null, string> {
	constructor(private schema: Schema, private readonly logger: ErrorLogger) {}

	private isRawHead(parentTag: string): boolean {
		const parentSchema = this.schema.getBlockSchema(parentTag);
		const headSchema = parentSchema && parentSchema.head;
		return Boolean(headSchema && headSchema.raw);
	}

	rootInlineTag(parentTag: string): InlineContext<IRNodeList> {
		const parentSchema = this.schema.getBlockSchema(parentTag);
		const sugars = parentSchema ? parentSchema.headSugarsByStart : new Map();
		return { data: [], raw: this.isRawHead(parentTag), sugars };
	}

	openInlineTag(
		parent: IRNodeList | null,
		tag: string,
		line: number,
		start: number,
		end: number
	): IRNode | null {
		if (!parent) return null;
		const schema = this.schema.getInlineSchema(tag);
		// TODO: check that tag is valid child of parent tag
		// TODO: check that tag is known inline
		const propNames = schema ? schema.propNames : [];
		const data = {
			tag,
			namespace: "[base]",
			props: emptyBlockProps(propNames)
		};
		parent.push(data);
		return data;
	}

	openArgument(
		parent: IRNode | null,
		index: number,
		line: number,
		start: number
	): InlineContext<IRNodeList | null> {
		if (!parent) {
			return { data: null, raw: true, sugars: new Map() };
		}
		const parentSchema = this.schema.getInlineSchema(parent.tag)!;
		if (index >= parentSchema.numberArgs) {
			const pos = { line, startCol: start, endCol: start };
			this.logger(new DisallowedArgError(parent.tag, index, length, pos));
			return { data: null, raw: true, sugars: new Map() };
		}

		const propName = parentSchema.getArgName(index);
		return {
			data: parent.props[propName],
			raw: parentSchema.isRawArg(index),
			sugars: parentSchema.getAllowedSugars(index)
		};
	}

	pushText(parent: IRNodeList | null, content: string): void {
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
