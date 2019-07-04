import { Block, Line } from "./ast";

export interface Schema {
	customTokens: Array<{ regex: RegExp; tag: string }>;
	getDefault(parentName: string): string;
	validateBlock(tree: Block): Error[];
	validateLine(tree: Line): Error[];
	isRaw(name: string): boolean;
}

export const defaultSchema = {
	customTokens: [
		{
			regex: /`(.*?)`/,
			tag: "code"
		},
		{
			regex: /\*(.*?)\*/,
			tag: "emphasis"
		},
		{
			regex: /_(.*?)_/,
			tag: "strong"
		}
	],

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
