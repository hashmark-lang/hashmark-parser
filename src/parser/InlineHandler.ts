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
	getAllSugars(): Sugar[];
}

export interface InlineContext<InlineGroupData> {
	raw: boolean;
	sugars: SugarsMap;
	data: InlineGroupData;
}

export interface Sugar {
	start: string;
	separator?: string;
	end: string;
	tag: string;
}

export type SugarsMap = Map<string, Sugar>;
