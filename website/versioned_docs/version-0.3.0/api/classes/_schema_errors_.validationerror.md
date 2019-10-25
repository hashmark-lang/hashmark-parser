---
id: version-0.3.0-_schema_errors_.validationerror
title: ValidationError
sidebar_label: ValidationError
original_id: _schema_errors_.validationerror
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/errors"](../modules/_schema_errors_.md) › [ValidationError](_schema_errors_.validationerror.md)

## Hierarchy

  ↳ [HMError](_schema_errors_.hmerror.md)

  ↳ **ValidationError**

  ↳ [UnknownBlockTagError](_schema_errors_.unknownblocktagerror.md)

  ↳ [UnknownInlineTagError](_schema_errors_.unknowninlinetagerror.md)

  ↳ [DisallowedInBlockError](_schema_errors_.disallowedinblockerror.md)

  ↳ [DisallowedInArgError](_schema_errors_.disallowedinargerror.md)

  ↳ [DisallowedInHeadError](_schema_errors_.disallowedinheaderror.md)

  ↳ [CardinalityError](_schema_errors_.cardinalityerror.md)

  ↳ [DisallowedArgError](_schema_errors_.disallowedargerror.md)

  ↳ [DisallowedHeadError](_schema_errors_.disallowedheaderror.md)

  ↳ [DisallowedDefaultTagError](_schema_errors_.disalloweddefaulttagerror.md)

  ↳ [TooFewArgsError](_schema_errors_.toofewargserror.md)

## Index

### Constructors

* [constructor](_schema_errors_.validationerror.md#constructor)

### Properties

* [code](_schema_errors_.validationerror.md#code)
* [message](_schema_errors_.validationerror.md#message)
* [name](_schema_errors_.validationerror.md#name)
* [positions](_schema_errors_.validationerror.md#positions)
* [stack](_schema_errors_.validationerror.md#optional-stack)

### Methods

* [toString](_schema_errors_.validationerror.md#tostring)

## Constructors

###  constructor

\+ **new ValidationError**(`code`: [ErrorCode](../enums/_schema_errors_.errorcode.md), `message`: string, ...`positions`: [InputPosition](../interfaces/_parser_inputposition_.inputposition.md)[]): *[ValidationError](_schema_errors_.validationerror.md)*

*Overrides [HMError](_schema_errors_.hmerror.md).[constructor](_schema_errors_.hmerror.md#constructor)*

*Defined in [schema/errors.ts:119](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L119)*

**Parameters:**

Name | Type |
------ | ------ |
`code` | [ErrorCode](../enums/_schema_errors_.errorcode.md) |
`message` | string |
`...positions` | [InputPosition](../interfaces/_parser_inputposition_.inputposition.md)[] |

**Returns:** *[ValidationError](_schema_errors_.validationerror.md)*

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
