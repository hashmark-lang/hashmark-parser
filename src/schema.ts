import { BlockElement, InlineGroup } from "./ast";

export const enum Reserved {
	rootTag = "root",
	defaultTag = "_default"
}

export interface Sugar {
	tag: string;
	start: string;
	end: string;
	separator?: string;
}

export interface Schema {
	sugars: Sugar[];
	getDefault(parentName: string): string | undefined;
	validateBlock(tree: BlockElement): Error[];
	validateLine(tree: InlineGroup): Error[];
	isRawBlock(name: string): boolean;
	isRawHead(name: string): boolean;
	isRawArg(name: string, index: number): boolean;
	isValidHeadChild(parent: string, child: string): boolean;
	isValidArgChild(parent: string, index: number, child: string): boolean;
}

export const defaultSchema: Schema = {
	sugars: [],

	getDefault(parentName: string) {
		return undefined;
	},

	isRawBlock(name: string): boolean {
		return false;
	},

	isRawHead(name: string): boolean {
		return false;
	},

	isRawArg(name: string, index: number): boolean {
		return false;
	},

	isValidHeadChild(parent: string, child: string): boolean {
		return true;
	},

	isValidArgChild(parent: string, index: number, child: string): boolean {
		return true;
	},

	validateBlock(tree: BlockElement): Error[] {
		return [];
	},

	validateLine(tree: InlineGroup): Error[] {
		return [];
	}
};
