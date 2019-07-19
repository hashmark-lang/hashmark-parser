export interface BlockHandler<T> {
	rootBlock(): BlockContext<T>;
	openBlock(
		parent: T,
		tag: string,
		head: string,
		line: number,
		tagStart: number,
		tagEnd: number,
		headStart: number
	): BlockContext<T>;
	rawLine(parent: T, content: string): void;
}

export interface BlockContext<T> {
	rawBody: boolean;
	data: T;
}
