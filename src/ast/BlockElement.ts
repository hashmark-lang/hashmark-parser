import { InlineContent } from "./InlineContent";
import { parseInline } from "../parser/parseInline";

export class BlockElement {
	public tagError?: string;
	public labelError?: string;
	private _parsedLabel?: InlineContent;

	constructor(
		readonly tag?: string,
		readonly label?: string,
		readonly lineDelta: number = 0,
		readonly children: BlockElement[] = []
	) {}

	toJSON() {
		return { tag: this.tag, label: this.label, lineDelta: this.lineDelta, children: this.children };
	}

	get(tag: string | undefined) {
		return this.children.find(el => el.tag === tag);
	}

	getAll(tag: string | undefined) {
		return this.children.filter(el => el.tag === tag);
	}

	get parsedLabel(): InlineContent {
		if (!this._parsedLabel) this._parsedLabel = parseInline(this.label || "");
		return this._parsedLabel;
	}

	get source(): string {
		return this.tagSource + this.labelSource;
	}

	get tagSource(): string {
		return this.tag ? "#" + this.tag + " " : "";
	}

	get labelSource(): string {
		return this.label || "";
	}
}
