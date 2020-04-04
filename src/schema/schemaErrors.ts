import { isValidPropName } from "../ir/IRNode";
import { findDuplicates, hasDuplicates } from "../utils";
import {
	DuplicatePropAssignmentError,
	DuplicatePropNameError,
	IllegalPropNameError,
	IllegalTagNameError,
	SchemaDefinitionError,
	UndefinedBlockTagError,
	UndefinedInlineTagError,
} from "./errors";
import { ParsedArgDefinition, ROOT, SchemaDefinition } from "./SchemaDefinition";

/**
 * Check a schema definition for errors. The rules of a schema definition are:
 *
 * 1. All prop names within an element must be different
 * 2. The pairwise intersection of block prop contents must be empty.
 * 3. Prop names may not start with "$"
 * 4. Body props must reference block tags that exist in the schema
 * 5. Head props and args must reference inline tags that exist in the schema
 * 6. Tag names must be "legal": no spaces, no hashtags, no opening brackets
 *
 * There is an error for each of these rules:
 *
 * 1. [[DuplicatePropNameError]]
 * 2. [[DuplicatePropAssignmentError]]
 * 3. [[IllegalPropNameError]]
 * 4. [[UndefinedBlockTagError]]
 * 5. [[UndefinedInlineTagError]]
 * 6. [[IllegalTagNameError]]
 *
 * @param schema Schema definition object.
 * @returns Array of schema definition errors, or an empty array if no errors were found.
 */
export function schemaErrors(schema: SchemaDefinition): SchemaDefinitionError[] {
	const errors: SchemaDefinitionError[] = [];

	const blockTagNames = new Set(Object.keys(schema.blocks));
	const inlineTagNames = new Set(Object.keys(schema.inline));

	for (const [tag, tagSchema] of Object.entries(schema.blocks).concat([[ROOT, schema.root]])) {
		const head = tagSchema.props.head;
		const headPropNames = head ? [head.name] : [];

		if (head && !head.raw) {
			const headContent = [{ name: head.name, content: head.content }];
			errors.push(...undefinedInlineTagErrors(inlineTagNames, tag, headContent)); // Rule 5
		}

		if (tagSchema.rawBody) {
			const props = tagSchema.props;
			const bodyPropNames = [props.body];
			const propNames = headPropNames.concat(bodyPropNames);
			errors.push(
				...duplicatePropNameErrors(tag, propNames), // Rule 1
				...illegalPropNameErrors(tag, propNames) // Rule 3
			);
		} else {
			const body = tagSchema.props.body;
			const bodyPropNames = body ? Object.keys(body) : [];
			const propNames = headPropNames.concat(bodyPropNames);
			const bodyContent = body
				? Object.entries(body).map(([prop, content]) => ({
						name: prop,
						content: Object.keys(content),
				  }))
				: [];

			errors.push(
				...duplicatePropNameErrors(tag, propNames), // Rule 1
				...duplicatePropAssignmentErrors(tag, bodyContent), // Rule 2
				...illegalPropNameErrors(tag, propNames), // Rule 3
				...undefinedBlockTagErrors(blockTagNames, tag, bodyContent) // Rule 4
			);
		}
		errors.push(...illegalTagNameErrors(tag)); // Rule 6
	}

	for (const [tag, tagSchema] of Object.entries(schema.inline)) {
		const propNames = tagSchema.args.map((arg) => arg.name);
		const argContent = tagSchema.args
			.filter((arg): arg is ParsedArgDefinition => !arg.raw)
			.map((arg) => ({ name: arg.name, content: arg.content }));

		errors.push(
			...duplicatePropNameErrors(tag, propNames), // Rule 1
			...illegalPropNameErrors(tag, propNames), // Rule 3
			...undefinedInlineTagErrors(inlineTagNames, tag, argContent), // Rule 5
			...illegalTagNameErrors(tag) // Rule 6
		);
	}

	return errors;
}

function duplicatePropNameErrors(tag: string, propNames: string[]): DuplicatePropNameError[] {
	if (hasDuplicates(propNames)) {
		return findDuplicates(propNames).map(
			([propName, count]) => new DuplicatePropNameError(tag, propName, count)
		);
	}
	return [];
}

function duplicatePropAssignmentErrors(
	tag: string,
	props: Array<{ name: string; content: string[] }>
): DuplicatePropAssignmentError[] {
	const propsSets = props.map(({ name, content }) => ({ name, content: new Set(content) }));
	const contentTags: Set<string> = new Set(props.flatMap((prop) => prop.content));
	const errors: DuplicatePropAssignmentError[] = [];
	for (const contentTag of contentTags) {
		const assignments = propsSets.filter((propSet) => propSet.content.has(contentTag));
		if (assignments.length > 1) {
			errors.push(
				new DuplicatePropAssignmentError(
					tag,
					assignments.map((_) => _.name),
					contentTag
				)
			);
		}
	}
	return errors;
}

function illegalPropNameErrors(tag: string, propNames: string[]): IllegalPropNameError[] {
	return propNames
		.filter((name) => !isValidPropName(name))
		.map((name) => new IllegalPropNameError(tag, name));
}

function undefinedInlineTagErrors(
	inlineTags: Set<string>,
	tag: string,
	props: Array<{ name: string; content: string[] }>
): UndefinedInlineTagError[] {
	return props.flatMap(({ name, content }) =>
		content
			.filter((ref) => !inlineTags.has(ref))
			.map((ref) => new UndefinedInlineTagError(tag, name, ref))
	);
}

function undefinedBlockTagErrors(
	blockTags: Set<string>,
	tag: string,
	props: Array<{ name: string; content: string[] }>
): UndefinedBlockTagError[] {
	return props.flatMap(({ name, content }) =>
		content
			.filter((ref) => !blockTags.has(ref))
			.map((ref) => new UndefinedBlockTagError(tag, name, ref))
	);
}

function illegalTagNameErrors(tag: string): IllegalTagNameError[] {
	const illegalChars = ["#", "[", " "];
	return illegalChars
		.filter((char) => tag.includes(char))
		.map((char) => new IllegalTagNameError(tag, char));
}
