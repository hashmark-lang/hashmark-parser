---
id: version-0.3.0-what-is-hashml
title: What is HashML?
sidebar_label: What is HashML?
original_id: what-is-hashml
---

HashML is an XML-like markup language, that stands out by a few core features:

- Its syntax is more lightweight
- It has built-in support for schemas

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
