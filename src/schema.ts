import { Block, Line } from "./ast";

export const enum Reserved {
	rootTag = "root",
	defaultTag = "_default"
}

export interface Schema {
	customTokens: Array<{ regex: RegExp; tag: string }>;
	getDefault(parentName: string): string | undefined;
	validateBlock(tree: Block): Error[];
	validateLine(tree: Line): Error[];
	isRaw(name: string): boolean;
}

export const defaultSchema: Schema = {
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
		return undefined;
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
