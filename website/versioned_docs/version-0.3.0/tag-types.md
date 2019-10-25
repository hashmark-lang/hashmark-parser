---
title: HashML tag types
id: version-0.3.0-tag-types
sidebar_label: Tag types
original_id: tag-types
---

## Block tags
Each line of HashML has a tag. In the following, the first line is tagged as a `#list`; the following lines are tagged as `#item`:

```hashml
#list Shopping list
	#item Apples
	#item Bananas
	#item Carrots
```



## Inline tags
HashML also has support for inline tags. The arguments of an inline tag are given in square brackets:

```hashml
Here's a #url[https://www.example.com][link to my website]!
```

To avoid being too verbose, HashML supports syntactic sugar for common inline tags, much like Markdown. If the schema defines bacticks as syntactic sugar for `#code`, the following two lines are equivalent:

```hashml
Here's some #code[inline code]
Here's some `inline code`
```

## Default tags
Writing tags at the beginning of each line can be tedious:

```hashml
#list
	#item Apples
	#item Bananas
	#item Carrots
```

To help with this situation, HashML supports default tags. For instance, if the schema for `#list` defines `#item` as its default tag, then the above can equivalently be written as:

```hashml
#list
	Apples
	Bananas
	Carrots
```

If the schema defines the default for `#item` as `#item`, we can even write nested lists:

```hashml
#list
	Fruits
		Apples
		Bananas
	Vegetables
		Carrots
```

## Raw tags
Sometimes, we'd like to write things that shouldn't be parsed by the HashML parser. This is the case for code, for instance: the indentation and hashtags shouldn't be understood by the parser as HashML code:

```hashml
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
