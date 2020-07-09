import { InlineContent } from "./InlineContent";

export class SpanElement {
	public error?: string;

	constructor(readonly tag: string, readonly sugar: string | null = null, readonly args: InlineContent[] = []) {}

	addArg(): InlineContent {
		const arg = new InlineContent();
		this.args.push(arg);
		return arg;
	}

	get source(): string {
		if (this.sugar) return this.sugar + this.args[0].source + this.sugar;
		return "#" + this.tag + this.args.map(arg => "[" + arg.source + "]").join("");
	}
}
