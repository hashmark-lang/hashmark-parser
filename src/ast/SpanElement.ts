import { InlineContent } from "./InlineContent";

export class SpanElement {
	constructor(
		readonly tag: string,
		readonly startColumn: number = 0,
		readonly endColumn: number = 0,
		readonly args: InlineContent[] = []
	) {}

	addArg(): InlineContent {
		const args: InlineContent = [];
		this.args.push(args);
		return args;
	}
}
