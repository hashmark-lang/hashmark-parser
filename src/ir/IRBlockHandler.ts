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
import { BlockSchema, InlineProp, Schema } from "../schema/schema";
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
		const props = this.emptyProps(...this.propNames.get("root")!.values());
		const data = { tag: "root", namespace: "[base]", props };
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

		const rawPropName = this.rawProps.get(tag);
		const props = rawPropName
			? this.emptyProps(rawPropName)
			: this.emptyProps(...childTagToProp.values());

		const data = { tag, namespace: "[base]", props };
		parent.props[propName].push(data);

		const headSchema = this.heads.get(tag);
		if (headContent && !headSchema) {
			this.log(
				new DisallowedHeadError(tag, {
					line,
					startCol: headStart,
					endCol: headStart + headContent.length
				})
			);
		} else if (headSchema) {
			data.props[headSchema.name] = headSchema.raw
				? [headContent]
				: this.inlineParser.parse(headContent, line, headStart, tag) || [];
		}
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

	private emptyProps(...keys: string[]): { [key: string]: IRNodeList } {
		return Object.fromEntries(keys.map(x => [x, []]));
	}
}
