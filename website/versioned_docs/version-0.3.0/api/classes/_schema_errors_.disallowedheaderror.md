---
id: version-0.3.0-_schema_errors_.disallowedheaderror
title: DisallowedHeadError
sidebar_label: DisallowedHeadError
original_id: _schema_errors_.disallowedheaderror
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/errors"](../modules/_schema_errors_.md) › [DisallowedHeadError](_schema_errors_.disallowedheaderror.md)

## Hierarchy

  ↳ [ValidationError](_schema_errors_.validationerror.md)

  ↳ **DisallowedHeadError**

## Index

### Constructors

* [constructor](_schema_errors_.disallowedheaderror.md#constructor)

### Properties

* [code](_schema_errors_.disallowedheaderror.md#code)
* [message](_schema_errors_.disallowedheaderror.md#message)
* [name](_schema_errors_.disallowedheaderror.md#name)
* [positions](_schema_errors_.disallowedheaderror.md#positions)
* [stack](_schema_errors_.disallowedheaderror.md#optional-stack)

### Methods

* [toString](_schema_errors_.disallowedheaderror.md#tostring)

## Constructors

###  constructor

\+ **new DisallowedHeadError**(`parentTag`: string, `pos`: [InputPosition](../interfaces/_parser_inputposition_.inputposition.md)): *[DisallowedHeadError](_schema_errors_.disallowedheaderror.md)*

*Overrides [ValidationError](_schema_errors_.validationerror.md).[constructor](_schema_errors_.validationerror.md#constructor)*

*Defined in [schema/errors.ts:197](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L197)*

**Parameters:**

Name | Type |
------ | ------ |
`parentTag` | string |
`pos` | [InputPosition](../interfaces/_parser_inputposition_.inputposition.md) |

**Returns:** *[DisallowedHeadError](_schema_errors_.disallowedheaderror.md)*

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
