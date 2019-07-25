import { SugarSyntax } from "../schema/SchemaDefinition";
import { InputPosition } from "./InputPosition";

export interface InlineHandler {
	openInlineTag(tag: string, pos: InputPosition): void;
	closeInlineTag(pos: InputPosition): void;
	openArgument(index: number, pos: InputPosition): false | SugarsByStart;
	closeArgument(pos: InputPosition): void;
	pushText(content: string): void;
	allSugars: Sugar[];
}

export interface Sugar {
	tag: string;
	syntax: SugarSyntax;
}

export type SugarsByStart = Map<string, Sugar>;
