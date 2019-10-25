---
id: version-0.3.0-_schema_errors_.illegalpropnameerror
title: IllegalPropNameError
sidebar_label: IllegalPropNameError
original_id: _schema_errors_.illegalpropnameerror
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/errors"](../modules/_schema_errors_.md) › [IllegalPropNameError](_schema_errors_.illegalpropnameerror.md)

## Hierarchy

  ↳ [SchemaDefinitionError](_schema_errors_.schemadefinitionerror.md)

  ↳ **IllegalPropNameError**

## Index

### Constructors

* [constructor](_schema_errors_.illegalpropnameerror.md#constructor)

### Properties

* [code](_schema_errors_.illegalpropnameerror.md#code)
* [message](_schema_errors_.illegalpropnameerror.md#message)
* [name](_schema_errors_.illegalpropnameerror.md#name)
* [propName](_schema_errors_.illegalpropnameerror.md#propname)
* [stack](_schema_errors_.illegalpropnameerror.md#optional-stack)
* [tag](_schema_errors_.illegalpropnameerror.md#tag)

### Methods

* [toString](_schema_errors_.illegalpropnameerror.md#tostring)

## Constructors

###  constructor

\+ **new IllegalPropNameError**(`tag`: string, `propName`: string): *[IllegalPropNameError](_schema_errors_.illegalpropnameerror.md)*

*Overrides [SchemaDefinitionError](_schema_errors_.schemadefinitionerror.md).[constructor](_schema_errors_.schemadefinitionerror.md#constructor)*

*Defined in [schema/errors.ts:70](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`tag` | string |
`propName` | string |

**Returns:** *[IllegalPropNameError](_schema_errors_.illegalpropnameerror.md)*

## Properties

###  code

• **code**: *[ErrorCode](../enums/_schema_errors_.errorcode.md)*

*Inherited from [HMError](_schema_errors_.hmerror.md).[code](_schema_errors_.hmerror.md#code)*

*Defined in [schema/errors.ts:9](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L9)*

___

###  message

• **message**: *string*

*Inherited from void*

Defined in /home/maxime/code/hashml/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:974

___

###  name

• **name**: *string*

*Inherited from void*

Defined in /home/maxime/code/hashml/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:973

___

###  propName

• **propName**: *string*

*Defined in [schema/errors.ts:71](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L71)*

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from void*

*Overrides void*

Defined in /home/maxime/code/hashml/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:975

___

###  tag

• **tag**: *string*

*Defined in [schema/errors.ts:71](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L71)*

## Methods

###  toString

▸ **toString**(): *string*

*Inherited from [HMError](_schema_errors_.hmerror.md).[toString](_schema_errors_.hmerror.md#tostring)*

*Defined in [schema/errors.ts:13](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L13)*

**Returns:** *string*
