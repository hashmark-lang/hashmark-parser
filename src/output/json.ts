import { BlockElement, InlineElement, InlineGroup } from "../ast/ast";
import { Reserved } from "../schema/schema";

export interface BlockElementJSON {
	tag?: string;
	head: InlineGroupJSON;
	children: BlockElementJSON[];
}

export type InlineGroupJSON = Array<string | InlineElementJSON>;

export interface InlineElementJSON {
	tag: string;
	args: InlineGroupJSON[];
}
export function toJSON({ tag, head, children }: BlockElement): BlockElementJSON {
	return { tag, head: inlineGroupToJSON(head), children: children.map(toJSON) };
}

export function inlineGroupToJSON(group: InlineGroup): InlineGroupJSON {
	return group.map(_ => (typeof _ === "string" ? _ : inlineToJSON(_)));
}

export function inlineToJSON({ tag, args }: InlineElement): InlineElementJSON {
	return { tag, args: args.map(inlineGroupToJSON) };
}
