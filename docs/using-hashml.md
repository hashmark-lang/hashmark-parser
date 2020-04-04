---
id: using-hashml
title: Using HashML
sidebar_label: Using HashML
---

_Note that HashML is still in version 0.y.z, and is still experimental._

## Installation

HashML requires at least Node 12. You can check your Node version by running:

```console
$ node -v
```

You can install HashML using [npm](https://www.npmjs.com/) by running:

```console
$ npm install @hashml/hashml
```

## Loading a schema file

<!--DOCUSAURUS_CODE_TABS-->
<!--TypeScript-->

```ts
import { Schema } from "@hashml/hashml";

const schema = new Schema(file);
```

<!--JavaScript-->

```js
const { Schema } = require("@hashml/hashml");

const schema = new Schema(file);
```

<!--END_DOCUSAURUS_CODE_TABS-->
