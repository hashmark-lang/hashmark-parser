---
id: what-is-hashml
title: What is HashML? 
sidebar_label: What is HashML?
---

HashML is a markup language. It's more structured than Markdown, but less verbose than XML. Here's what this document would look like in HashML:

```
#document What is HashML?
	HashML is a markup language. It's more structured than Markdown, ...

	#code hashml
		#document What is HashML?
			...
```

The language is based on two main constructs: a `#` denotes a tag. Content indented under it is the body of that tag.

HashML also has a few more advanced syntactic features. These are largely driven by schemas, which [we talk about in more detail in the schemas documentation](./schemas.md). For now, just know that a schema defines which tags exist, where they can appear (i.e. can a `#section` appear inside of `#code`?). It also gives instructions for how to parse some of the more advanced features.

## Inline tags
HashML also has support for inline tags:

```
Here's a #url[https://www.example.com][link to my website]
```

To avoid being too verbose, HashML supports syntactic sugar for common inline tags, much like Markdown. If the schema defines bacticks (\`) as syntactic sugar for `#code`, the following two lines are equivalent:

```
Here's some #code[inline code]
Here's some `inline code`
```

## Default tags
Writing tags at the beginning of each line can be tedious:

```
Shopping list:
#list
	#item Apples
	#item Bananas
	#item Carrots
```

To help with this situation, HashML supports default tags. For instance, if the schema for `#list` defines `#item` as its default tag, then the above can equivalently be written as:

```
Shopping list:
#list
	Apples
	Bananas
	Carrots
```

If the schema defines the default for `#item` as `#item`, we can even write nested lists:

```
Shopping list:
#list
	Fruits
		Apples
		Bananas
	Vegetables
		Carrots
```

## Raw tags
Sometimes, we'd like to write things that shouldn't be parsed by the HashML parser. This is the case for code, for instance: the indentation and hashtags shouldn't be understood by the parser as HashML code:

```
#code python
	# This is a Python comment, not HashML markup!
	def test():
		print("hello world)
```

The schema allows us to define `#code` as a raw block, and then the above just works. This also works for inline tags: we can define `#code` as an inline tag taking a single raw argument:

```
The schema allows us to define #code[#code] as a raw block
```

We can combine this with sugar for inline tags:

```
The schema allows us to define `#code` as a raw block
```
