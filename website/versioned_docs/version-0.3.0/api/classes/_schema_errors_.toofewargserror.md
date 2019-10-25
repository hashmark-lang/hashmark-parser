---
id: version-0.3.0-_schema_errors_.toofewargserror
title: TooFewArgsError
sidebar_label: TooFewArgsError
original_id: _schema_errors_.toofewargserror
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/errors"](../modules/_schema_errors_.md) › [TooFewArgsError](_schema_errors_.toofewargserror.md)

## Hierarchy

  ↳ [ValidationError](_schema_errors_.validationerror.md)

  ↳ **TooFewArgsError**

## Index

### Constructors

* [constructor](_schema_errors_.toofewargserror.md#constructor)

### Properties

* [argCount](_schema_errors_.toofewargserror.md#argcount)
* [code](_schema_errors_.toofewargserror.md#code)
* [expectedLength](_schema_errors_.toofewargserror.md#expectedlength)
* [message](_schema_errors_.toofewargserror.md#message)
* [name](_schema_errors_.toofewargserror.md#name)
* [pos](_schema_errors_.toofewargserror.md#pos)
* [positions](_schema_errors_.toofewargserror.md#positions)
* [stack](_schema_errors_.toofewargserror.md#optional-stack)
* [tag](_schema_errors_.toofewargserror.md#tag)

### Methods

* [toString](_schema_errors_.toofewargserror.md#tostring)

## Constructors

###  constructor

\+ **new TooFewArgsError**(`tag`: string, `argCount`: number, `expectedLength`: number, `pos`: [InputPosition](../interfaces/_parser_inputposition_.inputposition.md)): *[TooFewArgsError](_schema_errors_.toofewargserror.md)*

*Overrides [ValidationError](_schema_errors_.validationerror.md).[constructor](_schema_errors_.validationerror.md#constructor)*

*Defined in [schema/errors.ts:213](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L213)*

**Parameters:**

Name | Type |
------ | ------ |
`tag` | string |
`argCount` | number |
`expectedLength` | number |
`pos` | [InputPosition](../interfaces/_parser_inputposition_.inputposition.md) |

**Returns:** *[TooFewArgsError](_schema_errors_.toofewargserror.md)*

## Properties

###  argCount

• **argCount**: *number*

*Defined in [schema/errors.ts:216](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L216)*

___

###  code

• **code**: *[ErrorCode](../enums/_schema_errors_.errorcode.md)*

*Inherited from [HMError](_schema_errors_.hmerror.md).[code](_schema_errors_.hmerror.md#code)*

*Defined in [schema/errors.ts:9](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L9)*

___

###  expectedLength

• **expectedLength**: *number*

*Defined in [schema/errors.ts:217](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L217)*

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

###  pos

• **pos**: *[InputPosition](../interfaces/_parser_inputposition_.inputposition.md)*

*Defined in [schema/errors.ts:218](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L218)*

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

___

###  tag

• **tag**: *string*

*Defined in [schema/errors.ts:215](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L215)*

## Methods

###  toString

▸ **toString**(): *string*

*Inherited from [HMError](_schema_errors_.hmerror.md).[toString](_schema_errors_.hmerror.md#tostring)*

*Defined in [schema/errors.ts:13](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L13)*

**Returns:** *string*
