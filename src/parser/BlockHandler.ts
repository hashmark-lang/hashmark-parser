import { InputPosition } from "./InputPosition";

export interface BlockHandler {
	openBlock(tag: string | undefined, pos: InputPosition): boolean;
	head(tag: string | undefined, pos: InputPosition): void;
	closeBlock(pos: InputPosition): void;
	rawLine(content: string, pos: InputPosition): void;
}
