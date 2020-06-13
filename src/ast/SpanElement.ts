import { InlineContent, getInlineContentSource } from "./InlineContent";

export class SpanElement {
	constructor(readonly tag: string, readonly sugar: string | null = null, readonly args: InlineContent[] = []) {}

	addArg(): InlineContent {
		const args: InlineContent = [];
		this.args.push(args);
		return args;
	}

	get source(): string {
		if (this.sugar) return this.sugar + getInlineContentSource(this.args[0]) + this.sugar;
		return "#" + this.tag + this.args.map(arg => "[" + getInlineContentSource(arg) + "]");
	}
}
