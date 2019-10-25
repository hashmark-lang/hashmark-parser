---
id: version-0.3.0-_schema_schema_.blockschema
title: BlockSchema
sidebar_label: BlockSchema
original_id: _schema_schema_.blockschema
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/Schema"](../modules/_schema_schema_.md) › [BlockSchema](_schema_schema_.blockschema.md)

## Hierarchy

* **BlockSchema**

## Index

### Constructors

* [constructor](_schema_schema_.blockschema.md#constructor)

### Properties

* [bodyProps](_schema_schema_.blockschema.md#bodyprops)
* [childCardinalities](_schema_schema_.blockschema.md#childcardinalities)
* [childTagToProp](_schema_schema_.blockschema.md#private-childtagtoprop)
* [defaultTag](_schema_schema_.blockschema.md#optional-defaulttag)
* [head](_schema_schema_.blockschema.md#optional-head)
* [rawProp](_schema_schema_.blockschema.md#optional-rawprop)
* [tag](_schema_schema_.blockschema.md#tag)

### Methods

* [getPropByChild](_schema_schema_.blockschema.md#getpropbychild)

## Constructors

###  constructor

\+ **new BlockSchema**(`tag`: string, `schema`: [BlockDefinition](../modules/_schema_schemadefinition_.md#blockdefinition)): *[BlockSchema](_schema_schema_.blockschema.md)*

*Defined in [schema/Schema.ts:63](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`tag` | string |
`schema` | [BlockDefinition](../modules/_schema_schemadefinition_.md#blockdefinition) |

**Returns:** *[BlockSchema](_schema_schema_.blockschema.md)*

## Properties

###  bodyProps

• **bodyProps**: *ReadonlyArray‹[BodyPropSchema](_schema_schema_.bodypropschema.md)›*

*Defined in [schema/Schema.ts:59](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L59)*

___

###  childCardinalities

• **childCardinalities**: *ReadonlyArray‹[string, [Cardinality](../interfaces/_schema_cardinality_.cardinality.md)]›*

*Defined in [schema/Schema.ts:61](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L61)*

___

### `Private` childTagToProp

• **childTagToProp**: *Map‹string, [BodyPropSchema](_schema_schema_.bodypropschema.md)›* =  new Map()

*Defined in [schema/Schema.ts:63](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L63)*

___

### `Optional` defaultTag

• **defaultTag**? : *undefined | string*

*Defined in [schema/Schema.ts:57](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L57)*

___

### `Optional` head

• **head**? : *[ArgSchema](_schema_schema_.argschema.md)*

*Defined in [schema/Schema.ts:56](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L56)*

___

### `Optional` rawProp

• **rawProp**? : *[BodyPropSchema](_schema_schema_.bodypropschema.md)*

*Defined in [schema/Schema.ts:60](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L60)*

___

###  tag

• **tag**: *string*

*Defined in [schema/Schema.ts:65](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L65)*

## Methods

###  getPropByChild

▸ **getPropByChild**(`child`: string): *[BodyPropSchema](_schema_schema_.bodypropschema.md) | undefined*

*Defined in [schema/Schema.ts:93](https://github.com/hashml/hashml/blob/6983021/src/schema/Schema.ts#L93)*

**Parameters:**

Name | Type |
------ | ------ |
`child` | string |

**Returns:** *[BodyPropSchema](_schema_schema_.bodypropschema.md) | undefined*
