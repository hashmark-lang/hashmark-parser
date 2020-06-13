import { BlockElement } from "../ast/BlockElement";
import { SpanElement } from "../ast/SpanElement";
import { InlineContent } from "../ast/InlineContent";

export class ErrorsMap {
	readonly tagErrors: WeakMap<BlockElement | SpanElement, string> = new WeakMap();
	readonly labelErrors: WeakMap<BlockElement, string> = new WeakMap();
	readonly argErrors: WeakMap<InlineContent, string> = new WeakMap();
}
