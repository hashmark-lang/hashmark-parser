import { SugarSyntax } from "../parser/Sugar";
import {
	BlockPropContentDefinition,
	BlockPropDefinition,
	BlockSchemaDefinition,
	Cardinality,
	InlinePropDefinition,
	RawBlockPropDefinition,
	RawInlinePropDefinition
} from "./SchemaDefinition";

// Cardinality:

/**
 * Allow a tag to appear once or more within a prop.
 *
 * Usage example:
 *
 * ```ts
 * prop("content", [oneOrMore("bar")])
 * ```
 *
 * This defines a `content` prop that may contain one or more occurrences of `#bar`
 *
 * @param tag Name of the tag to allow
 * @returns A cardinality rule for a prop in a block body
 * @category Cardinality
 */
export function oneOrMore(tag: string): BlockPropContentDefinition {
	return { tag, cardinality: Cardinality.OneOrMore };
}

/**
 * Allow a tag to appear exactly once within a prop.
 *
 * Usage example:
 *
 * ```ts
 * prop("content", [one("bar")])
 * ```
 *
 * This defines a `content` prop that may contain only exactly one occurrence of `#bar`
 *
 * @param tag Name of the tag to allow
 * @returns A cardinality rule for a prop in a block body
 * @category Cardinality
 */
export function one(tag: string): BlockPropContentDefinition {
	return { tag, cardinality: Cardinality.One };
}

/**
 * Allow a tag to appear any number of times within a prop.
 *
 * Usage example:
 *
 * ```ts
 * prop("content", [zeroOrMore("bar")])
 * ```
 *
 * This defines a `content` prop that may contain any number of `#bar`
 *
 * @param tag Name of the tag to allow
 * @returns A cardinality rule for a prop in a block body
 * @category Cardinality
 */
export function zeroOrMore(tag: string): BlockPropContentDefinition {
	return { tag, cardinality: Cardinality.ZeroOrMore };
}

/**
 * Allow a tag to appear at most once.
 *
 * Usage example:
 *
 * ```ts
 * prop("content", [optional("bar")])
 * ```
 *
 * This defines a `content` prop that may contain zero or one occurrences of `#bar`
 *
 * @param tag Name of the tag to allow
 * @returns A cardinality rule for a prop in a block body
 * @category Cardinality
 */
export function optional(tag: string): BlockPropContentDefinition {
	return { tag, cardinality: Cardinality.Optional };
}

// Sugar:

export function sugar(start: string, end: string): SugarSyntax;
// tslint:disable-next-line:unified-signatures
export function sugar(start: string, separator: string, end: string): SugarSyntax;
export function sugar(a: string, b: string, c?: string): SugarSyntax {
	if (c) {
		return { start: a, separator: b, end: c };
	} else {
		return { start: a, end: b };
	}
}

// Props:

/**
 * Define a prop and its content.
 *
 * Usage example:
 *
 * ```ts
 * prop("content", [zeroOrMore("foo"), optional("bar")])
 * ```
 *
 * This defines a `content` prop that may contain any number of `#foo` and optionally a `#bar`.
 *
 * @param name Name of the prop
 * @param content Array of allowed content. See Cardinality Functions.
 * @category Prop
 */
export function prop(name: string, content: BlockPropContentDefinition[]): BlockPropDefinition {
	return { name, content: content.flat() };
}

/**
 * Define a raw prop.
 *
 *
 * Usage example:
 *
 * ```ts
 * rawProp("code")
 * ```
 *
 * This defines a raw prop called `code`.
 * The body of a raw prop is not parsed as Hashml, but instead as raw text.
 *
 * @param name Name of the prop
 * @category Prop
 */
export function rawProp(name: string): [RawBlockPropDefinition] {
	return [{ name, raw: true }];
}

/**
 * Define an inline prop.
 *
 * Usage example:
 *
 * ```ts
 * inlineProp("title", ["bold", "italic"])
 * ```
 *
 * This is useful for heads of block tags, and for arguments of inline tags.
 *
 * @param name Name of the prop
 * @param content Array of allowed tags
 * @category Prop
 */
export function inlineProp(name: string, content: string[]): InlinePropDefinition {
	return { name, content };
}

/**
 * Define a raw inline prop.
 *
 * Usage example:
 *
 * ```ts
 * rawInlineProp("url")
 * ```
 *
 * This is useful for raw args and raw heads.
 *
 * @param name Name of the prop
 * @category Prop
 */
export function rawInlineProp(name: string): RawInlinePropDefinition {
	return { name, raw: true };
}

// Tag generators

export function flagTag(tag: string) {
	return { tag, props: [] };
}

export function rawTag(bodyPropName: string): BlockSchemaDefinition {
	return { props: [{ name: bodyPropName, raw: true }] };
}
