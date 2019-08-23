import { Cardinality, sumCardinalities } from "./Cardinality";

/**
 * A [[PropType]] describes the type of a tag.
 *
 * An [[IRNode]] has named props, each of which can take on a different type depending on the schema.
 * The type definition of [[IRNode]] and [[Prop]] is the most general, but will be more specific at runtime.
 * Therefore, we need a way to describe more precisely what the prop will contain. This is necessary for generating
 * Typescript definitions, and for determining how to initialize props.
 *
 * It says:
 *
 * 1. Which type of values can be placed in the prop
 * 2. How many values the prop may contain
 *
 * Note that the Note that this is the same distinction that an [[IRNode]] defines with [[Prop]], which defines point 1,
 * and [[Quantified]], which defines point 2.
 *
 * For a [[PropType]], these two points are determined by:
 *
 * 1. Looking at the type of declared prop content in the schema
 * 2. Combining the cardinalities of the declared content, and summing them into a single [[Cardinality]]
 *
 * This information is represented as:
 *
 * 1. A union of [[ItemType]], which tells us what the type of a single item may be
 * 2. A [[Cardinality]], which tells us how to wrap the item types (in an array, optional, etc.)
 */
export type PropType = [Set<ItemType>, Cardinality];

export const enum ItemType {
	String,
	IRNode,
	URL,
	Date,
	Undefined
}

export function combinePropTypes(irTypes: PropType[]): PropType {
	const cardinalities = irTypes.map(([, cardinality]) => cardinality);
	const itemTypes = irTypes.flatMap(([items]) => Array.from(items));
	return [new Set(itemTypes), sumCardinalities(cardinalities)];
}
