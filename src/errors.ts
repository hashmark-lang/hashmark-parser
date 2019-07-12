// tslint:disable:max-classes-per-file
import { BlockElement, InlineElement } from "./ast";
import { Cardinality } from "./parseSchema";
import { ordinal } from "./utils";

export abstract class HMError extends Error {
	constructor(readonly code: number, message: string) {
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

//////////////////////////////
// Schema validation errors //
//////////////////////////////

export abstract class ValidationError extends HMError {}

export class UnknownTagError extends ValidationError {
	constructor(tree: BlockElement | InlineElement) {
		super(ErrorCode.UNKNOWN_TAG, `Unknown tag '${tree}'`);
	}
}

export class InlineUsedAsBlockError extends ValidationError {
	constructor(tree: BlockElement) {
		super(ErrorCode.INLINE_USED_AS_BLOCK, `Expected '${tree.tag}' to be used as an inline tag`);
	}
}

export class BlockUsedAsInlineError extends ValidationError {
	constructor(tree: InlineElement) {
		super(ErrorCode.BLOCK_USED_AS_INLINE, `Expected '${tree.tag}' to be used as a block tag`);
	}
}

export class DisallowedInBlockError extends ValidationError {
	constructor(parent: BlockElement, tree: BlockElement) {
		super(
			ErrorCode.DISALLOWED_IN_BLOCK,
			`Tag '#${tree.tag}' is not allowed in '#${parent.tag}'`
		);
	}
}

export class DisallowedInArgError extends ValidationError {
	constructor(parent: InlineElement, argIndex: number, tree: InlineElement) {
		super(
			ErrorCode.DISALLOWED_IN_ARG,
			`Tag '#${tree.tag}' is not allowed in the ${ordinal(argIndex + 1)} argument of '#${
				parent.tag
			}'`
		);
	}
}

export class DisallowedInHeadError extends ValidationError {
	constructor(parent: BlockElement, tree: InlineElement) {
		super(
			ErrorCode.DISALLOWED_IN_HEAD,
			`Tag '#${tree.tag}' is not allowed in the head of '#${parent.tag}'`
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
			`Saw ${count} occurrences of '${tag}' in ${
				parent.tag
			}, but the schema requires ${CardinalityError.cardinalityToString(cardinality)} in ${
				parent.tag
			}`
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
		return strings[cardinality] + ` ('#${cardinality}')`;
	}
}

export class ArgumentCountError extends ValidationError {
	constructor(inline: InlineElement, expected: number) {
		super(
			ErrorCode.ARGUMENT_COUNT,
			`Expected '#${inline.tag}' to have ${expected} arguments, but got ${inline.args.length} instead`
		);
	}
}
