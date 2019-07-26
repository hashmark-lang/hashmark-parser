import { countOccurrences, intersection, unique } from "../utils";
import { BlockPropDefinition, RawBlockPropDefinition, SchemaDefinition } from "./SchemaDefinition";

// Schema rules:
//   1) All prop names within an element must be different
//   2) All block prop content tags must be declared once
//   3) The pairwise intersection of block prop contents must be empty

export function checkSchemaDefinition(schema: SchemaDefinition): Error[] {
	function* checkBlockProps(): IterableIterator<Error> {
		for (const [tag, tagSchema] of Object.entries(schema.blocks)) {
			const props = tagSchema.props;
			if (!isRawBlockProp(props)) {
				const propNames = props.map(prop => prop.name);
				const propContentTags = props.map(({ name, content }) => ({
					name,
					content: content.map(_ => _.tag)
				}));

				yield* duplicatePropNameErrors(tag, propNames); // Rule 1
				yield* duplicateTagNameErrors(tag, propContentTags); // Rule 2
				yield* propsIntersectionErrors(tag, propContentTags); // Rule 3
			}
		}
	}

	function* checkInlineProps(): IterableIterator<Error> {
		for (const [tag, tagSchema] of Object.entries(schema.inline)) {
			const propNames = tagSchema.props.map(prop => prop.name);
			yield* duplicatePropNameErrors(tag, propNames); // Rule 1
		}
	}

	return [...checkBlockProps(), ...checkInlineProps()];
}

function* propsIntersectionErrors(
	tag: string,
	props: Array<{ name: string; content: string[] }>
): IterableIterator<Error> {
	for (let i = 0; i < props.length; ++i) {
		for (let j = i + 1; j < props.length; ++j) {
			const common = intersection(props[i].content, props[j].content);
			if (common.size > 0) {
				const commonString = [...common].join(", ");
				yield new Error(
					`Props '${props[i].name}' and '${props[j].name}' in schema for '${tag}' cannot have elements in common,` +
						`but have the following items in common: ${commonString}`
				);
			}
		}
	}
}

function* duplicateTagNameErrors(
	tag: string,
	props: Array<{ name: string; content: string[] }>
): IterableIterator<Error> {
	for (const { name, content } of props) {
		if (hasDuplicates(content)) {
			const errors = findDuplicates(content)
				.map(
					([contentTag, count]) => `Content tag '${contentTag}' is defined ${count} times`
				)
				.join("; ");
			yield new Error(
				`All content tags in prop '${name}' of tag '${tag}' must be unique. ${errors}`
			);
		}
	}
}

function* duplicatePropNameErrors(tag: string, propNames: string[]): IterableIterator<Error> {
	if (hasDuplicates(propNames)) {
		const errors = findDuplicates(propNames)
			.map(([propName, count]) => `Prop '${propName}' is defined ${count} times`)
			.join("; ");
		yield new Error(`All prop names in '${tag}' schema must be unique. ${errors}`);
	}
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
