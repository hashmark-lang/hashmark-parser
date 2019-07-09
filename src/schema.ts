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
	isRawBlock(name: string): boolean;
	isRawArg(name: string, index: number): boolean;
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

	isRawBlock(name: string): boolean {
		return name === "raw";
	},

	isRawArg(name: string, index: number): boolean {
		return name === "raw";
	},

	validateBlock(tree: Block): Error[] {
		return [];
	},

	validateLine(tree: Line): Error[] {
		return [];
	}
};
