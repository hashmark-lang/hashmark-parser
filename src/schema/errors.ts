import { IRNode } from "../ir/IRNode";
import { InputPosition } from "../parser/InputPosition";
import { ordinal } from "../utils";
import { Cardinality } from "./Cardinality";

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
	// Definition errors:
	DUPLICATE_PROP_NAME = 100,
	DUPLICATE_PROP_ASSIGNMENT,
	ILLEGAL_PROP_NAME,
	UNDEFINED_BLOCK_TAG,
	UNDEFINED_INLINE_TAG,
	ILLEGAL_TAG_NAME,

	// Validation errors:
	UNKNOWN_BLOCK_TAG = 200,
	UNKNOWN_INLINE_TAG,
	DISALLOWED_IN_BLOCK,
	DISALLOWED_IN_ARG,
	DISALLOWED_IN_HEAD,
	CARDINALITY,
	DISALLOWED_ARG,
	DISALLOWED_HEAD,
	DISALLOWED_DEFAULT_TAG,
	TOO_FEW_ARGS
}

//////////////////////////////
// Schema definition errors //
//////////////////////////////

export abstract class SchemaDefinitionError extends HMError {
	constructor(code: ErrorCode, message: string) {
		super(code, message);
	}
}

export class DuplicatePropNameError extends SchemaDefinitionError {
	constructor(readonly tag: string, readonly propName: string, readonly repetitions: number) {
		super(
			ErrorCode.DUPLICATE_PROP_NAME,
			`Each prop name must be unique within a tag schema, ` +
				`but prop '${propName}' in the schema for tag '${tag}' was defined ${repetitions} times`
		);
	}
}

export class DuplicatePropAssignmentError extends SchemaDefinitionError {
	constructor(readonly tag: string, readonly propNames: string[], readonly contentTag: string) {
		super(
			ErrorCode.DUPLICATE_PROP_ASSIGNMENT,
			`A tag can be assigned to at most one prop, but in the schema for '${tag}', ` +
				`${contentTag} was assigned to ${propNames.join(", ")}`
		);
	}
}

export class IllegalPropNameError extends SchemaDefinitionError {
	constructor(readonly tag: string, readonly propName: string) {
		super(
			ErrorCode.ILLEGAL_PROP_NAME,
			`A prop name cannot start with '$', but in the schema for '${tag}', the prop '${propName}' starts with $`
		);
	}
}

export class UndefinedBlockTagError extends SchemaDefinitionError {
	constructor(
		readonly schemaTag: string,
		readonly propName: string,
		readonly referencedTag: string
	) {
		super(
			ErrorCode.UNDEFINED_BLOCK_TAG,
			`The schema for tag '${schemaTag}' references a block tag named '${referencedTag}' in the prop '${propName}', but that tag is not defined in the schema's blocks`
		);
	}
}

export class UndefinedInlineTagError extends SchemaDefinitionError {
	constructor(
		readonly schemaTag: string,
		readonly propName: string,
		readonly referencedTag: string
	) {
		super(
			ErrorCode.UNDEFINED_INLINE_TAG,
			`The schema for tag '${schemaTag}' references a tag named '${referencedTag}' in the prop '${propName}', but that tag is not defined in the schema's inlines`
		);
	}
}

export class IllegalTagNameError extends SchemaDefinitionError {
	constructor(readonly tag: string, readonly illegalChar: string) {
		super(
			ErrorCode.ILLEGAL_TAG_NAME,
			`Tag name '${tag}' is not legal, as it contains '${illegalChar}'. Tag names may not contain '#', '[' or ' '.`
		);
	}
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
		super(ErrorCode.UNKNOWN_BLOCK_TAG, `Unknown block tag '${tag}'`, pos);
	}
}

export class UnknownInlineTagError extends ValidationError {
	constructor(tag: string, pos: InputPosition) {
		super(ErrorCode.UNKNOWN_INLINE_TAG, `Unknown inline tag '${tag}'`, pos);
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
		parent: IRNode,
		positions: InputPosition[],
		tag: string,
		count: number,
		{ min, max }: Cardinality
	) {
		super(
			ErrorCode.CARDINALITY,
			`Saw ${count} occurrences of '#${tag}' in '#${parent.tag}', but the schema requires ${min} to ${max} ` +
				`(inclusive) occurrences in '#${parent.tag}'`,
			...positions
		);
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

export class TooFewArgsError extends ValidationError {
	constructor(
		readonly tag: string,
		readonly argCount: number,
		readonly expectedLength: number,
		readonly pos: InputPosition
	) {
		super(
			ErrorCode.TOO_FEW_ARGS,
			`Too few args were given for '#${tag}'. Expected exactly ${expectedLength} args, but only found ${argCount}`,
			pos
		);
	}
}
