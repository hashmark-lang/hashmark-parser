---
id: what-is-hashml
title: What is HashML?
---

HashML is a markup language that stands out by a few core features:

-   **Structured documents**: indentation-based, so that you can visually see the structure of the document
-   **Lightweight syntax**: supports default tags and syntactic sugar so that you don't have to type too much
-   **Built-in support for schemas**: validates data before giving it to your application, and gives detailed error messages

Here is an example of a HashML document describing dinosaurs:

```hashml
#dinosaur Tyrannosaurus rex 🦖
    The #link[Tyrannosaurus rex][https://en.wikipedia.org/wiki/Tyrannosaurus] is a massive, meat-eating dinosaur.
	It lived in the Late Cretaceous epoch.

#dinosaur Sauropod 🦕
	The #link[sauropod][https://en.wikipedia.org/wiki/Sauropoda] is a massive, plant-eating dinosaur.
	It lived in the Late Triassic to the Late Cretaceous epoch.
```

## Comparison to XML

To understand the features of HashML, we can compare the above example to an equivalent XML document, which would look something like this:

```xml
<dinosaur>
	<name>Tyrannosaurus rex 🦖</name>
	<description>
		<paragraph>
            The <link><title>Tyrannosaurus rex</title><url>https://en.wikipedia.org/wiki/Tyrannosaurus</url></link>
            is a massive, meat-eating dinosaur.
        </paragraph>
		<paragraph>It lived in the Late Cretaceous epoch.</paragraph>
	</description>
</dinosaur>

<dinosaur>
	<name>Sauropod 🦕</name>
	<description>
		<paragraph>
            The <link><title>sauropod</title><url>https://en.wikipedia.org/wiki/Sauropoda</url></link>
            is a massive, plant-eating dinosaur.
        </paragraph>
		<paragraph>It lived in the Late Triassic to the Late Cretaceous epoch.</paragraph>
	</description>
</dinosaur>
```

Unlike XML, HashML does not need end tags &mdash; the end of a line is the end of the tag. Additionally, it can infer a default start tag from the schema: in this example, the `paragraph` tag doesn't need to be explicitly written in HashML.

Also note how the `paragraph` tags have been grouped under a `description` field in the above. The HashML schema can specify how to logically group tags under a single name. This feature is particularly convenient for applications that consume HashML.

## Parser output

The parser produces the following JSON:

```json
{
	"$tag": "root",
	"dinosaurs": [
		{
			"$tag": "dinosaur",
			"name": "Tyrannosaurus rex 🦖",
			"description": [
				{
					"$tag": "paragraph",
					"text": [
						"The ",
						{
							"$tag": "link",
							"title": "Tyrannosaurus rex",
							"url": "https://en.wikipedia.org/wiki/Tyrannosaurus"
						},
						" is a massive, meat-eating dinosaur."
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
			"name": "Sauropod 🦕",
			"description": ...
		}
	]
}
```
