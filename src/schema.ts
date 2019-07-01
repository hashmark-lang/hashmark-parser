 import { Tree } from "ts-tree";

export interface Tag {
	name: string;
	type: "block" | "line" | "inline";
}

export interface BlockValue {
	readonly tag: Tag;
	readonly tagText: string;
	readonly head: Line;
}

export type Block = Tree<BlockValue>;

/*export class Block extends Tree {
	constructor(readonly tag: Tag, readonly tagText: string = "", readonly head: Line = []) {
		super();
	}

	toJSON(): any {
		return {
			tagText: this.tagText,
			head: this.head,
			children: this.children.map(child => child.toJSON())
		};
	}
}*/

export type Line = Array<string | Inline>;
export interface Inline {
	tag: Tag;
	closed: boolean;
	arguments: Line[];
}

export interface Schema {
	getTag(name: string): Tag;
	getDefault(parent: Tag): Tag;
	validate(tree: Block): Error[];
	isRaw(tree: Tag): boolean;
}

export class AnySchema implements Schema {
	private readonly map = new Map<string, Tag>();

	addTags(...tags: Tag[]) {
		for (const tag of tags) this.map.set(tag.name, tag);
	}

	getTag(name: string): Tag {
		let tag = this.map.get(name);
		if (tag) return tag;
		tag = { name, type: "block" };
		this.map.set(name, tag);
		return tag;
	}

	getDefault(tag: Tag) {
		return this.getTag("default");
	}

	isRaw(tree: Tag): boolean {
		return tree.name === "raw";
	}

	validate(tree: Block): Error[] {
		return [];
	}
}
