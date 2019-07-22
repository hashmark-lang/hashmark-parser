import { BlockHandler } from "../parser/BlockHandler";
import { InlineParser } from "../parser/InlineParser";
import {
	DisallowedDefaultTagError,
	DisallowedHeadError,
	DisallowedInBlockError,
	ErrorLogger,
	HMError,
	UnknownBlockTagError
} from "../schema/errors";
import { InlineProp, Schema } from "../schema/schema";
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

	private loggerEnabled = true;

	constructor(private schema: Schema, private readonly logger: ErrorLogger) {
		this.inlineParser = new InlineParser(new IRInlineHandler(schema, logger));

		for (const { tag, props, head, defaultTag } of schema.blockElements) {
			if (head) {
				this.heads.set(tag, head);
			}

			if (defaultTag) {
				this.defaultTags.set(tag, defaultTag);
			}

			const map = new Map();
			this.propNames.set(tag, map);
			for (const prop of props) {
				if (prop.raw) {
					this.rawProps.set(tag, name);
				} else {
					for (const rule of prop.content) {
						map.set(rule.tag, name);
					}
				}
			}
		}
	}

	rootBlock() {
		const data = { tag: "root", namespace: "[base]", props: {} };
		return { data, rawBody: false };
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
		if (!parent) return { data: null, rawBody: true };

		const pos = { line, startCol: tagStart, endCol: tagEnd };
		this.loggerEnabled = true;
		if (!tag) {
			tag = this.defaultTags.get(parent.tag);
			if (!tag) this.log(new DisallowedDefaultTagError(parent.tag, pos));
			// TODO: use invalidTag schema field if present
			if (!tag) return { data: null, rawBody: true };
		}

		const childTagToProp = this.propNames.get(tag);
		if (!childTagToProp) {
			this.log(new UnknownBlockTagError(tag, pos));
			return { data: null, rawBody: true };
		}

		const propName = this.propNames.get(parent.tag)!.get(tag);
		if (!propName) {
			this.log(new DisallowedInBlockError(parent.tag, tag, pos));
			return { data: null, rawBody: true };
		}

		const props = Object.fromEntries([...childTagToProp.values()].map(_ => [_, []]));
		const data = { tag, namespace: "[base]", props };
		parent.props[propName].push(data);

		if (!headContent) return { data: null, rawBody: true };

		const headSchema = this.heads.get(tag);
		if (!headSchema) {
			this.log(
				new DisallowedHeadError(tag, {
					line,
					startCol: headStart,
					endCol: headStart + headContent.length
				})
			);
			return { data: null, rawBody: true };
		}

		parent.props[headSchema.name] = headSchema.raw
			? [headContent]
			: this.inlineParser.parse(headContent, line, headStart, tag) || [];

		return { data, rawBody: this.rawProps.has(tag) };
	}

	rawLine(parent: IRNode | null, content: string) {
		if (!parent) return;
		const rawPropName = this.rawProps.get(parent.tag)!;
		parent.props[rawPropName].push(content);
	}

	private log(error: HMError) {
		this.logger(error);
		this.loggerEnabled = false;
	}
}
