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
		readonly children: BlockElement[] = []
	) {}
}
