---
id: version-0.3.0-_schema_errors_.duplicatepropnameerror
title: DuplicatePropNameError
sidebar_label: DuplicatePropNameError
original_id: _schema_errors_.duplicatepropnameerror
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/errors"](../modules/_schema_errors_.md) › [DuplicatePropNameError](_schema_errors_.duplicatepropnameerror.md)

## Hierarchy

  ↳ [SchemaDefinitionError](_schema_errors_.schemadefinitionerror.md)

  ↳ **DuplicatePropNameError**

## Index

### Constructors

* [constructor](_schema_errors_.duplicatepropnameerror.md#constructor)

### Properties

* [code](_schema_errors_.duplicatepropnameerror.md#code)
* [message](_schema_errors_.duplicatepropnameerror.md#message)
* [name](_schema_errors_.duplicatepropnameerror.md#name)
* [propName](_schema_errors_.duplicatepropnameerror.md#propname)
* [repetitions](_schema_errors_.duplicatepropnameerror.md#repetitions)
* [stack](_schema_errors_.duplicatepropnameerror.md#optional-stack)
* [tag](_schema_errors_.duplicatepropnameerror.md#tag)

### Methods

* [toString](_schema_errors_.duplicatepropnameerror.md#tostring)

## Constructors

###  constructor

\+ **new DuplicatePropNameError**(`tag`: string, `propName`: string, `repetitions`: number): *[DuplicatePropNameError](_schema_errors_.duplicatepropnameerror.md)*

*Overrides [SchemaDefinitionError](_schema_errors_.schemadefinitionerror.md).[constructor](_schema_errors_.schemadefinitionerror.md#constructor)*

*Defined in [schema/errors.ts:50](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`tag` | string |
`propName` | string |
`repetitions` | number |

**Returns:** *[DuplicatePropNameError](_schema_errors_.duplicatepropnameerror.md)*

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

*Defined in [schema/errors.ts:51](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L51)*

___

###  repetitions

• **repetitions**: *number*

*Defined in [schema/errors.ts:51](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L51)*

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from void*

*Overrides void*

Defined in /home/maxime/code/hashml/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:975

___

###  tag

• **tag**: *string*

*Defined in [schema/errors.ts:51](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L51)*

## Methods

###  toString

▸ **toString**(): *string*

*Inherited from [HMError](_schema_errors_.hmerror.md).[toString](_schema_errors_.hmerror.md#tostring)*

*Defined in [schema/errors.ts:13](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L13)*

**Returns:** *string*
