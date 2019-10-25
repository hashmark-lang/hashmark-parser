---
id: version-0.3.0-_schema_schemaschemainterface_
title: schema/schemaSchemaInterface
sidebar_label: schema/schemaSchemaInterface
original_id: _schema_schemaschemainterface_
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/schemaSchemaInterface"](_schema_schemaschemainterface_.md)

## Index

### Interfaces

* [ArgsBlock](../interfaces/_schema_schemaschemainterface_.argsblock.md)
* [BlockBlock](../interfaces/_schema_schemaschemainterface_.blockblock.md)
* [BodyBlock](../interfaces/_schema_schemaschemainterface_.bodyblock.md)
* [DateBlock](../interfaces/_schema_schemaschemainterface_.dateblock.md)
* [DefaultBlock](../interfaces/_schema_schemaschemainterface_.defaultblock.md)
* [EndBlock](../interfaces/_schema_schemaschemainterface_.endblock.md)
* [HashmlBlock](../interfaces/_schema_schemaschemainterface_.hashmlblock.md)
* [HeadBlock](../interfaces/_schema_schemaschemainterface_.headblock.md)
* [InlineBlock](../interfaces/_schema_schemaschemainterface_.inlineblock.md)
* [ItemBlock](../interfaces/_schema_schemaschemainterface_.itemblock.md)
* [OneBlock](../interfaces/_schema_schemaschemainterface_.oneblock.md)
* [OneOrMoreBlock](../interfaces/_schema_schemaschemainterface_.oneormoreblock.md)
* [OptionalBlock](../interfaces/_schema_schemaschemainterface_.optionalblock.md)
* [PropBlock](../interfaces/_schema_schemaschemainterface_.propblock.md)
* [Root](../interfaces/_schema_schemaschemainterface_.root.md)
* [RootBlock](../interfaces/_schema_schemaschemainterface_.rootblock.md)
* [SeparatorBlock](../interfaces/_schema_schemaschemainterface_.separatorblock.md)
* [StartBlock](../interfaces/_schema_schemaschemainterface_.startblock.md)
* [StringBlock](../interfaces/_schema_schemaschemainterface_.stringblock.md)
* [SugarBlock](../interfaces/_schema_schemaschemainterface_.sugarblock.md)
* [UrlBlock](../interfaces/_schema_schemaschemainterface_.urlblock.md)
* [ZeroOrMoreBlock](../interfaces/_schema_schemaschemainterface_.zeroormoreblock.md)

### Type aliases

* [Block](_schema_schemaschemainterface_.md#block)
* [Inline](_schema_schemaschemainterface_.md#inline)
* [Tag](_schema_schemaschemainterface_.md#tag)

### Functions

* [parseTyped](_schema_schemaschemainterface_.md#parsetyped)

### Object literals

* [schema](_schema_schemaschemainterface_.md#const-schema)

## Type aliases

###  Block

Ƭ **Block**: *[RootBlock](../interfaces/_schema_schemaschemainterface_.rootblock.md) | [BlockBlock](../interfaces/_schema_schemaschemainterface_.blockblock.md) | [DefaultBlock](../interfaces/_schema_schemaschemainterface_.defaultblock.md) | [HeadBlock](../interfaces/_schema_schemaschemainterface_.headblock.md) | [BodyBlock](../interfaces/_schema_schemaschemainterface_.bodyblock.md) | [PropBlock](../interfaces/_schema_schemaschemainterface_.propblock.md) | [OptionalBlock](../interfaces/_schema_schemaschemainterface_.optionalblock.md) | [OneBlock](../interfaces/_schema_schemaschemainterface_.oneblock.md) | [OneOrMoreBlock](../interfaces/_schema_schemaschemainterface_.oneormoreblock.md) | [ZeroOrMoreBlock](../interfaces/_schema_schemaschemainterface_.zeroormoreblock.md) | [InlineBlock](../interfaces/_schema_schemaschemainterface_.inlineblock.md) | [ArgsBlock](../interfaces/_schema_schemaschemainterface_.argsblock.md) | [HashmlBlock](../interfaces/_schema_schemaschemainterface_.hashmlblock.md) | [ItemBlock](../interfaces/_schema_schemaschemainterface_.itemblock.md) | [StringBlock](../interfaces/_schema_schemaschemainterface_.stringblock.md) | [DateBlock](../interfaces/_schema_schemaschemainterface_.dateblock.md) | [UrlBlock](../interfaces/_schema_schemaschemainterface_.urlblock.md) | [SugarBlock](../interfaces/_schema_schemaschemainterface_.sugarblock.md) | [StartBlock](../interfaces/_schema_schemaschemainterface_.startblock.md) | [SeparatorBlock](../interfaces/_schema_schemaschemainterface_.separatorblock.md) | [EndBlock](../interfaces/_schema_schemaschemainterface_.endblock.md)*

*Defined in [schema/schemaSchemaInterface.ts:4](https://github.com/hashml/hashml/blob/6983021/src/schema/schemaSchemaInterface.ts#L4)*

___

###  Inline

Ƭ **Inline**: *never*

*Defined in [schema/schemaSchemaInterface.ts:26](https://github.com/hashml/hashml/blob/6983021/src/schema/schemaSchemaInterface.ts#L26)*

___

###  Tag

Ƭ **Tag**: *[Block](_schema_schemaschemainterface_.md#block) | [Inline](_schema_schemaschemainterface_.md#inline)*

*Defined in [schema/schemaSchemaInterface.ts:3](https://github.com/hashml/hashml/blob/6983021/src/schema/schemaSchemaInterface.ts#L3)*

## Functions

###  parseTyped

▸ **parseTyped**(`file`: string): *[Root](../interfaces/_schema_schemaschemainterface_.root.md) | [HMError](../classes/_schema_errors_.hmerror.md)[]*

*Defined in [schema/schemaSchemaInterface.ts:511](https://github.com/hashml/hashml/blob/6983021/src/schema/schemaSchemaInterface.ts#L511)*

**Parameters:**

Name | Type |
------ | ------ |
`file` | string |

**Returns:** *[Root](../interfaces/_schema_schemaschemainterface_.root.md) | [HMError](../classes/_schema_errors_.hmerror.md)[]*

## Object literals

### `Const` schema

### ▪ **schema**: *object*

*Defined in [schema/schemaSchemaInterface.ts:149](https://github.com/hashml/hashml/blob/6983021/src/schema/schemaSchemaInterface.ts#L149)*

###  inline

• **inline**: *object*

*Defined in [schema/schemaSchemaInterface.ts:508](https://github.com/hashml/hashml/blob/6983021/src/schema/schemaSchemaInterface.ts#L508)*

#### Type declaration:

▪ **blocks**: *object*

*Defined in [schema/schemaSchemaInterface.ts:175](https://github.com/hashml/hashml/blob/6983021/src/schema/schemaSchemaInterface.ts#L175)*

* **args**: *object*

  * **rawBody**: *false* = false

  * **props**: *object*

    * **body**: *object*

      * **args**: *object*

        * **date**: *object*

          * **max**: *number* =  Infinity

          * **min**: *number* = 0

        * **hashml**: *object*

          * **max**: *number* =  Infinity

          * **min**: *number* = 0

        * **string**: *object*

          * **max**: *number* =  Infinity

          * **min**: *number* = 0

        * **url**: *object*

          * **max**: *number* =  Infinity

          * **min**: *number* = 0

* **block**: *object*

  * **rawBody**: *false* = false

  * **props**: *object*

    * **body**: *object*

      * **body**: *object*

        * **body**: *object*

          * **max**: *number* = 1

          * **min**: *number* = 0

      * **defaultTag**: *object*

        * **default**: *object*

          * **max**: *number* = 1

          * **min**: *number* = 0

      * **head**: *object*

        * **head**: *object*

          * **max**: *number* = 1

          * **min**: *number* = 0

    * **head**: *object*

      * **name**: *string* = "name"

      * **raw**: *true* = true

      * **type**: *"string"* = "string"

* **body**: *object*

  * **rawBody**: *false* = false

  * **props**: *object*

    * **body**: *object*

      * **props**: *object*

        * **prop**: *object*

          * **max**: *number* =  Infinity

          * **min**: *number* = 0

* **date**: *object*

  * **rawBody**: *false* = false

  * **props**: *object*

    * **head**: *object*

      * **name**: *string* = "propName"

      * **raw**: *true* = true

      * **type**: *"string"* = "string"

* **default**: *object*

  * **rawBody**: *false* = false

  * **props**: *object*

    * **head**: *object*

      * **name**: *string* = "name"

      * **raw**: *true* = true

      * **type**: *"string"* = "string"

* **end**: *object*

  * **rawBody**: *false* = false

  * **props**: *object*

    * **head**: *object*

      * **name**: *string* = "token"

      * **raw**: *true* = true

      * **type**: *"string"* = "string"

* **hashml**: *object*

  * **defaultTag**: *string* = "item"

  * **rawBody**: *false* = false

  * **props**: *object*

    * **body**: *object*

      * **content**: *object*

        * **item**: *object*

          * **max**: *number* =  Infinity

          * **min**: *number* = 0

    * **head**: *object*

      * **name**: *string* = "propName"

      * **raw**: *true* = true

      * **type**: *"string"* = "string"

* **head**: *object*

  * **rawBody**: *false* = false

  * **props**: *object*

    * **body**: *object*

      * **type**: *object*

        * **date**: *object*

          * **max**: *number* = 1

          * **min**: *number* = 0

        * **hashml**: *object*

          * **max**: *number* = 1

          * **min**: *number* = 0

        * **string**: *object*

          * **max**: *number* = 1

          * **min**: *number* = 0

        * **url**: *object*

          * **max**: *number* = 1

          * **min**: *number* = 0

* **inline**: *object*

  * **rawBody**: *false* = false

  * **props**: *object*

    * **body**: *object*

      * **args**: *object*

        * **args**: *object*

          * **max**: *number* = 1

          * **min**: *number* = 1

      * **sugar**: *object*

        * **sugar**: *object*

          * **max**: *number* = 1

          * **min**: *number* = 0

    * **head**: *object*

      * **name**: *string* = "name"

      * **raw**: *true* = true

      * **type**: *"string"* = "string"

* **item**: *object*

  * **rawBody**: *false* = false

  * **props**: *object*

    * **head**: *object*

      * **name**: *string* = "target"

      * **raw**: *true* = true

      * **type**: *"string"* = "string"

* **one**: *object*

  * **rawBody**: *false* = false

  * **props**: *object*

    * **head**: *object*

      * **name**: *string* = "target"

      * **raw**: *true* = true

      * **type**: *"string"* = "string"

* **oneOrMore**: *object*

  * **rawBody**: *false* = false

  * **props**: *object*

    * **head**: *object*

      * **name**: *string* = "target"

      * **raw**: *true* = true

      * **type**: *"string"* = "string"

* **optional**: *object*

  * **rawBody**: *false* = false

  * **props**: *object*

    * **head**: *object*

      * **name**: *string* = "target"

      * **raw**: *true* = true

      * **type**: *"string"* = "string"

* **prop**: *object*

  * **defaultTag**: *string* = "item"

  * **rawBody**: *false* = false

  * **props**: *object*

    * **body**: *object*

      * **content**: *object*

        * **one**: *object*

          * **max**: *number* =  Infinity

          * **min**: *number* = 0

        * **oneOrMore**: *object*

          * **max**: *number* =  Infinity

          * **min**: *number* = 0

        * **optional**: *object*

          * **max**: *number* =  Infinity

          * **min**: *number* = 0

        * **zeroOrMore**: *object*

          * **max**: *number* =  Infinity

          * **min**: *number* = 0

    * **head**: *object*

      * **name**: *string* = "name"

      * **raw**: *true* = true

      * **type**: *"string"* = "string"

* **root**: *object*

  * **rawBody**: *false* = false

  * **props**: *object*

    * **body**: *object*

      * **body**: *object*

        * **body**: *object*

          * **max**: *number* = 1

          * **min**: *number* = 1

      * **defaultTag**: *object*

        * **default**: *object*

          * **max**: *number* = 1

          * **min**: *number* = 0

* **separator**: *object*

  * **rawBody**: *false* = false

  * **props**: *object*

    * **head**: *object*

      * **name**: *string* = "token"

      * **raw**: *true* = true

      * **type**: *"string"* = "string"

* **start**: *object*

  * **rawBody**: *false* = false

  * **props**: *object*

    * **head**: *object*

      * **name**: *string* = "token"

      * **raw**: *true* = true

      * **type**: *"string"* = "string"

* **string**: *object*

  * **rawBody**: *false* = false

  * **props**: *object*

    * **head**: *object*

      * **name**: *string* = "propName"

      * **raw**: *true* = true

      * **type**: *"string"* = "string"

* **sugar**: *object*

  * **rawBody**: *false* = false

  * **props**: *object*

    * **body**: *object*

      * **end**: *object*

        * **end**: *object*

          * **max**: *number* = 1

          * **min**: *number* = 1

      * **separator**: *object*

        * **separator**: *object*

          * **max**: *number* = 1

          * **min**: *number* = 0

      * **start**: *object*

        * **start**: *object*

          * **max**: *number* = 1

          * **min**: *number* = 1

* **url**: *object*

  * **rawBody**: *false* = false

  * **props**: *object*

    * **head**: *object*

      * **name**: *string* = "propName"

      * **raw**: *true* = true

      * **type**: *"string"* = "string"

* **zeroOrMore**: *object*

  * **rawBody**: *false* = false

  * **props**: *object*

    * **head**: *object*

      * **name**: *string* = "target"

      * **raw**: *true* = true

      * **type**: *"string"* = "string"

▪ **root**: *object*

*Defined in [schema/schemaSchemaInterface.ts:150](https://github.com/hashml/hashml/blob/6983021/src/schema/schemaSchemaInterface.ts#L150)*

* **rawBody**: *false* = false

* **props**: *object*

  * **body**: *object*

    * **blocks**: *object*

      * **block**: *object*

        * **max**: *number* =  Infinity

        * **min**: *number* = 0

    * **inline**: *object*

      * **inline**: *object*

        * **max**: *number* =  Infinity

        * **min**: *number* = 0

    * **root**: *object*

      * **root**: *object*

        * **max**: *number* = 1

        * **min**: *number* = 1
