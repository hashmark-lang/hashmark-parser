import { BlockElement, InlineElement } from "../ast/ast";
import { InputPosition } from "../parser/InputPosition";
import { ordinal } from "../utils";

enum Cardinality {
	ZeroOrMore = "zeroOrMore",
	OneOrMore = "oneOrMore",
	One = "one",
	Optional = "optional"
}

export type ErrorLogger = (error: HMError) => void;

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
	DISALLOWED_IN_BLOCK,
	DISALLOWED_IN_ARG,
	DISALLOWED_IN_HEAD,
	CARDINALITY,
	DISALLOWED_ARG,
	DISALLOWED_HEAD,
	DISALLOWED_DEFAULT_TAG
}

//////////////////////////////
// Schema validation errors //
//////////////////////////////

export abstract class ValidationError extends HMError {
	readonly positions: InputPosition[];
	constructor(code: ErrorCode, message: string, ...positions: InputPosition[]) {
		super(code, message);
		this.positions = positions.map(pos => ({ ...pos })); // Clone positions
	}
}

export class UnknownBlockTagError extends ValidationError {
	constructor(tag: string, pos: InputPosition) {
		super(ErrorCode.UNKNOWN_TAG, `Unknown block tag '${tag}'`, pos);
	}
}

export class DisallowedInBlockError extends ValidationError {
	constructor(parentTag: string, childTag: string, pos: InputPosition) {
		super(
			ErrorCode.DISALLOWED_IN_BLOCK,
			`Tag '#${childTag}' is not allowed in '#${parentTag}'`,
			pos
		);
	}
}

export class DisallowedInArgError extends ValidationError {
	constructor(tag: string, arg: string, pos: InputPosition) {
		super(
			ErrorCode.DISALLOWED_IN_ARG,
			`Tag '#${tag}' is not allowed in the '${arg}' argument`,
			pos
		);
	}
}

export class DisallowedInHeadError extends ValidationError {
	constructor(tag: string, parentTag: string, pos: InputPosition) {
		super(
			ErrorCode.DISALLOWED_IN_HEAD,
			`Tag '#${tag}' is not allowed in the head of '#${parentTag}'`,
			pos
		);
	}
}

export class CardinalityError extends ValidationError {
	constructor(
		parent: BlockElement,
		positions: Position[],
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
			}'`
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

export class DisallowedArgError extends ValidationError {
	constructor(tag: string, index: number, expectedLength: number, pos: InputPosition) {
		super(
			ErrorCode.DISALLOWED_ARG,
			`Disallowed ${ordinal(
				index + 1
			)} argument in '#${tag}'. Expected exactly ${expectedLength} arguments.`,
			pos
		);
	}
}

export class DisallowedHeadError extends ValidationError {
	constructor(parentTag: string, pos: InputPosition) {
		super(ErrorCode.DISALLOWED_HEAD, `Block '#${parentTag}' cannot have a head`, pos);
	}
}

export class DisallowedDefaultTagError extends ValidationError {
	constructor(parentTag: string, pos: InputPosition) {
		super(
			ErrorCode.DISALLOWED_DEFAULT_TAG,
			`Default tags are not allowed in block '#${parentTag}'`,
			pos
		);
	}
}
