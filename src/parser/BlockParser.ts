import { IRNode } from "..";
import { IRNodeList, RootTag } from "../ir/IRNode";
import { BlockProp, InlineProp, Schema } from "../schema/Schema";
import { last } from "../utils";
import { InlineParser } from "./InlineParser";

export function parse(input: string, schema: Schema) {
	const logger = (err: HMError2) => {
		throw err;
	};
	return new Parser(schema, logger).parse(input);
}

export interface ErrorPosition2 {
	line: number;
	tagStart: number;
	tagEnd: number;
}

export class HMError2 extends Error {
	constructor(readonly message: string, position: ErrorPosition2) {
		super(message);
	}
}

export type ErrorLogger = (error: HMError2) => void;

const DEFAULT_BLOCK_PROP = "children";
const DEFAULT_HEAD_PROP = "children";

export class Parser {
	private readonly regex = /(?:\r\n|\n|\r|^)(\t*)(.*)/gm;
	private readonly tagRegex = /(?:#([^ \[\r\n]+)(?: |$))?(.*)/;
	private readonly inlineParser: InlineParser;
	// Parent tag name => child tag name => prop name
	private readonly propNames: Map<string, Map<string, string>> = new Map();
	// Parent tag name => prop name
	private readonly rawProps: Map<string, string> = new Map();
	// Parent tag name => head name
	private readonly heads: Map<string, InlineProp> = new Map();
	// Parent tag name => default tag
	private readonly defaultTags: Map<string, string> = new Map();

	constructor(private schema: Schema, private readonly log: ErrorLogger) {
		this.inlineParser = new InlineParser(schema);

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

	parse(input: string): IRNode {
		const root: IRNode = { tag: RootTag, namespace: "", props: {} };
		const stack = [{ node: root, indent: 0 }];
		let line = 0;
		for (const [indentString, lineContent] of input.matchAll(this.regex)) {
			++line;
			const indent = indentString.length;

			// Special case for raw line
			const parentTag = last(stack).node.tag;
			const rawProp = this.rawProps.get(parentTag);
			if (rawProp && indent > last(stack).indent) {
				const rawLine = indentString.slice(last(stack).indent + 1) + lineContent;
				last(stack).node.props[rawProp].push(rawLine);
				continue;
			}

			// If empty line, skip
			if (!lineContent) continue;

			let error: string | null = null;

			while (stack.length > 1 && indent <= last(stack).indent) stack.pop();

			const [tagString, headContent] = this.tagRegex.exec(lineContent)!;
			const tag = tagString || this.defaultTags.get(parentTag) || "";

			if (!tag) error = `${parentTag} has no default child tag name`;
			if (!error && !this.propNames.has(tag)) error = `Unknown tag ${tag}`;

			const propsMap = this.propNames.get(parentTag);
			if (!error && !propsMap) error = `${tag} is not allowed in ${parentTag}`;

			const propName = (propsMap && propsMap.get(tag)) || DEFAULT_BLOCK_PROP;
			const block = { tag, namespace: "[schema]:block", props: {} };
			last(stack).node.props[propName].push(block);
			stack.push({ indent, node: block });

			if (headContent) {
				const headSchema = this.heads.get(tag);
				if (!error && !headSchema) error = `${tag} should not have head`;

				const column = this.tagRegex.lastIndex + 1;
				const head =
					headSchema && headSchema.raw
						? [headContent]
						: this.inlineParser.parse(headContent, tag, line, column);
				const headPropName = headSchema ? headSchema.name : DEFAULT_HEAD_PROP;
				last(stack).node.props[headPropName] = head;
			}

			if (error) {
				const tagStart = indent + 1 + (tagString ? 1 : 0);
				const tagEnd = tagStart + (tagString ? tagString.length + 1 : 0);
				this.log(new HMError2(error, { line, tagStart, tagEnd }));
			}
		}
		return root;
	}
}
