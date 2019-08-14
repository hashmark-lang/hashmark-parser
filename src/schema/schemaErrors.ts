import { countOccurrences, unique } from "../utils";
import {
	DuplicatePropAssignmentError,
	DuplicatePropNameError,
	DuplicatePropTagsError,
	SchemaDefinitionError
} from "./errors";
import { BlockPropDefinition, RawBlockPropDefinition, SchemaDefinition } from "./SchemaDefinition";

/**
 * Check a schema definition for errors. The rules of a schema definition are:
 *
 * 1. All prop names within an element must be different
 * 2. All block prop content tags must be declared once
 * 3. The pairwise intersection of block prop contents must be empty.
 *
 * There is an error for each of these rules:
 *
 * 1. [[DuplicatePropNameError]]
 * 2. [[DuplicatePropTagsError]]
 * 3. [[DuplicatePropAssignmentError]]
 *
 * @param schema Schema definition object.
 * @returns Array of schema definition errors, or an empty array if no errors were found.
 */
export function schemaErrors(schema: SchemaDefinition): SchemaDefinitionError[] {
	const errors: SchemaDefinitionError[] = [];

	for (const [tag, tagSchema] of Object.entries(schema.blocks)) {
		const props = tagSchema.props;
		if (!isRawBlockProp(props)) {
			const propNames = props.map(prop => prop.name);
			const propContentTags = props.map(({ name, content }) => ({
				name,
				content: content.map(_ => _.tag)
			}));

			errors.push(
				...duplicatePropNameErrors(tag, propNames), // Rule 1
				...duplicatePropTagsErrors(tag, propContentTags), // Rule 2
				...duplicatePropAssignmentErrors(tag, propContentTags) // Rule 3
			);
		}
	}

	for (const [tag, tagSchema] of Object.entries(schema.inline)) {
		const propNames = tagSchema.props.map(prop => prop.name);
		errors.push(...duplicatePropNameErrors(tag, propNames)); // Rule 1
	}

	return errors;
}

function duplicatePropAssignmentErrors(
	tag: string,
	props: Array<{ name: string; content: string[] }>
): DuplicatePropAssignmentError[] {
	const propsSets = props.map(({ name, content }) => ({ name, content: new Set(content) }));
	const contentTags: Set<string> = new Set(props.flatMap(prop => prop.content));
	const errors: DuplicatePropAssignmentError[] = [];
	for (const contentTag of contentTags) {
		const assignments = propsSets.filter(propSet => propSet.content.has(contentTag));
		if (assignments.length > 1) {
			errors.push(
				new DuplicatePropAssignmentError(tag, assignments.map(_ => _.name), contentTag)
			);
		}
	}
	return errors;
}

function duplicatePropTagsErrors(
	tag: string,
	props: Array<{ name: string; content: string[] }>
): DuplicatePropTagsError[] {
	return props
		.filter(prop => hasDuplicates(prop.content))
		.flatMap(prop =>
			findDuplicates(prop.content).map(
				([contentTag, count]) =>
					new DuplicatePropTagsError(tag, prop.name, contentTag, count)
			)
		);
}

function duplicatePropNameErrors(tag: string, propNames: string[]): DuplicatePropNameError[] {
	if (hasDuplicates(propNames)) {
		return findDuplicates(propNames).map(
			([propName, count]) => new DuplicatePropNameError(tag, propName, count)
		);
	}
	return [];
}

function hasDuplicates<T>(seq: T[]): boolean {
	return unique(seq).length !== seq.length;
}

function findDuplicates<T>(seq: T[]): Array<[T, number]> {
	return [...countOccurrences(seq).entries()].filter(([item, count]) => count > 1);
}

function isRawBlockProp(
	prop: [RawBlockPropDefinition] | BlockPropDefinition[]
): prop is [RawBlockPropDefinition] {
	return prop.length === 1 && Boolean(prop[0].raw);
}
