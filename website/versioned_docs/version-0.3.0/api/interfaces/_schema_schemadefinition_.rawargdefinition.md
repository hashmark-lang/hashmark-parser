---
id: version-0.3.0-_schema_schemadefinition_.rawargdefinition
title: RawArgDefinition
sidebar_label: RawArgDefinition
original_id: _schema_schemadefinition_.rawargdefinition
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/SchemaDefinition"](../modules/_schema_schemadefinition_.md) › [RawArgDefinition](_schema_schemadefinition_.rawargdefinition.md)

A raw line is one that should not be parsed as Hashml

## Hierarchy

* **RawArgDefinition**

## Index

### Properties

* [name](_schema_schemadefinition_.rawargdefinition.md#name)
* [raw](_schema_schemadefinition_.rawargdefinition.md#raw)
* [type](_schema_schemadefinition_.rawargdefinition.md#type)

## Properties

###  name

• **name**: *string*

*Defined in [schema/SchemaDefinition.ts:91](https://github.com/hashml/hashml/blob/6983021/src/schema/SchemaDefinition.ts#L91)*

Name of the prop that should hold this line

___

###  raw

• **raw**: *true*

*Defined in [schema/SchemaDefinition.ts:89](https://github.com/hashml/hashml/blob/6983021/src/schema/SchemaDefinition.ts#L89)*

___

###  type

• **type**: *"string" | "url" | "date"*

*Defined in [schema/SchemaDefinition.ts:99](https://github.com/hashml/hashml/blob/6983021/src/schema/SchemaDefinition.ts#L99)*

The type informs us of how to parse the head:

- `type: "string"` as a raw line
- `type: "url"` as a Url
- `type: "date"` as a Date
