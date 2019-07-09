import { Block, Line } from "./ast";

export const enum Reserved {
	rootTag = "root",
	defaultTag = "_default"
}

export interface CustomToken {
	tag: string;
	start: RegExp;
	end: RegExp;
}

export interface Schema {
	customTokens: CustomToken[];
	getDefault(parentName: string): string | undefined;
	validateBlock(tree: Block): Error[];
	validateLine(tree: Line): Error[];
	isRawBlock(name: string): boolean;
	isRawArg(name: string, index: number): boolean;
}

export const defaultSchema: Schema = {
	customTokens: [
		{
			start: /`/,
			end: /`/,
			tag: "code"
		},
		{
			start: /\*/,
			end: /\*/,
			tag: "emphasis"
		},
		{
			start: /_/,
			end: /_/,
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
