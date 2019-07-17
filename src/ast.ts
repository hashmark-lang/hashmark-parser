export type InlineGroup = Array<string | InlineElement>;

interface Positioned {
	line: number; // line number, 1-based
	tagStart: number; // column number, 1-based, inclusive
	tagEnd: number; // column number, 1-based, exclusive
}

export interface BlockElement extends Positioned {
	tag: string;
	head: InlineGroup;
	children: BlockElement[];
}

export interface InlineElement extends Positioned {
	tag: string;
	args: InlineGroup[];
	closed: boolean;
}

export function queryAll(ast: BlockElement, tag: string): BlockElement[] {
	return ast.children.flatMap(child => {
		const descendants = queryAll(child, tag);
		return child.tag === tag ? [child, ...descendants] : descendants;
	});
}

export function queryAllChildren(ast: BlockElement, tag: string): BlockElement[] {
	return ast.children.filter(b => b.tag === tag);
}

export function query(ast: BlockElement, tag: string): BlockElement | undefined {
	for (const child of ast.children) {
		if (child.tag === tag) return child;
		const childResult = query(child, tag);
		if (childResult) return childResult;
	}
	return undefined;
}

export function queryChildren(ast: BlockElement, tag: string): BlockElement | undefined {
	return ast.children.find(b => b.tag === tag);
}

export function getHeadString(block: BlockElement): string {
	if (block.head.some(x => typeof x !== "string")) {
		throw new Error("problem"); // TODO do better than this later
	}
	return (block.head as string[]).join("");
}
