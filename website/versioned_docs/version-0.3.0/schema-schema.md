---
id: version-0.3.0-schema-schemas
title: HashML Schema Schema
sidebar_label: Schema schema
original_id: schema-schemas
---

HashML schemas are themselves written in HashML. Seeing that a schema file is simply a HashML document, we can write a schema for schema files. We call this the **schema schema**: it's a schema for defining schemas.

The schema schema defines the HashML Schema Language, an application of HashML. It defines the HashML tags that can be used to define a schema, and some rules on how these tags should be used.

The schema schema is self-referential: it describes the schema language, and is itself a valid schema. This means that the schema schema can always be parsed with itself.
