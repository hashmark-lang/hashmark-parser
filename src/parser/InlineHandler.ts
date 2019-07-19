export interface InlineHandler<T, TagT> {
	rootInlineTag(): InlineContext<T>;
	openInlineTag(parent: T, tag: string, line: number, start: number, end: number): TagT;
	openArgument(parent: TagT, index: number, line: number, start: number): InlineContext<T>;
	pushText(parent: T, content: string): void;
	getAllSugars(): Sugar[];
}

export interface InlineContext<T> {
	raw: boolean;
	sugars: SugarsMap;
	data: T;
}

export interface Sugar {
	start: string;
	separator?: string;
	end: string;
	tag: string;
}

export type SugarsMap = Map<string, Sugar>;
