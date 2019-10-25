---
id: version-0.3.0-_schema_errors_.illegaltagnameerror
title: IllegalTagNameError
sidebar_label: IllegalTagNameError
original_id: _schema_errors_.illegaltagnameerror
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/errors"](../modules/_schema_errors_.md) › [IllegalTagNameError](_schema_errors_.illegaltagnameerror.md)

## Hierarchy

  ↳ [SchemaDefinitionError](_schema_errors_.schemadefinitionerror.md)

  ↳ **IllegalTagNameError**

## Index

### Constructors

* [constructor](_schema_errors_.illegaltagnameerror.md#constructor)

### Properties

* [code](_schema_errors_.illegaltagnameerror.md#code)
* [illegalChar](_schema_errors_.illegaltagnameerror.md#illegalchar)
* [message](_schema_errors_.illegaltagnameerror.md#message)
* [name](_schema_errors_.illegaltagnameerror.md#name)
* [stack](_schema_errors_.illegaltagnameerror.md#optional-stack)
* [tag](_schema_errors_.illegaltagnameerror.md#tag)

### Methods

* [toString](_schema_errors_.illegaltagnameerror.md#tostring)

## Constructors

###  constructor

\+ **new IllegalTagNameError**(`tag`: string, `illegalChar`: string): *[IllegalTagNameError](_schema_errors_.illegaltagnameerror.md)*

*Overrides [SchemaDefinitionError](_schema_errors_.schemadefinitionerror.md).[constructor](_schema_errors_.schemadefinitionerror.md#constructor)*

*Defined in [schema/errors.ts:105](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`tag` | string |
`illegalChar` | string |

**Returns:** *[IllegalTagNameError](_schema_errors_.illegaltagnameerror.md)*

## Properties

###  code

• **code**: *[ErrorCode](../enums/_schema_errors_.errorcode.md)*

*Inherited from [HMError](_schema_errors_.hmerror.md).[code](_schema_errors_.hmerror.md#code)*

*Defined in [schema/errors.ts:9](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L9)*

___

###  illegalChar

• **illegalChar**: *string*

*Defined in [schema/errors.ts:106](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L106)*

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

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from void*

*Overrides void*

Defined in /home/maxime/code/hashml/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:975

___

###  tag

• **tag**: *string*

*Defined in [schema/errors.ts:106](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L106)*

## Methods

###  toString

▸ **toString**(): *string*

*Inherited from [HMError](_schema_errors_.hmerror.md).[toString](_schema_errors_.hmerror.md#tostring)*

*Defined in [schema/errors.ts:13](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L13)*

**Returns:** *string*
