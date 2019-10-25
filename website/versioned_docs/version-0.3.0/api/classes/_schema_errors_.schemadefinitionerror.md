---
id: version-0.3.0-_schema_errors_.schemadefinitionerror
title: SchemaDefinitionError
sidebar_label: SchemaDefinitionError
original_id: _schema_errors_.schemadefinitionerror
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/errors"](../modules/_schema_errors_.md) › [SchemaDefinitionError](_schema_errors_.schemadefinitionerror.md)

## Hierarchy

  ↳ [HMError](_schema_errors_.hmerror.md)

  ↳ **SchemaDefinitionError**

  ↳ [DuplicatePropNameError](_schema_errors_.duplicatepropnameerror.md)

  ↳ [DuplicatePropAssignmentError](_schema_errors_.duplicatepropassignmenterror.md)

  ↳ [IllegalPropNameError](_schema_errors_.illegalpropnameerror.md)

  ↳ [UndefinedBlockTagError](_schema_errors_.undefinedblocktagerror.md)

  ↳ [UndefinedInlineTagError](_schema_errors_.undefinedinlinetagerror.md)

  ↳ [IllegalTagNameError](_schema_errors_.illegaltagnameerror.md)

## Index

### Constructors

* [constructor](_schema_errors_.schemadefinitionerror.md#constructor)

### Properties

* [code](_schema_errors_.schemadefinitionerror.md#code)
* [message](_schema_errors_.schemadefinitionerror.md#message)
* [name](_schema_errors_.schemadefinitionerror.md#name)
* [stack](_schema_errors_.schemadefinitionerror.md#optional-stack)

### Methods

* [toString](_schema_errors_.schemadefinitionerror.md#tostring)

## Constructors

###  constructor

\+ **new SchemaDefinitionError**(`code`: [ErrorCode](../enums/_schema_errors_.errorcode.md), `message`: string): *[SchemaDefinitionError](_schema_errors_.schemadefinitionerror.md)*

*Overrides [HMError](_schema_errors_.hmerror.md).[constructor](_schema_errors_.hmerror.md#constructor)*

*Defined in [schema/errors.ts:44](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`code` | [ErrorCode](../enums/_schema_errors_.errorcode.md) |
`message` | string |

**Returns:** *[SchemaDefinitionError](_schema_errors_.schemadefinitionerror.md)*

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
