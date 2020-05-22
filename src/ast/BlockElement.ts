import { BlockError } from "./BlockError";

export const ROOT_TAG = "_root";

export class BlockElement {
	constructor(
		readonly tag: string | null,
		readonly label: string | null = null,
		readonly lineDelta: number = 0,
		readonly tagStartColumn: number = 0,
		readonly tagEndColumn: number = 0,
		readonly labelStartColumn: number = 0,
		readonly labelEndColumn: number = 0,
		readonly errors: BlockError[] = [],
		readonly children: BlockElement[] = []
	) {}

	get(tag: string): BlockElement | undefined {
		return this.children.find(child => child.tag === tag);
	}

	getAll(tags: ReadonlySet<string | null>): BlockElement[] {
		return this.children.filter(child => tags.has(child.tag));
	}

	addError(message: string, startColumn: number = this.tagStartColumn, endColumn: number = this.tagStartColumn) {
		this.errors.push(new BlockError(message, startColumn, endColumn));
	}
}
