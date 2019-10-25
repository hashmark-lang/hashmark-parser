---
id: version-0.3.0-_schema_errors_.undefinedblocktagerror
title: UndefinedBlockTagError
sidebar_label: UndefinedBlockTagError
original_id: _schema_errors_.undefinedblocktagerror
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/errors"](../modules/_schema_errors_.md) › [UndefinedBlockTagError](_schema_errors_.undefinedblocktagerror.md)

## Hierarchy

  ↳ [SchemaDefinitionError](_schema_errors_.schemadefinitionerror.md)

  ↳ **UndefinedBlockTagError**

## Index

### Constructors

* [constructor](_schema_errors_.undefinedblocktagerror.md#constructor)

### Properties

* [code](_schema_errors_.undefinedblocktagerror.md#code)
* [message](_schema_errors_.undefinedblocktagerror.md#message)
* [name](_schema_errors_.undefinedblocktagerror.md#name)
* [propName](_schema_errors_.undefinedblocktagerror.md#propname)
* [referencedTag](_schema_errors_.undefinedblocktagerror.md#referencedtag)
* [schemaTag](_schema_errors_.undefinedblocktagerror.md#schematag)
* [stack](_schema_errors_.undefinedblocktagerror.md#optional-stack)

### Methods

* [toString](_schema_errors_.undefinedblocktagerror.md#tostring)

## Constructors

###  constructor

\+ **new UndefinedBlockTagError**(`schemaTag`: string, `propName`: string, `referencedTag`: string): *[UndefinedBlockTagError](_schema_errors_.undefinedblocktagerror.md)*

*Overrides [SchemaDefinitionError](_schema_errors_.schemadefinitionerror.md).[constructor](_schema_errors_.schemadefinitionerror.md#constructor)*

*Defined in [schema/errors.ts:79](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L79)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaTag` | string |
`propName` | string |
`referencedTag` | string |

**Returns:** *[UndefinedBlockTagError](_schema_errors_.undefinedblocktagerror.md)*

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

*Defined in [schema/errors.ts:82](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L82)*

___

###  referencedTag

• **referencedTag**: *string*

*Defined in [schema/errors.ts:83](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L83)*

___

###  schemaTag

• **schemaTag**: *string*

*Defined in [schema/errors.ts:81](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L81)*

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
