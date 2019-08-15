# Hashml parser
[![npm version](https://badge.fury.io/js/%40hashml%2Fhashml.svg)](https://www.npmjs.com/package/@hashml/hashml)
[![Build Status](https://travis-ci.org/hashml/hashml.svg?branch=master)](https://travis-ci.org/hashml/hashml)
[![Coverage Status](https://coveralls.io/repos/github/hashml/hashml/badge.svg?branch=master)](https://coveralls.io/github/hashml/hashml?branch=master)

## Installation
```
npm install @hashml/hashml
```

## What is Hashml?
Hashml is a markup language. It's more structured than Markdown, but less verbose than XML. Here's what this README would look like in Hashml:

```
#document Hashml parser
	#section Installation
		#code bash
			npm install @hashml/hashml

	#section What is Hashml?
		Hashml is a markup language. It's more structured than Markdown, ...
```

You can read more about the Hashml language [in the docs](docs/README.md).

## Usage
To parse a Hashml document from a Typescript program:

```typescript
import { parse, ParsedSchema } from "@hashml/hashml";

const file = "#tag example";
const schemaFile = "#block tag"
const schemaSchemaFile = "#block block";

// Parse with a schema:
const schemaSchema = new ParsedSchema(parse(schemaSchemaFile));
const schema = new ParsedSchema(parse(schemaFile, schemaSchema));
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
import { toXML, toJSON} from "@hashml/hashml";
const xml: string = toXML(doc);
const json: string = toJSON(doc);
```

## CLI
See the [@hashml/cli](https://www.npmjs.com/package/@hashml/cli) package.
