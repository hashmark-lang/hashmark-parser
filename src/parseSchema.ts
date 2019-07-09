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
type InlineSchema = ArgSchema[];
interface ArgSchema {
	raw: boolean;
	content: CardinalityRules;
}
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
		return queryAllChildren(element, SchemaTags.Arg).map(arg => {
			const raw = this.isRaw(arg);
			const contentBlock = queryChildren(arg, SchemaTags.Content);
			const content = contentBlock ? this.parseCardinalityRules(contentBlock) : new Map();
			return { raw, content };
		});
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
		const schema = this.index.get(tree.tag);
		if (schema === undefined) {
			return [new Error(`Unknown tag ${tree.tag}`)];
		}
		if (!this.isBlockSchema(schema)) {
			return [new Error(`Expected ${tree.tag} to be used as an inline tag`)];
		}
		const childTags = tree.children.map(child => child.tag);
		return this.validateCardinalityRules(schema.content, tree.tag, childTags);
	}

	validateLine(line: Array<string | Inline>): Error[] {
		const inlines = line.filter(x => typeof x !== "string") as Inline[];
		return inlines.flatMap(inline => this.validateInline(inline));
	}

	private validateCardinalityRules(
		rules: CardinalityRules,
		parent: string,
		childTags: string[]
	): Error[] {
		const childCount = countOccurrences(childTags);
		const cardinalityErrors: Error[] = [];
		for (const [tag, cardinality] of rules.entries()) {
			const count = childCount.get(tag) || 0;
			if (!this.validCount(count, cardinality)) {
				cardinalityErrors.push(
					new Error(
						`Saw ${count} occurrences of ${tag}, but the schema wants ${cardinality} in ${parent}`
					)
				);
			}
		}
		const disallowedErrors = childTags
			.filter(tag => !rules.has(tag))
			.map(tag => new Error(`Tag ${tag} is not allowed in ${parent}`));
		return cardinalityErrors.concat(disallowedErrors);
	}

	private validateInline(inline: Inline): Error[] {
		const schema = this.index.get(inline.tag);
		if (schema === undefined) {
			return [new Error(`Unknown inline tag ${inline.tag}`)];
		}
		if (this.isBlockSchema(schema)) {
			return [new Error(`Expected ${inline.tag} to be used as a block tag`)];
		}
		if (inline.arguments.length !== schema.length) {
			return [
				new Error(`Expected ${schema.length} arguments, but got ${inline.arguments.length}`)
			];
		}
		return inline.arguments.flatMap((arg, index) =>
			this.validateArg(schema[index], inline.tag, arg)
		);
	}

	private validateArg(schema: ArgSchema, parent: string, arg: Array<string | Inline>): Error[] {
		const inlines = arg.filter(x => typeof x !== "string") as Inline[];
		const childTags = inlines.map(inline => inline.tag);
		const childErrors = this.validateCardinalityRules(schema.content, parent, childTags);
		const descendantErrors = inlines.flatMap(inline => this.validateInline(inline));
		return childErrors.concat(descendantErrors);
	}

	isRawBlock(name: string): boolean {
		const schema = this.index.get(name);
		if (schema && this.isBlockSchema(schema)) {
			return schema.raw;
		}
		return false;
	}

	isRawArg(name: string, index: number): boolean {
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

	private validCount(count: number, cardinality: Cardinality): boolean {
		switch (cardinality) {
			case Cardinality.One:
				return count === 1;
			case Cardinality.OneOrMore:
				return count >= 1;
			case Cardinality.Optional:
				return count === 0 || count === 1;
			case Cardinality.ZeroOrMore:
				return count >= 0;
		}
	}
}

function countOccurrences<T>(arr: T[]): Map<T, number> {
	const map = new Map<T, number>();
	for (const item of arr) {
		const count = map.get(item) || 0;
		map.set(item, count + 1);
	}
	return map;
}
