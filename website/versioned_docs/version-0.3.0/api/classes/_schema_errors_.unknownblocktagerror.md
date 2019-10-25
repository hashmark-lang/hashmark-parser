---
id: version-0.3.0-_schema_errors_.unknownblocktagerror
title: UnknownBlockTagError
sidebar_label: UnknownBlockTagError
original_id: _schema_errors_.unknownblocktagerror
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/errors"](../modules/_schema_errors_.md) › [UnknownBlockTagError](_schema_errors_.unknownblocktagerror.md)

## Hierarchy

  ↳ [ValidationError](_schema_errors_.validationerror.md)

  ↳ **UnknownBlockTagError**

## Index

### Constructors

* [constructor](_schema_errors_.unknownblocktagerror.md#constructor)

### Properties

* [code](_schema_errors_.unknownblocktagerror.md#code)
* [message](_schema_errors_.unknownblocktagerror.md#message)
* [name](_schema_errors_.unknownblocktagerror.md#name)
* [positions](_schema_errors_.unknownblocktagerror.md#positions)
* [stack](_schema_errors_.unknownblocktagerror.md#optional-stack)

### Methods

* [toString](_schema_errors_.unknownblocktagerror.md#tostring)

## Constructors

###  constructor

\+ **new UnknownBlockTagError**(`tag`: string, `pos`: [InputPosition](../interfaces/_parser_inputposition_.inputposition.md)): *[UnknownBlockTagError](_schema_errors_.unknownblocktagerror.md)*

*Overrides [ValidationError](_schema_errors_.validationerror.md).[constructor](_schema_errors_.validationerror.md#constructor)*

*Defined in [schema/errors.ts:126](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L126)*

**Parameters:**

Name | Type |
------ | ------ |
`tag` | string |
`pos` | [InputPosition](../interfaces/_parser_inputposition_.inputposition.md) |

**Returns:** *[UnknownBlockTagError](_schema_errors_.unknownblocktagerror.md)*

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

###  positions

• **positions**: *[InputPosition](../interfaces/_parser_inputposition_.inputposition.md)[]*

*Inherited from [ValidationError](_schema_errors_.validationerror.md).[positions](_schema_errors_.validationerror.md#positions)*

*Defined in [schema/errors.ts:119](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L119)*

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from void*

*Overrides void*

Defined in /home/maxime/code/hashml/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:975

## Methods

###  toString

▸ **toString**(): *string*

*Inherited from [HMError](_schema_errors_.hmerror.md).[toString](_schema_errors_.hmerror.md#tostring)*

*Defined in [schema/errors.ts:13](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L13)*

**Returns:** *string*
