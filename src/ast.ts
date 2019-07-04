export type Line = Array<string | Inline>;

export interface Block {
	tag: string;
	head: Line;
	children: Block[];
}

export interface Inline {
	tag: string;
	arguments: Line[];
	closed: boolean;
}
