import { BlockElement, getHeadString, InlineElement, queryAllChildren, queryChildren } from "./ast";
import {
	ArgumentCountError,
	BlockUsedAsInlineError,
	CardinalityError,
	DisallowedError,
	InlineUsedAsBlockError,
	UnknownTagError,
	ValidationError
} from "./errors";
import { Reserved, Schema, Sugar } from "./schema";
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

export enum Cardinality {
	ZeroOrMore = "zeroOrMore",
	OneOrMore = "oneOrMore",
	One = "one",
	Optional = "optional"
}

type InlineSchema = ArgSchema[];
interface ArgSchema {
	raw: boolean;
	content: Set<string>;
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
	sugars: Sugar[] = [];

	constructor(schemaRoot: BlockElement) {
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
				if (customToken) this.sugars.push(customToken);
			}
		}
	}

	getDefault(parentName: string): string | undefined {
		const element = this.blocks.get(parentName);
		return element && element.defaultElem;
	}

	validateBlock(tree: BlockElement): ValidationError[] {
		const schema = this.blocks.get(tree.tag);
		if (!schema) {
			if (this.inlines.has(tree.tag)) {
				return [new InlineUsedAsBlockError(tree)];
			}
			return [new UnknownTagError(tree)];
		}
		const headErrors = this.validateLine(tree.head);
		const cardinalityErrors = this.validateCardinalityRules(schema.content, tree);
		const childrenErrors = tree.children.flatMap(child => this.validateBlock(child));
		return headErrors.concat(cardinalityErrors).concat(childrenErrors);
	}

	validateLine(line: Array<string | InlineElement>): ValidationError[] {
		const inlines = line.filter((x): x is InlineElement => typeof x !== "string");
		return inlines.flatMap(inline => this.validateInline(inline));
	}

	private validateInline(inline: InlineElement): ValidationError[] {
		const schema = this.inlines.get(inline.tag);
		if (!schema) {
			if (this.blocks.has(inline.tag)) {
				return [new BlockUsedAsInlineError(inline)];
			}
			return [new UnknownTagError(inline)];
		}
		if (inline.args.length !== schema.length) {
			return [new ArgumentCountError(inline, schema.length)];
		}
		return inline.args.flatMap((arg, index) => this.validateArg(schema[index], inline, arg));
	}

	private validateArg(
		schema: ArgSchema,
		parent: InlineElement,
		arg: Array<string | InlineElement>
	): ValidationError[] {
		const inlines = arg.filter((x): x is InlineElement => typeof x !== "string");
		const disallowed = (tag: string) =>
			(this.blocks.has(tag) || this.inlines.has(tag)) && !schema.content.has(tag);
		const childrenErrors = inlines
			.filter(inline => disallowed(inline.tag))
			.map(inline => new DisallowedError(parent, inline));
		const descendantsErrors = inlines.flatMap(inline => this.validateInline(inline));
		return childrenErrors.concat(descendantsErrors);
	}

	private validateCardinalityRules(
		rules: CardinalityRules,
		parent: BlockElement
	): ValidationError[] {
		const childrenTags = parent.children.map(child => child.tag);
		const childCount = countOccurrences(childrenTags);
		const errors: ValidationError[] = [];

		// Cardinality errors:
		for (const [tag, cardinality] of rules.entries()) {
			const count = childCount.get(tag) || 0;
			if (!this.validCount(count, cardinality)) {
				const children = queryAllChildren(parent, tag);
				errors.push(new CardinalityError(parent, children, tag, count, cardinality));
			}
		}

		// Disallowed element errors:
		for (const child of parent.children) {
			const isKnown = this.blocks.has(child.tag) || this.inlines.has(child.tag);
			const isAllowed = rules.has(child.tag);
			if (isKnown && !isAllowed) {
				errors.push(new DisallowedError(parent, child));
			}
		}

		return errors;
	}

	isRawBlock(name: string): boolean {
		const schema = this.blocks.get(name);
		return schema ? schema.raw : false;
	}

	isRawHead(name: string): boolean {
		throw new Error("Method not implemented.");
	}

	isRawArg(name: string, index: number): boolean {
		const schema = this.inlines.get(name);
		if (schema && index < schema.length) {
			return schema[index].raw;
		}
		return false;
	}

	isValidHeadChild(parent: string, child: string): boolean {
		throw new Error("Method not implemented.");
	}

	isValidArgChild(parent: string, index: number, child: string): boolean {
		throw new Error("Method not implemented.");
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

function parseBlockSchema(element: BlockElement): BlockSchema {
	const defaultElem = queryChildren(element, SchemaTags.Default);
	const contentBlock = queryChildren(element, SchemaTags.Content);
	return {
		content: contentBlock ? parseCardinalityRules(contentBlock) : new Map(),
		raw: isRaw(element),
		defaultElem: defaultElem && getHeadString(defaultElem)
	};
}

function parseInlineSchema(element: BlockElement): InlineSchema {
	return queryAllChildren(element, SchemaTags.Arg).map(arg => {
		const raw = isRaw(arg);
		const allowed = queryAllChildren(arg, Cardinality.ZeroOrMore);
		const content = new Set(allowed.map(getHeadString));
		return { raw, content };
	});
}

function parseInlineSugar(element: BlockElement, name: string): Sugar | undefined {
	const sugar = queryChildren(element, SchemaTags.Sugar);
	if (sugar) {
		const start = queryChildren(sugar, SchemaTags.Start);
		const end = queryChildren(sugar, SchemaTags.End);
		if (start && end) {
			return {
				tag: name,
				start: getHeadString(start),
				end: getHeadString(end)
			};
		}
	}
	return undefined;
}

function parseCardinalityRules(parent: BlockElement): CardinalityRules {
	const rules: CardinalityRules = new Map();
	for (const rule of parent.children) {
		const cardinality =
			rule.tag === Reserved.defaultTag ? Cardinality.ZeroOrMore : (rule.tag as Cardinality);
		const name = getHeadString(rule);
		rules.set(name, cardinality);
	}
	return rules;
}

function isRaw(block: BlockElement): boolean {
	return Boolean(queryChildren(block, SchemaTags.Raw));
}
