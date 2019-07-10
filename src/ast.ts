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

export function queryAll(ast: Block, tag: string): Block[] {
	return ast.children.flatMap(child => {
		const descendants = queryAll(child, tag);
		return child.tag === tag ? [child, ...descendants] : descendants;
	});
}

export function queryAllChildren(ast: Block, tag: string): Block[] {
	return ast.children.filter(b => b.tag === tag);
}

export function query(ast: Block, tag: string): Block | undefined {
	for (const child of ast.children) {
		if (child.tag === tag) return child;
		const childResult = query(child, tag);
		if (childResult) return childResult;
	}
	return undefined;
}

export function queryChildren(ast: Block, tag: string): Block | undefined {
	return ast.children.find(b => b.tag === tag);
}

export function getHeadString(block: Block): string {
	if (block.head.some(x => typeof x !== "string")) {
		throw new Error("problem"); // TODO do better than this later
	}
	return (block.head as string[]).join("");
}
