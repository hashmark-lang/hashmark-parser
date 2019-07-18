import { IRNode, IRNodeList } from "../ir/IRNode";
import { InlineProp, Schema, Sugar } from "../schema/Schema";
import { escapeRegExp, last } from "../utils";

interface InlineSyntax {
	separator?: string;
	end: string;
}

type NamedSugar = Sugar & { tag: string };

export class InlineParser {
	// Regex matching inline tags and inline sugars:
	private readonly regex: RegExp;
	// An inline tag can be treated as a explicitly named version of inline sugar with ][ separator, and ] end tag:
	private readonly inlineTag: InlineSyntax = { separator: "][", end: "]" };
	// Map of sugar start character to sugar definition:
	private readonly sugars: Map<string, NamedSugar>;
	// Stack of currently open inline elements:
	private stack: Array<{
		node: IRNode;
		syntax: InlineSyntax;
		schema: InlineProp[];
		length: number;
	}> = [];
	// Inline group at nesting level 0:
	private root: IRNodeList;
	private props: Map<string, InlineProp[]>;
	private headProps: Map<string, InlineProp>;
	// Inline group at current nesting level:
	private current: IRNodeList;
	private isRawArg: boolean;
	private blockName: string;

	constructor(schema: Schema) {
		const sugarStarts: string[] = [];
		const sugarSeparators: string[] = [];
		const sugarEnds: string[] = [];

		for (const { tag, sugar, props } of schema.inlineElements) {
			if (sugar) {
				this.sugars.set(sugar.start, { ...sugar, tag });
				sugarStarts.push(sugar.start);
				if (sugar.separator) sugarSeparators.push(sugar.separator);
				sugarEnds.push(sugar.start);
			}
			this.props.set(tag, props);
		}

		for (const { tag, head } of schema.blockElements) {
			if (head) this.headProps.set(tag, head);
		}

		this.regex = new RegExp(
			"(" +
				[
					/#[^ \[]+\[?/.source,
					/\\./.source,
					...[
						this.inlineTag.separator,
						this.inlineTag.end,
						...sugarStarts,
						...sugarSeparators,
						...sugarEnds
					].map(escapeRegExp)
				]
					.map(_ => `(?:${_})`)
					.join("|") +
				")",
			"g"
		);
	}

	parse(input: string, blockName: string, line: number, column: number): IRNodeList {
		const tokens = input.split(this.regex);
		this.stack.length = 0;
		this.current = this.root = [];
		this.isRawArg = false;
		this.blockName = blockName;

		for (let i = 0; i < tokens.length; ++i) {
			const token = tokens[i];
			if (i % 2 === 0 || (this.isRawArg && token !== last(this.stack).syntax.end)) {
				if (token) this.pushText(token);
			} else {
				this.handleToken(token, line, column);
			}
			column += token.length;
		}

		return this.root;
	}

	/**
	 * Handles escaped characters, inline sugar and inline tags
	 * @param token string containing the token
	 * @param line line number in the source file (1-based)
	 * @param column column number in the source file of the token start (1-based)
	 */
	private handleToken(token: string, line: number, column: number) {
		switch (token[0]) {
			case "\\": {
				this.pushText(token[1]);
				return;
			}
			case "#": {
				const endsWithBracket = last(token) === "[";
				const tag = token.slice(1, endsWithBracket ? -1 : undefined);
				this.open(
					tag,
					this.inlineTag,
					line,
					column,
					column + tag.length + 1,
					!endsWithBracket
				);
				return;
			}
			default: {
				// Auto-close in cases like:
				// 	 *_Hello*
				//   *#inline[Test*
				for (let j = this.stack.length - 1; j >= 0; --j) {
					if (this.stack[j].syntax.end === token) {
						this.close(j);
						return;
					}
				}

				// Close arg, and open next arg for separators:
				for (let j = this.stack.length - 1; j >= 0; --j) {
					if (this.stack[j].syntax.separator === token) {
						this.close(j + 1);
						this.openProp();
						return;
					}
				}

				const sugar = this.sugars.get(token);
				if (sugar && this.isSugarStart(sugar)) {
					this.open(sugar.tag, sugar, line, column, column + token.length);
					return;
				}

				this.pushText(token);
			}
		}
	}

	private pushText(text: string) {
		const lastIndex = this.current.length - 1;
		if (lastIndex < 0 || typeof this.current[lastIndex] !== "string") {
			this.current.push(text);
		} else {
			this.current[lastIndex] += text;
		}
	}

	private open(
		tag: string,
		syntax: InlineSyntax,
		line: number,
		tagStart: number,
		tagEnd: number,
		closed: boolean = false
	) {
		const node = { tag, namespace: "[schema]:inline", props: {} };
		this.current.push(node);
		// TODO: check that tag is a valid child of last(stack).node
		if (!closed) {
			const schema = this.props.get(tag) || [];
			this.stack.push({ node, syntax, length: 0, schema });
			this.openProp();
		}
	}

	private openProp() {
		const parent = last(this.stack);
		const propSchema = parent.schema[parent.length];
		if (!propSchema) return;
		this.isRawArg = !!propSchema.raw;
		this.current = parent.node.props[propSchema.name] = [];
		++parent.length;
	}

	private close(index: number = this.stack.length - 1) {
		if (index === this.stack.length) return;
		this.stack.length = index;
		this.isRawArg = false;
		if (this.stack.length === 0) {
			this.current = this.root;
		} else {
			const parent = last(this.stack);
			const parentLastProp = parent.schema[parent.length - 1];
			this.current = parent.node.props[parentLastProp.name];
		}
	}

	/**
	 * Whether the sugar should be parsed as sugar in this context, or simply as text
	 * @param sugar description of the sugar
	 */
	private isSugarStart(sugar: NamedSugar) {
		if (this.stack.length === 0) {
			const headProp = this.headProps.get(this.blockName);
			return headProp && headProp.raw !== true && sugar.tag in headProp.content;
		}
		const parent = last(this.stack);
		const parentLastProp = parent.schema[parent.length - 1];
		return parentLastProp.raw !== true && sugar.tag in parentLastProp.content;
	}
}
