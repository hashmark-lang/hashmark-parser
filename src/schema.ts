import { Block, Line } from "./ast";

export interface Schema {
	getDefault(parentName: string): string;
	validateBlock(tree: Block): Error[];
	validateLine(tree: Line): Error[];
	isRaw(name: string): boolean;
	getInlineDelimiters(): string[];
}

export class AnySchema implements Schema {
	getDefault(parentName: string) {
		return "default";
	}

	isRaw(name: string): boolean {
		return name === "raw";
	}

	validateBlock(tree: Block): Error[] {
		return [];
	}

	validateLine(tree: Line): Error[] {
		return [];
	}

	getInlineDelimiters() {
		return ["**", "*", "__", "_", "$$", "$", "`"];
	}
}
