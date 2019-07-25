import { InputPosition } from "../parser/InputPosition";

export type InlineGroup = Array<string | InlineElement>;

export interface BlockElement {
	tag?: string;
	head: InlineGroup;
	children: BlockElement[];
	pos: InputPosition;
}

export interface InlineElement {
	tag: string;
	args: InlineGroup[];
	pos: InputPosition;
}
