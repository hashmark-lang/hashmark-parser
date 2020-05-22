import { BlockElement } from "../ast/BlockElement";
import { SpanElement } from "../ast/SpanElement";
import { InlineContent } from "../ast/InlineContent";

export function apply(root: BlockElement, schema: any): object {
	const result = mapBlock(root, schema.root);
	if (!result) throw new Error("Invalid root tag: no such block in the schema.");
	return result;

	function mapBlock(block: BlockElement, tag: string | null = block.tag): object | undefined {
		if (!tag) throw new Error("No defined default tag.");
		const blockSchema = schema.blocks[tag];
		if (!blockSchema) throw new Error("Invalid root tag: no such block in the schema.");

		const result: any = {};
		const unexpectedChildren = new Set(block.children);
		let valid = true;

		if (blockSchema.label) {
			const value = parseLabel(block, blockSchema.label.type);
			if (value) {
				result[blockSchema.label.key] = value;
			} else {
				valid = false;
			}
		} else if (block.label) {
			block.addError(`Unexpected label.`, block.labelStartColumn, block.labelStartColumn);
		}

		for (const { key, type, min, max } of blockSchema.attributes) {
			const children: BlockElement[] = block.getAll(key);
			children.forEach(child => unexpectedChildren.delete(child));
			const value = children.map(child => parseLabel(child, type));
			if (value.length < min) {
				block.addError(`Expected at least ${min} #${key} children but only got ${value.length}.`);
				valid = false;
			} else if (value.length > max) {
				for (let i = max; i < value.length; ++i) {
					children[i].addError(`Expected at most ${max} #${type} children, but this is the ${i}th.`);
				}
				valid = false;
			} else if (value.some(child => !child)) {
				// At least one of its children is invalid, so this block is too.
				valid = false;
			} else if (max <= 1) {
				result[key] = value[0];
			} else {
				result[key] = value;
			}
		}

		const children = block.getAll(blockSchema.children);
		children.forEach(child => unexpectedChildren.delete(child));
		result["$children"] = children.map(child => mapBlock(child, child.tag || blockSchema.defaultTag));
		result["$element"] = block;

		for (const child of unexpectedChildren) child.addError("Unexpected child.");

		return valid ? result : undefined;
	}

	function mapInlineContent(content: InlineContent, block: BlockElement) {
		return content.map(child => (typeof child == "string" ? child : mapSpan(child, block))).filter(child => child);
	}

	function mapSpan(span: SpanElement, block: BlockElement): object | undefined {
		const spanSchema = schema.blocks[span.tag];
		if (!spanSchema) {
			block.addError("Unexpected element", span.startColumn, span.endColumn);
			return;
		}

		const result: any = {};
		let i = 0;
		let valid = true;
		for (const { key, type } of spanSchema.attributes) {
			++i;
			const content = span.attributes[i];
			if (!content) {
				block.addError(`Missing ${i}th argument: ${key}.`);
				continue;
			}
			const mapped = mapInlineContent(content, block);
			if (!mapped || type == "inline") return mapped;
			const [value, error] = parseAttribute(content.join(""), type);
			if (error) {
				block.addError(error, block.labelStartColumn, block.labelStartColumn);
			}
			if (value) {
				result[key] = value;
			} else {
				valid = false;
			}
		}

		return valid ? result : undefined;
	}

	function parseLabel(block: BlockElement, type: string): any {
		if (!block.label) {
			block.addError(`Missing label.`, block.labelStartColumn, block.labelStartColumn);
			return;
		}
		const [result, error] = parseAttribute(block.label, type);
		if (error) {
			block.addError(error, block.labelStartColumn, block.labelStartColumn);
		}
		return result;
	}

	function parseAttribute(input: string, type: string): [any, string | undefined] {
		switch (type) {
			case "string":
				return [input, undefined];
			case "integer":
				return [parseInt(input), undefined];
			case "float":
				return [parseFloat(input), undefined];
		}
		return [undefined, undefined];
	}
}
