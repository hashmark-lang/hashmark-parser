import { SugarSyntax } from "../parser/Sugar";
import { Cardinality } from "./Cardinality";

export const ROOT = "root";
export const INVALID_TAG = "*";

export interface SchemaDefinition {
	/** Defines the blocks allowed at the root of the document */
	root: RootDefinition;
	/** Defines all block tags */
	blocks: {
		[tagName: string]: BlockDefinition;
	};
	/** Defines all inline tags */
	inline: {
		[tagName: string]: InlineDefinition;
	};
}

////////////
// BLOCKS //
////////////

export type BlockDefinition = RawBlockDefinition | ParsedBlockDefinition;

export interface RootDefinition extends ParsedBlockDefinition {
	/** The props containing the tags at indentation level 0 */
	props: {
		/** The root cannot have a head, so it must not be set */
		head?: undefined;
		/** The props containing the root-level tags */
		body: BodyPropDefinitions;
	};
}

/** A raw block is one whose body is parsed as raw text */
export interface RawBlockDefinition {
	rawBody: true;
	/** Defines the props that will be available on the IR */
	props: {
		/** Prop containing the head. If not set, no head is allowed. */
		head?: ArgDefinition;
		/** Name of the prop that contains the body's lines */
		body: string;
	};
}

/** A raw block is one whose body is parsed as Hashml */
export interface ParsedBlockDefinition {
	rawBody: false;
	/**
	 * In the body, if a line does not start with a tag, we can auto-insert the default tag.
	 * If this is not set, we take it to mean that default tags are not permitted.
	 */
	defaultTag?: string;
	/** Defines the props that will be available on the IR */
	props: {
		/** Prop containing the head. If not set, no head is allowed */
		head?: ArgDefinition;
		/** Props containing the body's tags. If not set, no body is allowed */
		body?: BodyPropDefinitions;
	};
}

/////////////////
// BLOCK PROPS //
/////////////////

/**
 * Object defining which prop holds which tag, and with which cardinality
 * Note that a tag may be assigned to one prop at most. Failure to do so
 * will yield a [[DuplicatePropAssignmentError]].
 */
export interface BodyPropDefinitions {
	[propName: string]: {
		/** The referenced tag must be a block tag */
		[tagName: string]: Cardinality;
	};
}

/////////////////
// HEAD & ARGS //
/////////////////

export type ArgDefinition = RawArgDefinition | ParsedArgDefinition;

/** A raw line is one that should not be parsed as Hashml */
export interface RawArgDefinition {
	raw: true;
	/** Name of the prop that should hold this line */
	name: string;
	/**
	 * The type informs us of how to parse the head:
	 *
	 * - `type: "string"` as a raw line
	 * - `type: "url"` as a Url
	 * - `type: "date"` as a Date
	 */
	type: "string" | "url" | "date";
}

/** A parsed line should be parsed as Hashml */
export interface ParsedArgDefinition {
	raw: false;
	/** Name of the prop that should hold this line */
	name: string;
	/** List of allowed tags in the head */
	content: string[];
}

/////////////
// INLINES //
/////////////

export interface InlineDefinition {
	/** List of the arguments */
	args: ArgDefinition[];
	/** Optionally, a syntactic sugar for the tag */
	sugar?: SugarSyntax;
}
