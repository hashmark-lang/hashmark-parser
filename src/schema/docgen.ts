import * as fs from "fs";
import { join } from "path";
import {
	BlockPropDefinition,
	BlockSchemaDefinition,
	InlineSchemaDefinition,
	RawBlockPropDefinition,
	ROOT,
	SchemaDefinition
} from "./SchemaDefinition";

export async function generateDocs(schema: SchemaDefinition, destFolder: string): Promise<void[]> {
	const blocks = Object.entries(schema.blocks).map(([name, blockSchema]) => {
		const page = generateBlockSchemaPage(name, blockSchema);
		const fileName = name === ROOT ? "index.html" : `${name}-block.html`;
		return writeFile(page, destFolder, fileName);
	});

	const inlines = Object.entries(schema.inline).map(([name, inlineSchema]) => {
		const page = generateInlineSchemaPage(name, inlineSchema);
		return writeFile(page, destFolder, name + "-inline.html");
	});

	return Promise.all([...blocks, ...inlines]);
}

async function writeFile(content: string, targetDir: string, fileName: string): Promise<void> {
	await fs.promises.mkdir(targetDir, { recursive: true });
	await fs.promises.writeFile(join(targetDir, fileName), content);
}

function generateBlockSchemaPage(name: string, schema: BlockSchemaDefinition): string {
	const tagName = name === ROOT ? "Root" : "#" + name;
	return `
        <html>
            <head>
                <title>Schema for ${tagName}</title>
            <body>
                <h1>${tagName}</h1>
                <p>Block tag</p>
                <h2>Default tag</h2>
                ${schema.defaultTag ? link("block", schema.defaultTag) : "None"}
                <h2>Head</h2>
                ${
					schema.head
						? "<h3>Prop</h3>" +
						  `<p>${schema.head.name}</p>` +
						  (schema.head.raw
								? "<p>Raw</p>"
								: schema.head.content
										.map(
											content =>
												`<p>Zero or more ${link("inline", content.tag)}</p>`
										)
										.join(""))
						: "None"
				}
                <h2>Props</h2>
                ${
					isRawBlockProp(schema.props)
						? `<h3>${schema.props[0].name}</h3>Raw body`
						: schema.props.map(generateBlockProp)
				}
            </body>
        </html>
    `;
}

function generateBlockProp(schema: BlockPropDefinition): string {
	return `
        <h3>${schema.name}</h3>
        ${
			schema.raw
				? "Raw"
				: "Can contain: " +
				  list(
						schema.content.map(
							({ tag, cardinality }) => cardinality + " " + link("block", tag)
						)
				  )
		}
    `;
}

function generateInlineSchemaPage(name: string, schema: InlineSchemaDefinition): string {
	const argLength = schema.props.length;
	const plural = (word: string) => word + (argLength > 1 ? "s" : "");
	return `
        <html>
            <head>
                <title>Schema for #${name}</title>
            <body>
                <h1>#${name}</h1>
                <p>Inline tag with ${argLength} ${plural("argument")}</p>
                <h2>Props</h2>
                ${schema.props
					.map(
						prop =>
							`<h3>${prop.name}</h3>
                            ${
								prop.raw
									? "Raw"
									: "Parsed. Can contain:" +
									  list(
											prop.content.map(
												_ => "Zero or more " + link("inline", _.tag)
											)
									  )
							}`
					)
					.join("")}
            </body>
        </html>
    `;
}

function link(type: string, tag: string): string {
	return `<a href="${tag}-${type}.html">#${tag}</a>`;
}

function list(items: string[]): string {
	return `<ul>${items.map(item => `<li>${item}</li>`).join("")}</ul>`;
}

function isRawBlockProp(
	prop: [RawBlockPropDefinition] | BlockPropDefinition[]
): prop is [RawBlockPropDefinition] {
	return prop.length === 1 && Boolean(prop[0].raw);
}
