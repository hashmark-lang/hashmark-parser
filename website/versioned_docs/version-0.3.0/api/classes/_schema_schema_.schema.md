---
id: version-0.3.0-_schema_schema_.schema
title: Schema
sidebar_label: Schema
original_id: _schema_schema_.schema
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/Schema"](../modules/_schema_schema_.md) › [Schema](_schema_schema_.schema.md)

## Hierarchy

* **Schema**

## Index

### Constructors

* [constructor](_schema_schema_.schema.md#constructor)

### Properties

* [blockSchemas](_schema_schema_.schema.md#private-blockschemas)
* [inlineSchemas](_schema_schema_.schema.md#private-inlineschemas)
* [rootSchema](_schema_schema_.schema.md#rootschema)
* [sugars](_schema_schema_.schema.md#sugars)

### Accessors

* [blocks](_schema_schema_.schema.md#blocks)
* [inlines](_schema_schema_.schema.md#inlines)

### Methods

* [getBlockSchema](_schema_schema_.schema.md#getblockschema)
* [getInlineSchema](_schema_schema_.schema.md#getinlineschema)

## Constructors

###  constructor

\+ **new Schema**(`schema`: [SchemaDefinition](../interfaces/_schema_schemadefinition_.schemadefinition.md)): *[Schema](_schema_schema_.schema.md)*

*Defined in [schema/Schema.ts:17](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`schema` | [SchemaDefinition](../interfaces/_schema_schemadefinition_.schemadefinition.md) |

**Returns:** *[Schema](_schema_schema_.schema.md)*

## Properties

### `Private` blockSchemas

• **blockSchemas**: *Map‹string, [BlockSchema](_schema_schema_.blockschema.md)›* =  new Map()

*Defined in [schema/Schema.ts:15](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L15)*

___

### `Private` inlineSchemas

• **inlineSchemas**: *Map‹string, [InlineSchema](_schema_schema_.inlineschema.md)›* =  new Map()

*Defined in [schema/Schema.ts:16](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L16)*

___

###  rootSchema

• **rootSchema**: *[BlockSchema](_schema_schema_.blockschema.md)*

*Defined in [schema/Schema.ts:14](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L14)*

___

###  sugars

• **sugars**: *[Sugar](../interfaces/_parser_sugar_.sugar.md)[]* =  []

*Defined in [schema/Schema.ts:17](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L17)*

## Accessors

###  blocks

• **get blocks**(): *[BlockSchema](_schema_schema_.blockschema.md)[]*

*Defined in [schema/Schema.ts:38](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L38)*

**Returns:** *[BlockSchema](_schema_schema_.blockschema.md)[]*

___

###  inlines

• **get inlines**(): *[InlineSchema](_schema_schema_.inlineschema.md)[]*

*Defined in [schema/Schema.ts:42](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L42)*

**Returns:** *[InlineSchema](_schema_schema_.inlineschema.md)[]*

## Methods

###  getBlockSchema

▸ **getBlockSchema**(`tag`: string): *[BlockSchema](_schema_schema_.blockschema.md) | undefined*

*Defined in [schema/Schema.ts:46](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`tag` | string |

**Returns:** *[BlockSchema](_schema_schema_.blockschema.md) | undefined*

___

###  getInlineSchema

▸ **getInlineSchema**(`tag`: string): *[InlineSchema](_schema_schema_.inlineschema.md) | undefined*

*Defined in [schema/Schema.ts:50](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`tag` | string |

**Returns:** *[InlineSchema](_schema_schema_.inlineschema.md) | undefined*
