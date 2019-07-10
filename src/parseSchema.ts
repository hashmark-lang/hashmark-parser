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
	private blocks: Map<string, BlockSchema> = new Map();
	private inlines: Map<string, InlineSchema> = new Map();
	customTokens: CustomToken[] = [];

	constructor(schemaRoot: Block) {
		if (schemaRoot.tag !== Reserved.rootTag) {
			throw new Error(`Expected schema ${Reserved.rootTag}, got ${schemaRoot.tag}`);
		}

		for (const element of schemaRoot.children) {
			const name = getHeadString(element);
			if (element.tag === SchemaTags.Block) {
				this.blocks.set(name, parseBlockSchema(element));
			} else if (element.tag === SchemaTags.Inline) {
				this.inlines.set(name, parseInlineSchema(element));
				const customToken = parseInlineSugar(element, name);
				if (customToken) this.customTokens.push(customToken);
			}
		}
	}

	getDefault(parentName: string): string | undefined {
		const element = this.blocks.get(parentName);
		return element && element.defaultElem;
	}

	validateBlock(tree: Block): Error[] {
		const schema = this.blocks.get(tree.tag);
		if (!schema) {
			if (this.inlines.has(tree.tag)) {
				return [new Error(`Expected ${tree.tag} to be used as an inline tag`)];
			}
			return [new Error(`Unknown tag ${tree.tag}`)];
		}
		const childrenTags = tree.children.map(child => child.tag);
		const errors = this.validateCardinalityRules(schema.content, tree.tag, childrenTags);
		const childrenErrors = tree.children.flatMap(child => this.validateBlock(child));
		return errors.concat(childrenErrors);
	}

	validateLine(line: Array<string | Inline>): Error[] {
		const inlines = line.filter(x => typeof x !== "string") as Inline[];
		return inlines.flatMap(inline => this.validateInline(inline));
	}

	private validateCardinalityRules(
		rules: CardinalityRules,
		parent: string,
		childrenTags: string[]
	): Error[] {
		const childCount = countOccurrences(childrenTags);
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
		const disallowedErrors = childrenTags
			.filter(tag => (this.blocks.has(tag) || this.inlines.has(tag)) && !rules.has(tag))
			.map(tag => new Error(`Tag ${tag} is not allowed in ${parent}`));
		return cardinalityErrors.concat(disallowedErrors);
	}

	private validateInline(inline: Inline): Error[] {
		const schema = this.inlines.get(inline.tag);
		if (!schema) {
			if (this.blocks.has(inline.tag)) {
				return [new Error(`Expected ${inline.tag} to be used as a block tag`)];
			}
			return [new Error(`Unknown inline tag ${inline.tag}`)];
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
		const childrenTags = inlines.map(inline => inline.tag);
		const childrenErrors = this.validateCardinalityRules(schema.content, parent, childrenTags);
		const descendantsErrors = inlines.flatMap(inline => this.validateInline(inline));
		return childrenErrors.concat(descendantsErrors);
	}

	isRawBlock(name: string): boolean {
		const schema = this.blocks.get(name);
		return schema ? schema.raw : false;
	}

	isRawArg(name: string, index: number): boolean {
		const schema = this.inlines.get(name);
		if (schema && index < schema.length) {
			return schema[index].raw;
		}
		return false;
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

function parseBlockSchema(element: Block): BlockSchema {
	const defaultElem = queryChildren(element, SchemaTags.Default);
	const contentBlock = queryChildren(element, SchemaTags.Content);
	return {
		content: contentBlock ? parseCardinalityRules(contentBlock) : new Map(),
		raw: isRaw(element),
		defaultElem: defaultElem && getHeadString(defaultElem)
	};
}

function parseInlineSchema(element: Block): InlineSchema {
	return queryAllChildren(element, SchemaTags.Arg).map(arg => {
		const raw = isRaw(arg);
		const contentBlock = queryChildren(arg, SchemaTags.Content);
		const content = contentBlock ? parseCardinalityRules(contentBlock) : new Map();
		return { raw, content };
	});
}

function parseInlineSugar(element: Block, name: string): CustomToken | undefined {
	const sugar = queryChildren(element, SchemaTags.Sugar);
	if (sugar) {
		const start = queryChildren(sugar, SchemaTags.Start);
		const end = queryChildren(sugar, SchemaTags.End);
		if (start && end) {
			return {
				tag: name,
				start: escapeRegExp(getHeadString(start)),
				end: escapeRegExp(getHeadString(end))
			};
		}
	}
	return undefined;
}

function parseCardinalityRules(parent: Block): CardinalityRules {
	const rules: CardinalityRules = new Map();
	for (const rule of parent.children) {
		const cardinality =
			rule.tag === Reserved.defaultTag ? Cardinality.ZeroOrMore : (rule.tag as Cardinality);
		const name = getHeadString(rule);
		rules.set(name, cardinality);
	}
	return rules;
}

function isRaw(block: Block): boolean {
	return Boolean(queryChildren(block, SchemaTags.Raw));
}
