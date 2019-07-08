import { Block, Inline, queryAllChildren, queryChildren } from "./ast";
import { Reserved, Schema } from "./schema";

enum SchemaTags {
	Root = "root",
	Block = "block",
	Inline = "inline",
	Default = "default",
	Raw = "raw",
	Content = "content",
	Arg = "arg"
}

enum Cardinality {
	ZeroOrMore = "zeroOrMore",
	OneOrMore = "oneOrMore",
	One = "one",
	Optional = "optional"
}

type ElementSchema = InlineSchema | BlockSchema;

type InlineSchema = Array<{
	raw: boolean;
	content: CardinalityRules;
}>;

interface BlockSchema {
	raw: boolean;
	content: CardinalityRules;
	defaultElem: string | undefined;
}

type CardinalityRules = Map<string, Cardinality>;

export class ParsedSchema implements Schema {
	private index: Map<string, ElementSchema> = new Map();

	constructor(schemaRoot: Block) {
		if (schemaRoot.tag !== Reserved.rootTag) {
			throw new Error(`Expected schema ${Reserved.rootTag}, got ${schemaRoot.tag}`);
		}
		schemaRoot.children.forEach(child => this.parseSchemaElement(child));
	}

	private parseSchemaElement(element: Block): void {
		const name = this.getHeadString(element);
		if (element.tag === SchemaTags.Block) {
			this.index.set(name, this.parseBlockSchema(element));
		} else if (element.tag === SchemaTags.Inline) {
			this.index.set(name, this.parseInlineSchema(element));
		}
	}

	private parseBlockSchema(element: Block): BlockSchema {
		const raw = this.isRaw(element);
		const defaultElem = queryChildren(element, SchemaTags.Default);
		const contentBlock = queryChildren(element, SchemaTags.Content);
		const content = contentBlock ? this.parseCardinalityRules(contentBlock) : new Map();
		return {
			content,
			raw,
			defaultElem: defaultElem && this.getHeadString(defaultElem)
		};
	}

	private parseInlineSchema(element: Block): InlineSchema {
		return queryAllChildren(element, SchemaTags.Arg).map(arg => ({
			raw: this.isRaw(arg),
			content: this.parseCardinalityRules(arg)
		}));
	}

	private parseCardinalityRules(parent: Block): CardinalityRules {
		const rules: CardinalityRules = new Map();
		for (const rule of parent.children) {
			const cardinality =
				rule.tag === Reserved.defaultTag
					? Cardinality.ZeroOrMore
					: (rule.tag as Cardinality);
			const name = this.getHeadString(rule);
			rules.set(name, cardinality);
		}
		return rules;
	}

	private getHeadString(block: Block): string {
		if (block.head.some(x => typeof x !== "string")) {
			throw new Error("problem"); // TODO do better than this later
		}
		return (block.head as string[]).join("");
	}

	private isRaw(block: Block): boolean {
		return Boolean(queryChildren(block, SchemaTags.Raw));
	}

	customTokens: Array<{ regex: RegExp; tag: string }>;

	getDefault(parentName: string): string | undefined {
		const element = this.index.get(parentName);
		if (element && this.isBlockSchema(element)) {
			return element.defaultElem;
		}
		return undefined;
	}

	validateBlock(tree: Block): Error[] {
		throw new Error("Method not implemented.");
	}

	validateLine(tree: Array<string | Inline>): Error[] {
		throw new Error("Method not implemented.");
	}

	isRawBlock(name: string): boolean {
		const schema = this.index.get(name);
		if (schema && this.isBlockSchema(schema)) {
			return schema.raw;
		}
		return false;
	}

	isRawArg(name: string, index: number) {
		const schema = this.index.get(name);
		if (schema && !this.isBlockSchema(schema)) {
			if (index < schema.length) {
				return schema[index].raw;
			}
		}
		return false;
	}

	private isBlockSchema(elem: ElementSchema): elem is BlockSchema {
		return (elem as BlockSchema).content !== undefined;
	}
}
