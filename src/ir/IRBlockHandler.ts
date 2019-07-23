import { BlockHandler } from "../parser/BlockHandler";
import { InlineParser } from "../parser/InlineParser";
import {
	DisallowedDefaultTagError,
	DisallowedHeadError,
	DisallowedInBlockError,
	ErrorLogger,
	HMError,
	UnknownBlockTagError,
	ErrorPosition
} from "../schema/errors";
import { BlockSchema, InlineProp, Schema, INVALID_TAG } from "../schema/schema";
import { IRInlineHandler } from "./IRInlineHandler";
import { IRNode, IRNodeList } from "./IRNode";

export class IRHandler implements BlockHandler<IRNode | null> {
	protected readonly inlineParser: InlineParser<IRNodeList | null, IRNode | null, string>;
	// Parent tag name => child tag name => prop name
	private readonly propNames: Map<string, Map<string, string>> = new Map();
	// Parent tag name => prop name
	private readonly rawProps: Map<string, string> = new Map();
	// Parent tag name => head name
	private readonly heads: Map<string, InlineProp> = new Map();
	// Parent tag name => default tag
	private readonly defaultTags: Map<string, string> = new Map();

	constructor(private schema: Schema, private readonly log: ErrorLogger) {
		this.inlineParser = new InlineParser(new IRInlineHandler(schema, log));
		schema.blockElements.forEach(elem => this.fillMaps(elem));
		this.fillMaps({ tag: "root", ...schema.root });
	}

	private fillMaps({ tag, props, head, defaultTag }: BlockSchema): void {
		if (head) this.heads.set(tag, head);
		if (defaultTag) this.defaultTags.set(tag, defaultTag);

		const propMap = new Map<string, string>();
		this.propNames.set(tag, propMap);
		for (const prop of props) {
			if (prop.raw) {
				this.rawProps.set(tag, prop.name);
			} else {
				for (const rule of prop.content) {
					propMap.set(rule.tag, prop.name);
				}
			}
		}
	}

	rootBlock() {
		const props = IRHandler.emptyProps(...this.propNames.get("root")!.values());
		const data = { tag: "root", namespace: "[base]", props };
		return { data, rawBody: false };
	}

	private getProps(tag: string) {
		return this.propNames.get(tag) || this.propNames.get(INVALID_TAG);
	}

	openBlock(
		parent: IRNode | null,
		tag: string | undefined,
		headContent: string,
		line: number,
		tagStart: number,
		tagEnd: number,
		headStart: number
	) {
		const data = this.appendChild(parent, tag, { line, startCol: tagStart, endCol: tagEnd });

		if (data) {
			const headSchema = this.heads.get(data.tag);
			if (headSchema) {
				data.props[headSchema.name] = headSchema.raw
					? [headContent]
					: this.inlineParser.parse(headContent, line, headStart, data.tag) || [];
			} else {
				this.log(
					new DisallowedHeadError(data.tag, {
						line,
						startCol: headStart,
						endCol: headStart + headContent.length
					})
				);
			}
		}

		return { data, rawBody: !data || this.rawProps.has(data.tag) };
	}

	private appendChild(
		parent: IRNode | null,
		tagString: string | undefined,
		pos: ErrorPosition
	): IRNode | null {
		if (!parent) return null;

		const tag = tagString || this.defaultTags.get(parent.tag);
		if (!tag) {
			this.log(new DisallowedDefaultTagError(parent.tag, pos));
			return null;
		}

		const childTagToProp = this.getProps(tag);
		if (!childTagToProp) {
			this.log(new UnknownBlockTagError(tag, pos));
			return null;
		}

		const propName = this.getProps(parent.tag)!.get(tag);
		if (!propName) {
			this.log(new DisallowedInBlockError(parent.tag, tag, pos));
			return null;
		}

		const rawPropName = this.rawProps.get(tag);
		const props = rawPropName
			? IRHandler.emptyProps(rawPropName)
			: IRHandler.emptyProps(...childTagToProp.values());

		const node = { tag, namespace: "[base]", props };
		parent.props[propName].push(node);
		return node;
	}

	rawLine(parent: IRNode | null, content: string) {
		if (!parent) return;
		const rawPropName = this.rawProps.get(parent.tag)!;
		parent.props[rawPropName].push(content);
	}

	private static emptyProps(...keys: string[]): { [key: string]: IRNodeList } {
		return Object.fromEntries(keys.map(x => [x, []]));
	}
}
