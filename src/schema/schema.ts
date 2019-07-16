import { BlockElement, InlineGroup } from "../ast";
import { ValidationError } from "./errors";

export const enum Reserved {
	rootTag = "root",
	defaultTag = "_default",
	rawLine = "_raw_line"
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
	validateBlock(tree: BlockElement): ValidationError[];
	validateLine(tree: InlineGroup): ValidationError[];
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

	validateBlock(tree: BlockElement): ValidationError[] {
		return [];
	},

	validateLine(tree: InlineGroup): ValidationError[] {
		return [];
	}
};
