import { BlockElement, InlineElement, InlineGroup } from "./ast";

export function toXML(root: BlockElement): string {
	const children = root.children.map(toXML);
	if (root.head.length > 0) {
		children.unshift(xmlTag("head", true, lineToXML(root.head)));
	}
	return xmlTag(root.tag, false, ...children);
}

function inlineToXML(inline: InlineElement): string {
	const singleArg = inline.arguments.length <= 1;
	const args = singleArg
		? inline.arguments.flatMap(lineToXML) // No <arg> for single inline arg
		: inline.arguments.map(arg => xmlTag("arg", true, lineToXML(arg))); // <arg> for multiple args
	return xmlTag(inline.tag, singleArg, ...args);
}

function lineToXML(line: InlineGroup): string {
	return line
		.map(value => (typeof value === "string" ? escapeXML(value) : inlineToXML(value)))
		.join("");
}

function xmlTag(name: string, inline: boolean, ...children: string[]): string {
	if (children.length === 0) {
		return `<${name}/>`;
	} else {
		const content = inline ? children : "\n" + indent(children) + "\n";
		return `<${name}>${content}</${name}>`;
	}
}

function escapeXML(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

function indent(lines: string[]): string {
	return lines.flatMap(line => line.split("\n").map(l => "\t" + l)).join("\n");
}
