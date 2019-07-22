import { DisallowedArgError, ErrorLogger } from "..";
import { InlineContext, InlineHandler, Sugar, SugarsMap } from "../parser/InlineHandler";
import { InlineProp, Schema } from "../schema/schema";
import { IRNode, IRNodeList } from "./IRNode";

export class IRInlineHandler implements InlineHandler<IRNodeList | null, IRNode | null, string> {
	private props: Map<string, InlineProp[]> = new Map();
	private argSugarsMaps: Map<string, SugarsMap> = new Map();
	private headSugarsMaps: Map<string, SugarsMap> = new Map();
	private heads: Map<string, InlineProp> = new Map();
	private allSugars: Sugar[];

	constructor(schema: Schema, private readonly logger: ErrorLogger) {
		const sugars: Map<string, Sugar> = new Map();

		for (const { tag, sugar, props } of schema.inlineElements) {
			this.props.set(tag, props);
			if (sugar) sugars.set(tag, { ...sugar, tag });
		}

		for (const { tag, props } of schema.inlineElements) {
			const sugarsMap: SugarsMap = new Map();
			for (const prop of props) {
				if (!prop.raw) {
					for (const { tag: childTag } of prop.content) {
						const sugar = sugars.get(childTag)!;
						sugarsMap.set(sugar.start, sugar);
					}
				}
			}
			this.argSugarsMaps.set(tag, sugarsMap);
		}

		this.allSugars = [...sugars.values()];

		for (const { tag, head } of schema.blockElements) {
			const sugarsMap: SugarsMap = new Map();
			if (head && !head.raw) {
				for (const { tag: childTag } of head.content) {
					const sugar = sugars.get(childTag)!;
					sugarsMap.set(sugar.start, sugar);
				}
			}
			this.headSugarsMaps.set(tag, sugarsMap);
			if (head) this.heads.set(tag, head);
		}
	}

	private isRawHead(parentTag: string): boolean {
		const headSchema = this.heads.get(parentTag);
		return Boolean(headSchema && headSchema.raw);
	}

	rootInlineTag(parentTag: string): InlineContext<IRNodeList> {
		return {
			data: [],
			raw: this.isRawHead(parentTag),
			sugars: this.headSugarsMaps.get(parentTag) || new Map()
		};
	}

	openInlineTag(
		parent: IRNodeList | null,
		tag: string,
		line: number,
		start: number,
		end: number
	): IRNode | null {
		if (!parent) return null;

		// TODO: check that tag is valid child of parent tag

		const data = {
			tag,
			namespace: "[base]",
			props: Object.fromEntries(this.props.get(tag)!.map(prop => [prop.name, []]))
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
		if (!parent) return { data: null, raw: true, sugars: new Map() };
		const propSchema = this.props.get(parent.tag)![index];
		if (!propSchema) {
			const length = this.props.get(parent.tag)!.length;
			const pos = { line, startCol: start, endCol: start };
			this.logger(new DisallowedArgError(parent.tag, index, length, pos));
			return { data: null, raw: true, sugars: new Map() };
		}
		const data = parent.props[propSchema.name];
		return {
			data,
			raw: Boolean(propSchema.raw),
			sugars: this.argSugarsMaps.get(parent.tag) || new Map()
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

	getAllSugars(): Sugar[] {
		return this.allSugars;
	}
}
