---
id: version-0.3.0-_schema_schema_.argschema
title: ArgSchema
sidebar_label: ArgSchema
original_id: _schema_schema_.argschema
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/Schema"](../modules/_schema_schema_.md) › [ArgSchema](_schema_schema_.argschema.md)

## Hierarchy

* **ArgSchema**

## Index

### Constructors

* [constructor](_schema_schema_.argschema.md#constructor)

### Properties

* [name](_schema_schema_.argschema.md#name)
* [parentTag](_schema_schema_.argschema.md#parenttag)
* [raw](_schema_schema_.argschema.md#raw)
* [type](_schema_schema_.argschema.md#type)
* [validChildren](_schema_schema_.argschema.md#validchildren)

## Constructors

###  constructor

\+ **new ArgSchema**(`parentTag`: string, `schema`: [ArgDefinition](../modules/_schema_schemadefinition_.md#argdefinition)): *[ArgSchema](_schema_schema_.argschema.md)*

*Defined in [schema/Schema.ts:143](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L143)*

**Parameters:**

Name | Type |
------ | ------ |
`parentTag` | string |
`schema` | [ArgDefinition](../modules/_schema_schemadefinition_.md#argdefinition) |

**Returns:** *[ArgSchema](_schema_schema_.argschema.md)*

## Properties

###  name

• **name**: *string*

*Defined in [schema/Schema.ts:137](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L137)*

Name of the argument

___

###  parentTag

• **parentTag**: *string*

*Defined in [schema/Schema.ts:145](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L145)*

___

###  raw

• **raw**: *boolean*

*Defined in [schema/Schema.ts:141](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L141)*

If `true`, the schema tells us that the argument should be not parsed as Hashml.

___

###  type

• **type**: *"parsed" | "string" | "url" | "date"*

*Defined in [schema/Schema.ts:139](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L139)*

How the arg should be represented in the IR

___

###  validChildren

• **validChildren**: *ReadonlySet‹string›*

*Defined in [schema/Schema.ts:143](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L143)*

Set of tags allowed in this argument
