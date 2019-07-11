// tslint:disable:max-classes-per-file
import { BlockElement, InlineElement } from "./ast";
import { Cardinality } from "./parseSchema";

export abstract class HMError extends Error {
	abstract readonly code: number;
	abstract readonly message: string;

	toString(): string {
		return `Error HM${this.code}: ${this.message}`;
	}
}

//////////////////////////////
// Schema validation errors //
//////////////////////////////

export abstract class ValidationError extends HMError {
	constructor(readonly code: number, readonly message: string) {
		super();
	}
}

export class UnknownTagError extends ValidationError {
	constructor(tree: BlockElement | InlineElement) {
		super(1001, `Unknown tag '${tree}'`);
	}
}

export class DisallowedError extends ValidationError {
	constructor(parent: BlockElement | InlineElement, tree: BlockElement | InlineElement) {
		super(1002, `Tag '#${tree.tag}' is not allowed in '#${parent.tag}'`);
	}
}

export class InlineUsedAsBlockError extends ValidationError {
	constructor(tree: BlockElement) {
		super(1003, `Expected '${tree.tag}' to be used as an inline tag`);
	}
}

export class BlockUsedAsInlineError extends ValidationError {
	constructor(tree: InlineElement) {
		super(1004, `Expected '${tree.tag}' to be used as a block tag`);
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
			1005,
			`Saw ${count} occurrences of '${tag}' in ${
				parent.tag
			}, but the schema requires ${CardinalityError.cardinalityToString(cardinality)} in ${
				parent.tag
			}`
		);
	}

	static cardinalityToString(cardinality: Cardinality): string {
		switch (cardinality) {
			case Cardinality.One:
				return "exactly one";
			case Cardinality.OneOrMore:
				return "one or more";
			case Cardinality.Optional:
				return "zero or one";
			case Cardinality.ZeroOrMore:
				throw new Error(
					`${Cardinality.ZeroOrMore} cardinality should never be the cause of a cardinality error`
				);
		}
	}
}

export class ArgumentCountError extends ValidationError {
	constructor(inline: InlineElement, expected: number) {
		super(
			1006,
			`Expected '#${inline.tag}' to have ${expected} arguments, but got ${inline.args.length} instead`
		);
	}
}
