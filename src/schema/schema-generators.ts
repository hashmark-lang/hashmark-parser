import { SugarSyntax } from "../parser/Sugar";
import { Cardinality } from "./Cardinality";
import {
	ArgDefinition,
	BodyPropDefinitions,
	InlineDefinition,
	ParsedBlockDefinition,
	RawBlockDefinition,
	RootDefinition,
} from "./SchemaDefinition";

/////////////////
// CARDINALITY //
/////////////////

/**
 * Allow a tag to appear once or more within a prop.
 *
 * Usage example:
 *
 * ```ts
 * prop("content", oneOrMore("bar"))
 * ```
 *
 * This defines a `content` prop that may contain one or more occurrences of `#bar`
 *
 * @param tag Name of the tag to allow
 * @returns A cardinality rule for a prop in a block body
 * @category Cardinality
 */
export function oneOrMore(tag: string): { [tag: string]: Cardinality } {
	return { [tag]: { min: 1, max: Infinity } };
}

/**
 * Allow a tag to appear exactly once within a prop.
 *
 * Usage example:
 *
 * ```ts
 * prop("content", one("bar"))
 * ```
 *
 * This defines a `content` prop that may contain only exactly one occurrence of `#bar`
 *
 * @param tag Name of the tag to allow
 * @returns A cardinality rule for a prop in a block body
 * @category Cardinality
 */
export function one(tag: string): { [tag: string]: Cardinality } {
	return { [tag]: { min: 1, max: 1 } };
}

/**
 * Allow a tag to appear any number of times within a prop.
 *
 * Usage example:
 *
 * ```ts
 * prop("content", zeroOrMore("bar"))
 * ```
 *
 * This defines a `content` prop that may contain any number of `#bar`
 *
 * @param tag Name of the tag to allow
 * @returns A cardinality rule for a prop in a block body
 * @category Cardinality
 */
export function zeroOrMore(tag: string): { [tag: string]: Cardinality } {
	return { [tag]: { min: 0, max: Infinity } };
}

/**
 * Allow a tag to appear at most once.
 *
 * Usage example:
 *
 * ```ts
 * prop("content", optional("bar"))
 * ```
 *
 * This defines a `content` prop that may contain zero or one occurrences of `#bar`
 *
 * @param tag Name of the tag to allow
 * @returns A cardinality rule for a prop in a block body
 * @category Cardinality
 */
export function optional(tag: string): { [tag: string]: Cardinality } {
	return { [tag]: { min: 0, max: 1 } };
}

////////////
// BLOCKS //
////////////

export function root(body: BodyPropDefinitions, defaultTag?: string | undefined): RootDefinition {
	const res: RootDefinition = {
		rawBody: false,
		props: { body },
	};
	if (defaultTag) res.defaultTag = defaultTag;
	return res;
}

export function stringTag(propName: string): ParsedBlockDefinition {
	return blockTag(stringArg(propName));
}

export function urlTag(propName: string): ParsedBlockDefinition {
	return blockTag(urlArg(propName));
}

export function dateTag(propName: string): ParsedBlockDefinition {
	return blockTag(dateArg(propName));
}

export function lineTag(propName: string, content: string[]): ParsedBlockDefinition {
	return blockTag(parsedArg(propName, content));
}

export function blockTag(
	head?: ArgDefinition,
	body?: BodyPropDefinitions,
	defaultTag?: string
): ParsedBlockDefinition {
	const res: ParsedBlockDefinition = {
		rawBody: false,
		props: {},
	};
	if (head) res.props.head = head;
	if (body) res.props.body = body;
	if (defaultTag) res.defaultTag = defaultTag;
	return res;
}

export function rawBodyTag(rawPropName: string, head?: ArgDefinition): RawBlockDefinition {
	const res: RawBlockDefinition = {
		rawBody: true,
		props: {
			body: rawPropName,
		},
	};
	if (head) res.props.head = head;
	return res;
}

/////////////////
// BLOCK PROPS //
/////////////////

/**
 * Define a prop and its content.
 *
 * Usage example:
 *
 * ```ts
 * prop("content", zeroOrMore("foo"), optional("bar"))
 * ```
 *
 * This defines a `content` prop that may contain any number of `#foo` and optionally a `#bar`.
 *
 * @param name Name of the prop
 * @param content Array of allowed content. See Cardinality Functions.
 * @category Prop
 */
export function prop(
	name: string,
	...content: Array<{ [tag: string]: Cardinality }>
): BodyPropDefinitions {
	return { [name]: Object.assign({}, ...content) };
}

/**
 * Unite multiple props into a single [[BodyPropDefinitions]] object
 * @param bodyProps spread array of [[BodyPropDefinitions]]
 * @category Prop
 */
export function props(...bodyProps: BodyPropDefinitions[]): BodyPropDefinitions {
	return Object.assign({}, ...bodyProps);
}

/////////////////
// HEAD & ARGS //
/////////////////

export function stringArg(name: string): ArgDefinition {
	return { raw: true, type: "string", name };
}
export function urlArg(name: string): ArgDefinition {
	return { raw: true, type: "url", name };
}
export function dateArg(name: string): ArgDefinition {
	return { raw: true, type: "date", name };
}

export function parsedArg(name: string, content: string[]): ArgDefinition {
	return { raw: false, name, content };
}

/////////////
// INLINES //
/////////////

export function inline(...args: ArgDefinition[]): InlineDefinition {
	return { args };
}

export function inlineSugar(sugarSyntax: SugarSyntax, ...args: ArgDefinition[]): InlineDefinition {
	return { sugar: sugarSyntax, args };
}

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
