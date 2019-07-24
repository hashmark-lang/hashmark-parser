import { SugarDefinition } from "../schema/SchemaDefinition";

/**
 * Takes instructions from [[InlineParser]] in order to build an AST.
 */
export interface InlineHandler<InlineGroupData, InlineData, ParentData = undefined> {
	rootInlineTag(parentData: ParentData): InlineContext<InlineGroupData>;
	openInlineTag(
		parent: InlineGroupData,
		tag: string,
		line: number,
		start: number,
		end: number
	): InlineData;
	openArgument(
		parent: InlineData,
		index: number,
		line: number,
		start: number
	): InlineContext<InlineGroupData>;
	pushText(parent: InlineGroupData, content: string): void;
	getAllSugars(): NamedSugar[];
}

export interface InlineContext<InlineGroupData> {
	raw: boolean;
	sugars: SugarsMap;
	data: InlineGroupData;
}

export interface NamedSugar extends SugarDefinition {
	tag: string;
}

export type SugarsMap = Map<string, NamedSugar>;
