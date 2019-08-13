import { InputPosition } from "./InputPosition";

export interface InlineHandler {
	openInlineTag(tag: string, pos: InputPosition): void;
	closeInlineTag(pos: InputPosition): void;
	openArgument(index: number, pos: InputPosition): boolean;
	closeArgument(pos: InputPosition): void;
	pushText(content: string): void;
}
