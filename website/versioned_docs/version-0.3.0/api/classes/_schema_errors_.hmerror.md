---
id: version-0.3.0-_schema_errors_.hmerror
title: HMError
sidebar_label: HMError
original_id: _schema_errors_.hmerror
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/errors"](../modules/_schema_errors_.md) › [HMError](_schema_errors_.hmerror.md)

## Hierarchy

* Error

  ↳ **HMError**

  ↳ [SchemaDefinitionError](_schema_errors_.schemadefinitionerror.md)

  ↳ [ValidationError](_schema_errors_.validationerror.md)

## Index

### Constructors

* [constructor](_schema_errors_.hmerror.md#constructor)

### Properties

* [code](_schema_errors_.hmerror.md#code)
* [message](_schema_errors_.hmerror.md#message)
* [name](_schema_errors_.hmerror.md#name)
* [stack](_schema_errors_.hmerror.md#optional-stack)
* [Error](_schema_errors_.hmerror.md#static-error)

### Methods

* [toString](_schema_errors_.hmerror.md#tostring)

## Constructors

###  constructor

\+ **new HMError**(`code`: [ErrorCode](../enums/_schema_errors_.errorcode.md), `message`: string): *[HMError](_schema_errors_.hmerror.md)*

*Defined in [schema/errors.ts:8](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`code` | [ErrorCode](../enums/_schema_errors_.errorcode.md) |
`message` | string |

**Returns:** *[HMError](_schema_errors_.hmerror.md)*

## Properties

###  code

• **code**: *[ErrorCode](../enums/_schema_errors_.errorcode.md)*

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

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from void*

*Overrides void*

Defined in /home/maxime/code/hashml/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:975

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

Defined in /home/maxime/code/hashml/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:984

## Methods

###  toString

▸ **toString**(): *string*

*Defined in [schema/errors.ts:13](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L13)*

**Returns:** *string*
