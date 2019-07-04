import { Block, Line } from "./ast";

export interface Schema {
	inlineDelimiters: { [delimiter: string]: string };
	getDefault(parentName: string): string;
	validateBlock(tree: Block): Error[];
	validateLine(tree: Line): Error[];
	isRaw(name: string): boolean;
}

export const defaultSchema = {
	inlineDelimiters: ["**", "*", "__", "_", "$$", "$", "`"],

	getDefault(parentName: string) {
		return "default";
	},

	isRaw(name: string): boolean {
		return name === "raw";
	},

	validateBlock(tree: Block): Error[] {
		return [];
	},

	validateLine(tree: Line): Error[] {
		return [];
	}
};
