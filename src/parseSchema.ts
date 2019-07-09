import { Block, getHeadString, Inline, queryAllChildren, queryChildren } from "./ast";
import { CustomToken, Reserved, Schema } from "./schema";
import { countOccurrences, escapeRegExp } from "./utils";

enum SchemaTags {
	Root = "root",
	Block = "block",
	Inline = "inline",
	Default = "default",
	Raw = "raw",
	Content = "content",
	Arg = "arg",
	Sugar = "sugar",
	Start = "start",
	End = "end"
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
	customTokens: CustomToken[];

	constructor(schemaRoot: Block) {
		if (schemaRoot.tag !== Reserved.rootTag) {
			throw new Error(`Expected schema ${Reserved.rootTag}, got ${schemaRoot.tag}`);
		}
		this.customTokens = [];
		schemaRoot.children.forEach(child => this.parseSchemaElement(child));
	}

	private parseSchemaElement(element: Block): void {
		const name = getHeadString(element);
		if (element.tag === SchemaTags.Block) {
			this.index.set(name, this.parseBlockSchema(element));
		} else if (element.tag === SchemaTags.Inline) {
			this.index.set(name, this.parseInlineSchema(element));
			const sugar = queryChildren(element, SchemaTags.Sugar);
			if (sugar) {
				const start = queryChildren(sugar, SchemaTags.Start);
				const end = queryChildren(sugar, SchemaTags.End);
				if (start && end) {
					this.customTokens.push({
						tag: name,
						start: escapeRegExp(getHeadString(start)),
						end: escapeRegExp(getHeadString(end))
					});
				}
			}
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
			defaultElem: defaultElem && getHeadString(defaultElem)
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
			const name = getHeadString(rule);
			rules.set(name, cardinality);
		}
		return rules;
	}

	private isRaw(block: Block): boolean {
		return Boolean(queryChildren(block, SchemaTags.Raw));
	}

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
		const errors = this.validateCardinalityRules(schema.content, tree.tag, childTags);
		const childErrors = tree.children.flatMap(child => this.validateBlock(child));
		return errors.concat(childErrors);
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
			.filter(tag => this.index.has(tag) && !rules.has(tag))
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
