/**
 * Takes instructions from a [[BlockParser]] to produce `BlockData` objects
 */
export interface BlockHandler<BlockData> {
	rootBlock(): BlockContext<BlockData>;
	openBlock(
		parent: BlockData,
		tag: string | undefined,
		head: string,
		line: number,
		tagStart: number,
		tagEnd: number,
		headStart: number
	): BlockContext<BlockData>;
	rawLine(parent: BlockData, content: string): void;
}

// Block data, with extra information for parsing.
export interface BlockContext<BlockData> {
	rawBody: boolean;
	data: BlockData;
}
