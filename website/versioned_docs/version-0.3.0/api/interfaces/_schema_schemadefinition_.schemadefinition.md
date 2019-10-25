---
id: version-0.3.0-_schema_schemadefinition_.schemadefinition
title: SchemaDefinition
sidebar_label: SchemaDefinition
original_id: _schema_schemadefinition_.schemadefinition
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/SchemaDefinition"](../modules/_schema_schemadefinition_.md) › [SchemaDefinition](_schema_schemadefinition_.schemadefinition.md)

## Hierarchy

* **SchemaDefinition**

## Index

### Properties

* [blocks](_schema_schemadefinition_.schemadefinition.md#blocks)
* [inline](_schema_schemadefinition_.schemadefinition.md#inline)
* [root](_schema_schemadefinition_.schemadefinition.md#root)

## Properties

###  blocks

• **blocks**: *object*

*Defined in [schema/SchemaDefinition.ts:11](https://github.com/hashml/hashml/blob/6983021/src/schema/SchemaDefinition.ts#L11)*

Defines all block tags

#### Type declaration:

* \[ **tagName**: *string*\]: [BlockDefinition](../modules/_schema_schemadefinition_.md#blockdefinition)

___

###  inline

• **inline**: *object*

*Defined in [schema/SchemaDefinition.ts:15](https://github.com/hashml/hashml/blob/6983021/src/schema/SchemaDefinition.ts#L15)*

Defines all inline tags

#### Type declaration:

* \[ **tagName**: *string*\]: [InlineDefinition](_schema_schemadefinition_.inlinedefinition.md)

___

###  root

• **root**: *[RootDefinition](_schema_schemadefinition_.rootdefinition.md)*

*Defined in [schema/SchemaDefinition.ts:9](https://github.com/hashml/hashml/blob/6983021/src/schema/SchemaDefinition.ts#L9)*

Defines the blocks allowed at the root of the document
