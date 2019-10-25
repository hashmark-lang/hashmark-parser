---
id: schemas
title: HashML Schemas
sidebar_label: HashML Schemas
---

HashML places a lot of importance on schemas. A schema describes the supported tags, and places constraints on where they can appear. HashML schemas are written in HashML. The supported tags are described by the schema schema, which is available in [`src/schema-schema.hm`](../src/schema-schema.hm).

## Example
A schema looks like this:

```
#block root
	#content 
		#one document 

#block document
	#default paragraph
	#content
		#zeroOrMore section
		#zeroOrMore paragraph

#block section
	#default paragraph
	#content
		#zeroOrMore paragraph

#block paragraph
	#head
		#zeroOrMore code

#inline code
	#sugar
		#start `
		#end `
	#arg
		#raw
```

The first block describes the root (a reserved name indicating the top-level of the document), which must contain exactly one `#document`. The document can contain any number of `#section` and `#paragraph`. The schema also says that if omitted, the default tag inside of a `#document` should be paragraph.

Schemas use `#zeroOrMore` as the [default tag](./what-is-hashml.md#default-tags) for `#content`, so we could rewrite the `#block document` as:

```
#block document
	#default paragraph
	#content
		section
		paragraph
```

Schemas can also define the [syntactic sugar for inline tags](./what-is-hashml.md#inline-tags). The above defines backticks (\`) as the sugar for `#code`. You could also write your own schema in which `&hello&` means `#uppercase[hello]`, for instance.

## Schema validation
HashML documents can be validated by the schema. This means that you can check whether a document respects the tag descriptions in the schema, and whether the restrictions imposed by the `#content` field of blocks is respected.

Since schemas are themselves HashML documents, there is a schema schema that can validate schemas. The schema schema also validates itself, as it is also a valid schema. This is very useful when writing schemas, and can help you catch all sorts of errors.

Schema validation gives a list of errors, and can tell you exactly why a document isn't compliant with the schema.
