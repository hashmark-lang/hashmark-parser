// tslint:disable:max-classes-per-file
import { BlockElement, InlineElement } from "../ast/ast";
import { ordinal } from "../utils";

enum Cardinality {
	ZeroOrMore = "zeroOrMore",
	OneOrMore = "oneOrMore",
	One = "one",
	Optional = "optional"
}

export abstract class HMError extends Error {
	constructor(readonly code: ErrorCode, message: string) {
		super(message);
	}

	toString(): string {
		return `Error HM${this.code}: ${this.message}`;
	}
}

export const enum ErrorCode {
	UNKNOWN_TAG = 100,
	INLINE_USED_AS_BLOCK,
	BLOCK_USED_AS_INLINE,
	DISALLOWED_IN_BLOCK,
	DISALLOWED_IN_ARG,
	DISALLOWED_IN_HEAD,
	CARDINALITY,
	ARGUMENT_COUNT
}

export interface ErrorPosition {
	line: number;
	startCol: number;
	endCol: number;
}

//////////////////////////////
// Schema validation errors //
//////////////////////////////

export abstract class ValidationError extends HMError {
	readonly position: ErrorPosition[];
	constructor(
		code: ErrorCode,
		message: string,
		...errorSources: Array<BlockElement | InlineElement>
	) {
		super(code, message);
		this.position = errorSources.map(tree => ({
			line: tree.line,
			startCol: tree.tagStart,
			endCol: tree.tagEnd
		}));
	}
}

export class UnknownTagError extends ValidationError {
	readonly position: ErrorPosition[];
	constructor(tree: BlockElement | InlineElement) {
		super(ErrorCode.UNKNOWN_TAG, `Unknown tag '${tree.tag}'`, tree);
	}
}

export class InlineUsedAsBlockError extends ValidationError {
	readonly position: ErrorPosition[];
	constructor(tree: BlockElement) {
		super(
			ErrorCode.INLINE_USED_AS_BLOCK,
			`Expected '#${tree.tag}' to be used as an inline tag`,
			tree
		);
	}
}

export class BlockUsedAsInlineError extends ValidationError {
	readonly position: ErrorPosition[];
	constructor(tree: InlineElement) {
		super(
			ErrorCode.BLOCK_USED_AS_INLINE,
			`Expected '#${tree.tag}' to be used as a block tag`,
			tree
		);
	}
}

export class DisallowedInBlockError extends ValidationError {
	constructor(parent: BlockElement, tree: BlockElement) {
		super(
			ErrorCode.DISALLOWED_IN_BLOCK,
			`Tag '#${tree.tag}' is not allowed in '#${parent.tag}'`,
			tree
		);
	}
}

export class DisallowedInArgError extends ValidationError {
	constructor(parent: InlineElement, argIndex: number, tree: InlineElement) {
		super(
			ErrorCode.DISALLOWED_IN_ARG,
			`Tag '#${tree.tag}' is not allowed in the ${ordinal(argIndex + 1)} argument of '#${
				parent.tag
			}'`,
			tree
		);
	}
}

export class DisallowedInHeadError extends ValidationError {
	constructor(parent: BlockElement, tree: InlineElement) {
		super(
			ErrorCode.DISALLOWED_IN_HEAD,
			`Tag '#${tree.tag}' is not allowed in the head of '#${parent.tag}'`,
			tree
		);
	}
}

export class CardinalityError extends ValidationError {
	constructor(
		parent: BlockElement,
		children: BlockElement[],
		tag: string,
		count: number,
		cardinality: Cardinality
	) {
		super(
			ErrorCode.CARDINALITY,
			`Saw ${count} occurrences of '#${tag}' in '#${
				parent.tag
			}', but the schema requires ${CardinalityError.cardinalityToString(cardinality)} in '#${
				parent.tag
			}'`,
			...(children.length > 0 ? children : [parent])
		);
	}

	static cardinalityToString(cardinality: Cardinality): string {
		if (cardinality === Cardinality.ZeroOrMore) {
			throw new Error(`${cardinality} should never be the cause of a cardinality error`);
		}
		const strings = {
			[Cardinality.One]: "exactly one",
			[Cardinality.OneOrMore]: "one or more",
			[Cardinality.Optional]: "zero or one"
		};
		return strings[cardinality];
	}
}

export class ArgumentCountError extends ValidationError {
	constructor(inline: InlineElement, expected: number) {
		super(
			ErrorCode.ARGUMENT_COUNT,
			`Expected '#${inline.tag}' to have ${expected} arguments, but got ${inline.args.length} instead`,
			inline
		);
	}
}
