# Hashmark parser
[![npm version](https://badge.fury.io/js/%40hashmark%2Fparser.svg)](https://www.npmjs.com/package/@hashmark/parser)
[![Build Status](https://travis-ci.org/hashmark-lang/hashmark-parser.svg?branch=master)](https://travis-ci.org/hashmark-lang/hashmark-parser)
[![Coverage Status](https://coveralls.io/repos/github/hashmark-lang/hashmark-parser/badge.svg?branch=master)](https://coveralls.io/github/hashmark-lang/hashmark-parser?branch=master)

## Installation
```
npm install @hashmark/parser
```

## What is Hashmark?
Hashmark is a markup language. It's more structured than Markdown, but less verbose than XML. Here's what this README would look like in Hashmark:

```hashmark
#document Hashmark parser
	#section Installation
		#code bash
			npm install @hashmark/parser

	#section What is Hasmark?
		Hashmark is a markup language. It's more structured than Markdown, ...
```

You can read more about the Hashmark language [in the docs](docs/what-is-hashmark.md).

## Usage
To parse a Hashmark document, 

```typescript
import { parse, ParsedSchema } from "@hashmark/parser";

const file = "#tag example";
const schemaFile = "#block tag"
const schemaSchemaFile = "#block block";

// Parse with a schema:
const schemaSchema = new ParsedSchema(parse(schemaSchemaFile));
const schema = new ParsedSchema(parse(schemaFile, schemaSchemaFile));
const doc = parse(file, schema)

// ... or parse without a schema:
const noSchemaDoc = parse(file)
```

Parsing with a schema allows you to define syntactic sugar in the schema, like default elements and inline syntactic sugar.

To validate the document using the schema, use the `validateBlock` method on the schema. This returns an array of validation errors. If there are no errors, it will return an empty array.

```typescript
const errors = schema.validateBlock(doc);
```

To export the document to JSON or XML:

```typescript
import { toXML, toJSON} from "@hashmark/parser";
const xml: string = toXML(doc);
const json: string = toJSON(doc);
```

## CLI
See the [@hashmark/cli](https://www.npmjs.com/package/@hashmark/cli) package.
