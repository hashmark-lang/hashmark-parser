import { SpanElement } from "./SpanElement";

export class InlineContent {
	public error?: string;

	constructor(readonly content: Array<string | SpanElement> = []) {}

	get(tag: string | undefined) {
		return this.content.find(el => typeof el === "object" && el.tag === tag) as SpanElement | undefined;
	}

	getAll(tag: string | undefined) {
		return this.content.filter(el => typeof el === "object" && el.tag === tag) as SpanElement[];
	}

	get source() {
		return this.content.map(el => (typeof el === "string" ? el : el.source)).join("");
	}
}
