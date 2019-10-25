---
id: version-0.3.0-_schema_errors_.undefinedinlinetagerror
title: UndefinedInlineTagError
sidebar_label: UndefinedInlineTagError
original_id: _schema_errors_.undefinedinlinetagerror
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/errors"](../modules/_schema_errors_.md) › [UndefinedInlineTagError](_schema_errors_.undefinedinlinetagerror.md)

## Hierarchy

  ↳ [SchemaDefinitionError](_schema_errors_.schemadefinitionerror.md)

  ↳ **UndefinedInlineTagError**

## Index

### Constructors

* [constructor](_schema_errors_.undefinedinlinetagerror.md#constructor)

### Properties

* [code](_schema_errors_.undefinedinlinetagerror.md#code)
* [message](_schema_errors_.undefinedinlinetagerror.md#message)
* [name](_schema_errors_.undefinedinlinetagerror.md#name)
* [propName](_schema_errors_.undefinedinlinetagerror.md#propname)
* [referencedTag](_schema_errors_.undefinedinlinetagerror.md#referencedtag)
* [schemaTag](_schema_errors_.undefinedinlinetagerror.md#schematag)
* [stack](_schema_errors_.undefinedinlinetagerror.md#optional-stack)

### Methods

* [toString](_schema_errors_.undefinedinlinetagerror.md#tostring)

## Constructors

###  constructor

\+ **new UndefinedInlineTagError**(`schemaTag`: string, `propName`: string, `referencedTag`: string): *[UndefinedInlineTagError](_schema_errors_.undefinedinlinetagerror.md)*

*Overrides [SchemaDefinitionError](_schema_errors_.schemadefinitionerror.md).[constructor](_schema_errors_.schemadefinitionerror.md#constructor)*

*Defined in [schema/errors.ts:92](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaTag` | string |
`propName` | string |
`referencedTag` | string |

**Returns:** *[UndefinedInlineTagError](_schema_errors_.undefinedinlinetagerror.md)*

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

*Defined in [schema/errors.ts:95](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L95)*

___

###  referencedTag

• **referencedTag**: *string*

*Defined in [schema/errors.ts:96](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L96)*

___

###  schemaTag

• **schemaTag**: *string*

*Defined in [schema/errors.ts:94](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L94)*

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
