---
id: version-0.3.0-_schema_schema_.bodypropschema
title: BodyPropSchema
sidebar_label: BodyPropSchema
original_id: _schema_schema_.bodypropschema
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/Schema"](../modules/_schema_schema_.md) › [BodyPropSchema](_schema_schema_.bodypropschema.md)

## Hierarchy

* **BodyPropSchema**

## Index

### Constructors

* [constructor](_schema_schema_.bodypropschema.md#constructor)

### Properties

* [cardinality](_schema_schema_.bodypropschema.md#cardinality)
* [children](_schema_schema_.bodypropschema.md#children)
* [content](_schema_schema_.bodypropschema.md#private-content)
* [isArrayType](_schema_schema_.bodypropschema.md#isarraytype)
* [name](_schema_schema_.bodypropschema.md#name)
* [raw](_schema_schema_.bodypropschema.md#raw)

### Methods

* [childCardinality](_schema_schema_.bodypropschema.md#childcardinality)

## Constructors

###  constructor

\+ **new BodyPropSchema**(`name`: string, `content`: object | object): *[BodyPropSchema](_schema_schema_.bodypropschema.md)*

*Defined in [schema/Schema.ts:102](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L102)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`content` | object &#124; object |

**Returns:** *[BodyPropSchema](_schema_schema_.bodypropschema.md)*

## Properties

###  cardinality

• **cardinality**: *[Cardinality](../interfaces/_schema_cardinality_.cardinality.md)*

*Defined in [schema/Schema.ts:100](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L100)*

___

###  children

• **children**: *ReadonlyArray‹string›*

*Defined in [schema/Schema.ts:102](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L102)*

___

### `Private` content

• **content**: *object | object*

*Defined in [schema/Schema.ts:106](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L106)*

___

###  isArrayType

• **isArrayType**: *boolean*

*Defined in [schema/Schema.ts:101](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L101)*

___

###  name

• **name**: *string*

*Defined in [schema/Schema.ts:105](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L105)*

___

###  raw

• **raw**: *boolean*

*Defined in [schema/Schema.ts:99](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L99)*

## Methods

###  childCardinality

▸ **childCardinality**(`childName`: string): *[Cardinality](../interfaces/_schema_cardinality_.cardinality.md) | undefined*

*Defined in [schema/Schema.ts:118](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L118)*

**Parameters:**

Name | Type |
------ | ------ |
`childName` | string |

**Returns:** *[Cardinality](../interfaces/_schema_cardinality_.cardinality.md) | undefined*
