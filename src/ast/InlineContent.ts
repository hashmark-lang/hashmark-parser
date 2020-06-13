import { SpanElement } from "./SpanElement";

export type InlineContent = Array<string | SpanElement>;

export function getInlineContentSource(content: InlineContent) {
	return content.map(el => (typeof el === "string" ? el : el.source)).join("");
}
