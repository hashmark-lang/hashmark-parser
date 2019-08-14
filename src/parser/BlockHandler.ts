import { InputPosition } from "./InputPosition";

/**
 * A `BlockHandler` builds a data structure from instructions from the {@link BlockParser}.
 */
export interface BlockHandler {
	/**
	 * Open a block tag.
	 *
	 * @param tag name of the tag, or `undefined` if the tag is not explicitly named
	 * @param pos position of the start of the block
	 *
	 * @returns `true` if the block body is raw, `false` otherwise
	 */
	openBlock(tag: string | undefined, pos: InputPosition): boolean;

	/**
	 * Receive the head content of the currently open block.
	 *
	 * It is the responsibility of the block handler to further parse the head content
	 * (i.e. call the {@link InlineParser} if needed).
	 *
	 * @param content raw content of the head
	 * @param pos position of the head content
	 */
	head(content: string, pos: InputPosition): void;

	/**
	 * Close the currently open block.
	 *
	 * @param pos start position of the block
	 */
	closeBlock(pos: InputPosition): void;

	/**
	 *
	 * @param content
	 * @param pos
	 */
	rawLine(content: string, pos: InputPosition): void;
}
