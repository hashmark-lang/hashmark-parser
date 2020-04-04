# HashML

[![npm version](https://badge.fury.io/js/%40hashml%2Fhashml.svg)](https://www.npmjs.com/package/@hashml/hashml)
[![Build Status](https://travis-ci.org/hashml/hashml.svg?branch=master)](https://travis-ci.org/hashml/hashml)
[![Coverage Status](https://coveralls.io/repos/github/hashml/hashml/badge.svg?branch=master)](https://coveralls.io/github/hashml/hashml?branch=master)

HashML is a lightweight XML-like markup language, with built-in schema validation.

## Installation

You can install HashML using [npm](https://www.npmjs.com/) by running

```bash
npm install @hashml/hashml
```

## Example

Here is an example of a HashML document describing dinosaurs:

```
#dinosaur Tyrannosaurus rex
	#emoji 🦖
	A #link[Tyrannosaurus rex][https://en.wikipedia.org/wiki/Tyrannosaurus], a massive, meat-eating dinosaur with huge jaws, tiny arms, and a long tail.
	It lived in the Late Cretaceous epoch.

#dinosaur Sauropod
	#emoji 🦕
	A #link[sauropod][https://en.wikipedia.org/wiki/Sauropoda], a massive, plant-eating dinosaur with a long neck and nail.
	It lived in the Late Triassic to the Late Cretaceous epoch.
```

As a comparison, the equivalent XML would look like this:

```xml
<dinosaur>
	<name>Tyrannosaurus rex</name>
	<emoji>🦖</emoji>
	<description>
		<paragraph>A <link><title>Tyrannosaurus rex</title><url>https://en.wikipedia.org/wiki/Tyrannosaurus</url></link>, a massive, meat-eating dinosaur with huge jaws, tiny arms, and a long tail.</paragraph>
		<paragraph>It lived in the Late Cretaceous epoch.</paragraph>
	</description>
</dinosaur>

<dinosaur>
	<name>Sauropod</name>
	<emoji>🦕</emoji>
	<description>
		<paragraph>A <link><title>sauropod</title><url>https://en.wikipedia.org/wiki/Sauropoda</url></link>, a massive, plant-eating dinosaur with a long neck and nail.</paragraph>
		<paragraph>It lived in the Late Triassic to the Late Cretaceous epoch.</paragraph>
	</description>
</dinosaur>
```

The parser produces the following JSON:

```json
{
    "$tag": "root",
    "dinosaurs": [
        {
            "$tag": "dinosaur",
            "name": "Tyrannosaurus rex",
            "meta": {
                "$tag": "emoji",
                "value": "🦖"
            },
            "description": [
                {
                    "$tag": "paragraph",
                    "text": [
                        "A ",
                        {
                            "$tag": "link",
                            "title": "Tyrannosaurus rex",
                            "url": "https://en.wikipedia.org/wiki/Tyrannosaurus"
                        },
                        ", a massive, meat-eating dinosaur with huge jaws, tiny arms, and a long tail."
                    ]
                },
                {
                    "$tag": "paragraph",
                    "text": ["It lived in the Late Cretaceous epoch."]
                }
            ]
        },
        {
            "$tag": "dinosaur",
            "name": "Sauropod",
            ...
        }
    ]
}
```

HashML documents are parsed with a schema. The schema for the dinosaur descriptions would look like this:

```
#root
	#body
		#prop dinosaurs
			#oneOrMore dinosaur

#block dinosaur
	#default paragraph

	#head
		#string name

	#body
		#prop meta
			#optional emoji

		#prop description
			#zeroOrMore paragraph

#block emoji
	#head
		#string value

#block paragraph
	#head
		#hashml
			link

#inline link
	#args
		#string title
		#url url
```

You can read more about the HashML schemas in the docs.

## Usage

### Compiling a schema to TypeScript

Use the CLI!

### Parsing HashML files

To parse a HashML document from a Typescript program:

```typescript
import { parse, ParsedSchema } from "@hashml/hashml";

const file = "#tag example";
const schemaFile = "#block tag";
const schemaSchemaFile = "#block block";

// Parse with a schema:
const schemaSchema = new ParsedSchema(parse(schemaSchemaFile));
const schema = new ParsedSchema(parse(schemaFile, schemaSchema));
const doc = parse(file, schema);

// ... or parse without a schema:
const noSchemaDoc = parse(file);
```

Parsing with a schema allows you to define syntactic sugar in the schema, like default elements and inline syntactic sugar.

To validate the document using the schema, use the `validateBlock` method on the schema. This returns an array of validation errors. If there are no errors, it will return an empty array.

```typescript
const errors = schema.validateBlock(doc);
```

To export the document to JSON or XML:

```typescript
import { toXML, toJSON } from "@hashml/hashml";
const xml: string = toXML(doc);
const json: string = toJSON(doc);
```

## CLI

See the [@hashml/cli](https://www.npmjs.com/package/@hashml/cli) package.
