# What is Hashmark? 
Hashmark is a markup language. It's more structured than Markdown, but less verbose than XML. Here's what this README would look like in Hashmark:

```hashmark
#document Hashmark parser
	#section Installation
		#code bash
			npm install @hashmark/parser

	#section What is Hasmark?
		Hashmark is a markup language. It's more structured than Markdown, ...
```

The language is based on two main constructs: a `#` denotes a tag. Content indented under it is the body of that tag.

Hashmark also has a few more advanced syntactic features. These are largely driven by schemas, which [we talk about in more detail in the schemas documentation](./schemas.md). For now, just know that a schema defines which tags exist, where they can appear (i.e. can a `#section` appear inside of `#code`?). It also gives instructions for how to parse some of the more advanced features.

## Inline tags
Hashmark also has support for inline tags:

```hashmark
Here's a #url[https://www.example.com][link to my website]
```

To avoid being too verbose, Hashmark supports syntactic sugar for common inline tags, much like Markdown. If the schema defines bacticks (\`) as syntactic sugar for `#code`, the following two lines are equivalent:

```hashmark
Here's some #code[inline code]
Here's some `inline code`
```

## Default tags
Writing tags at the beginning of each line can be tedious:

```hashmark
Shopping list:
#list
	#item Apples
	#item Bananas
	#item Carrots
```

To help with this situation, Hashmark supports default tags. For instance, if the schema for `#list` defines `#item` as its default tag, then the above can equivalently be written as:

```hashmark
Shopping list:
#list
	Apples
	Bananas
	Carrots
```

If the schema defines the default for `#item` as `#item`, we can even write nested lists:

```hashmark
Shopping list:
#list
	Fruits
		Apples
		Bananas
	Vegetables
		Carrots
```

## Raw tags
Sometimes, we'd like to write things that shouldn't be parsed by the Hashmark parser. This is the case for code, for instance: the indentation and hashtags shouldn't be understood by the parser as Hashmark code:

```hashmark
#code python
	# This is a Python comment, not Hashmark markup!
	def test():
		print("hello world)
```

The schema allows us to define `#code` as a raw block, and then the above just works. This also works for inline tags: we can define `#code` as an inline tag taking a single raw argument:

```hashmark
The schema allows us to define #code[#code] as a raw block
```

We can combine this with sugar for inline tags:

```hashmark
The schema allows us to define `#code` as a raw block
```
