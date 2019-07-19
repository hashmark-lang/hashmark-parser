export type InlineGroup = Array<string | InlineElement>;

export interface BlockElement {
	tag?: string;
	head: InlineGroup;
	children: BlockElement[];
	line: number;
	tagStart: number;
	tagEnd: number;
}

export interface InlineElement {
	tag: string;
	args: InlineGroup[];
	line: number;
	tagStart: number;
	tagEnd: number;
}
