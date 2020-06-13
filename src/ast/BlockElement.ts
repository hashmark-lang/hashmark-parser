import { InlineContent, getInlineContentSource } from "./InlineContent";
import { parseInline } from "../parser/parseInline";

export class BlockElement {
	constructor(
		readonly tag: string | null,
		readonly label: InlineContent | string | null = null,
		readonly lineDelta: number = 0,
		readonly children: BlockElement[] = []
	) {}

	get(tag: string) {
		return this.children.find(el => el.tag === tag);
	}

	getAll(tag: string) {
		return this.children.filter(el => el.tag === tag);
	}

	isLabelParsed() {
		return typeof this.label === "object";
	}

	parseLabel() {
		if (!this.label) throw new Error("Cannot parse null label");
		if (typeof this.label !== "string") throw new Error("Label already parsed.");
		(this as any).label = parseInline(this.label);
	}

	get source(): string {
		return this.tagSource + this.labelSource;
	}

	get tagSource(): string {
		return this.tag ? "#" + this.tag + " " : "";
	}

	get labelSource(): string {
		if (!this.label) return "";
		if (typeof this.label === "string") return this.label;
		return getInlineContentSource(this.label);
	}
}
