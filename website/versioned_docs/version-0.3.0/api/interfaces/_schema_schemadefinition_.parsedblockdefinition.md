---
id: version-0.3.0-_schema_schemadefinition_.parsedblockdefinition
title: ParsedBlockDefinition
sidebar_label: ParsedBlockDefinition
original_id: _schema_schemadefinition_.parsedblockdefinition
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/SchemaDefinition"](../modules/_schema_schemadefinition_.md) › [ParsedBlockDefinition](_schema_schemadefinition_.parsedblockdefinition.md)

A raw block is one whose body is parsed as Hashml

## Hierarchy

* **ParsedBlockDefinition**

  ↳ [RootDefinition](_schema_schemadefinition_.rootdefinition.md)

## Index

### Properties

* [defaultTag](_schema_schemadefinition_.parsedblockdefinition.md#optional-defaulttag)
* [props](_schema_schemadefinition_.parsedblockdefinition.md#props)
* [rawBody](_schema_schemadefinition_.parsedblockdefinition.md#rawbody)

## Properties

### `Optional` defaultTag

• **defaultTag**? : *undefined | string*

*Defined in [schema/SchemaDefinition.ts:55](https://github.com/hashml/hashml/blob/6983021/src/schema/SchemaDefinition.ts#L55)*

In the body, if a line does not start with a tag, we can auto-insert the default tag.
If this is not set, we take it to mean that default tags are not permitted.

___

###  props

• **props**: *object*

*Defined in [schema/SchemaDefinition.ts:57](https://github.com/hashml/hashml/blob/6983021/src/schema/SchemaDefinition.ts#L57)*

Defines the props that will be available on the IR

#### Type declaration:

* **body**? : *[BodyPropDefinitions](_schema_schemadefinition_.bodypropdefinitions.md)*

* **head**? : *[ArgDefinition](../modules/_schema_schemadefinition_.md#argdefinition)*

___

###  rawBody

• **rawBody**: *false*

*Defined in [schema/SchemaDefinition.ts:50](https://github.com/hashml/hashml/blob/6983021/src/schema/SchemaDefinition.ts#L50)*
