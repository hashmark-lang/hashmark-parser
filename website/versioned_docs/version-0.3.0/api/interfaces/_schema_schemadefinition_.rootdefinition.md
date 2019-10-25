---
id: version-0.3.0-_schema_schemadefinition_.rootdefinition
title: RootDefinition
sidebar_label: RootDefinition
original_id: _schema_schemadefinition_.rootdefinition
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/SchemaDefinition"](../modules/_schema_schemadefinition_.md) › [RootDefinition](_schema_schemadefinition_.rootdefinition.md)

## Hierarchy

* [ParsedBlockDefinition](_schema_schemadefinition_.parsedblockdefinition.md)

  ↳ **RootDefinition**

## Index

### Properties

* [defaultTag](_schema_schemadefinition_.rootdefinition.md#optional-defaulttag)
* [props](_schema_schemadefinition_.rootdefinition.md#props)
* [rawBody](_schema_schemadefinition_.rootdefinition.md#rawbody)

## Properties

### `Optional` defaultTag

• **defaultTag**? : *undefined | string*

*Inherited from [ParsedBlockDefinition](_schema_schemadefinition_.parsedblockdefinition.md).[defaultTag](_schema_schemadefinition_.parsedblockdefinition.md#optional-defaulttag)*

*Defined in [schema/SchemaDefinition.ts:55](https://github.com/hashml/hashml/blob/6983021/src/schema/SchemaDefinition.ts#L55)*

In the body, if a line does not start with a tag, we can auto-insert the default tag.
If this is not set, we take it to mean that default tags are not permitted.

___

###  props

• **props**: *object*

*Overrides [ParsedBlockDefinition](_schema_schemadefinition_.parsedblockdefinition.md).[props](_schema_schemadefinition_.parsedblockdefinition.md#props)*

*Defined in [schema/SchemaDefinition.ts:28](https://github.com/hashml/hashml/blob/6983021/src/schema/SchemaDefinition.ts#L28)*

The props containing the tags at indentation level 0

#### Type declaration:

* **body**: *[BodyPropDefinitions](_schema_schemadefinition_.bodypropdefinitions.md)*

* **head**? : *undefined*

___

###  rawBody

• **rawBody**: *false*

*Inherited from [ParsedBlockDefinition](_schema_schemadefinition_.parsedblockdefinition.md).[rawBody](_schema_schemadefinition_.parsedblockdefinition.md#rawbody)*

*Defined in [schema/SchemaDefinition.ts:50](https://github.com/hashml/hashml/blob/6983021/src/schema/SchemaDefinition.ts#L50)*
