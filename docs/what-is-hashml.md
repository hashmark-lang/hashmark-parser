# What is Hashml? 
Hashml is a markup language. It's more structured than Markdown, but less verbose than XML. Here's what this README would look like in Hashml:

```
#document Hashml parser
	#section Installation
		#code bash
			npm install @hashml/parser

	#section What is Hasmark?
		Hashml is a markup language. It's more structured than Markdown, ...
```

The language is based on two main constructs: a `#` denotes a tag. Content indented under it is the body of that tag.

Hashml also has a few more advanced syntactic features. These are largely driven by schemas, which [we talk about in more detail in the schemas documentation](./schemas.md). For now, just know that a schema defines which tags exist, where they can appear (i.e. can a `#section` appear inside of `#code`?). It also gives instructions for how to parse some of the more advanced features.

## Inline tags
Hashml also has support for inline tags:

```
Here's a #url[https://www.example.com][link to my website]
```

To avoid being too verbose, Hashml supports syntactic sugar for common inline tags, much like Markdown. If the schema defines bacticks (\`) as syntactic sugar for `#code`, the following two lines are equivalent:

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

To help with this situation, Hashml supports default tags. For instance, if the schema for `#list` defines `#item` as its default tag, then the above can equivalently be written as:

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
Sometimes, we'd like to write things that shouldn't be parsed by the Hashml parser. This is the case for code, for instance: the indentation and hashtags shouldn't be understood by the parser as Hashml code:

```
#code python
	# This is a Python comment, not Hashml markup!
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
