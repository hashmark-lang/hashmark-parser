import { Block, Inline, Line } from "./parse";

export function toXML(root: Block): string {
	return xmlTag(
		removeHashtag(root.tag),
		xmlTag("head", lineToXML(root.head)),
		xmlTag("children", ...root.children.map(toXML))
	);
}

function inlineToXML(inline: Inline): string {
	return xmlTagWithAttrs(
		removeHashtag(inline.tag),
		{ closed: inline.closed },
		xmlTag("arguments", ...inline.arguments.map(lineToXML))
	);
}

function lineToXML(line: Line): string {
	return line.map(value => (typeof value === "string" ? value : inlineToXML(value))).join("");
}

function removeHashtag(tag: string): string {
	return tag.replace("#", "");
}

function xmlTag(name: string, ...children: string[]): string {
	return xmlTagWithAttrs(name, {}, ...children);
}

function xmlTagWithAttrs(
	name: string,
	attributes: { [attr: string]: any } = {},
	...children: string[]
): string {
	const attrs = Object.entries(attributes)
		.map(([attr, value]) => ` ${attr}="${value}"`)
		.join("");
	if (children.length === 0) {
		return `<${name}${attrs}/>`;
	} else {
		return `<${name}${attrs}>\n${indent(children)}\n</${name}>`;
	}
}

function indent(lines: string[]): string {
	return lines.flatMap(line => line.split("\n").map(l => "\t" + l)).join("\n");
}
