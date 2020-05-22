import { BlockElement } from "../ast/BlockElement";

export function apply(root: BlockElement, schema: any): object {
	return mapBlock(root, schema.root, schema);
}

export function mapBlock(block: BlockElement, tag: string, schema: any) {
	const blockSchema = schema.blocks[]
}

export function mapSpan(schema: any) {}
