---
title: Generating TypeScript interfaces
id: generating-typescript
---

One of the benefits of having written a schema is data validation. HashML checks whether a document matches a given specification so that other modules can rely on this check having taken place. Therefore, it makes sense to have strong typings for valid documents.

HashML can generate the TypeScript interfaces corresponding to a valid document. To convert a schema to TypeScript interfaces, you can use the `convertSchemaToTypescript` function:

```ts
import { convertSchemaToTypescript, Schema } from "@hashml/hashml";

const schema = new Schema(schemaDefinition);
const ts: string = convertSchemaToTypescript(schema);
```

If you would like to incorporate this conversion in your build process, you should use the [CLI](https://github.com/hashml/hashml-cli).
