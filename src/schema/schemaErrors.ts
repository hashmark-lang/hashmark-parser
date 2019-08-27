import { isValidPropName } from "../ir/IRNode";
import { findDuplicates, hasDuplicates } from "../utils";
import {
	DuplicatePropAssignmentError,
	DuplicatePropNameError,
	IllegalPropNameError,
	SchemaDefinitionError
} from "./errors";
import { ROOT, SchemaDefinition } from "./SchemaDefinition";

/**
 * Check a schema definition for errors. The rules of a schema definition are:
 *
 * 1. All prop names within an element must be different
 * 2. The pairwise intersection of block prop contents must be empty.
 * 3. Prop names may not start with "$"
 *
 * There is an error for each of these rules:
 *
 * 1. [[DuplicatePropNameError]]
 * 2. [[DuplicatePropAssignmentError]]
 * 3. [[IllegalPropNameError]]
 *
 * @param schema Schema definition object.
 * @returns Array of schema definition errors, or an empty array if no errors were found.
 */
export function schemaErrors(schema: SchemaDefinition): SchemaDefinitionError[] {
	const errors: SchemaDefinitionError[] = [];

	for (const [tag, tagSchema] of Object.entries(schema.blocks).concat([[ROOT, schema.root]])) {
		if (tagSchema.rawBody) {
			const props = tagSchema.props;
			const headPropNames = props.head ? [props.head.name] : [];
			const bodyPropNames = [props.body];
			const propNames = headPropNames.concat(bodyPropNames);
			errors.push(
				...duplicatePropNameErrors(tag, propNames), // Rule 1
				...illegalPropNameErrors(tag, propNames) // Rule 3
			);
		} else {
			const body = tagSchema.props.body;
			const head = tagSchema.props.head;
			const bodyPropNames = body ? Object.keys(body) : [];
			const headPropNames = head ? [head.name] : [];
			const propNames = headPropNames.concat(bodyPropNames);
			const bodyPropContentTags = body
				? Object.entries(body).map(([prop, content]) => ({
						name: prop,
						content: Object.keys(content)
				  }))
				: [];
			errors.push(
				...duplicatePropNameErrors(tag, propNames), // Rule 1
				...duplicatePropAssignmentErrors(tag, bodyPropContentTags), // Rule 2
				...illegalPropNameErrors(tag, propNames)
			);
		}
	}

	for (const [tag, tagSchema] of Object.entries(schema.inline)) {
		const propNames = tagSchema.args.map(arg => arg.name);
		errors.push(
			...duplicatePropNameErrors(tag, propNames), // Rule 1
			...illegalPropNameErrors(tag, propNames) // Rule 3
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

function illegalPropNameErrors(tag: string, propNames: string[]): IllegalPropNameError[] {
	return propNames
		.filter(name => !isValidPropName(name))
		.map(name => new IllegalPropNameError(tag, name));
}
