---
id: version-0.3.0-_schema_errors_.duplicatepropassignmenterror
title: DuplicatePropAssignmentError
sidebar_label: DuplicatePropAssignmentError
original_id: _schema_errors_.duplicatepropassignmenterror
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/errors"](../modules/_schema_errors_.md) › [DuplicatePropAssignmentError](_schema_errors_.duplicatepropassignmenterror.md)

## Hierarchy

  ↳ [SchemaDefinitionError](_schema_errors_.schemadefinitionerror.md)

  ↳ **DuplicatePropAssignmentError**

## Index

### Constructors

* [constructor](_schema_errors_.duplicatepropassignmenterror.md#constructor)

### Properties

* [code](_schema_errors_.duplicatepropassignmenterror.md#code)
* [contentTag](_schema_errors_.duplicatepropassignmenterror.md#contenttag)
* [message](_schema_errors_.duplicatepropassignmenterror.md#message)
* [name](_schema_errors_.duplicatepropassignmenterror.md#name)
* [propNames](_schema_errors_.duplicatepropassignmenterror.md#propnames)
* [stack](_schema_errors_.duplicatepropassignmenterror.md#optional-stack)
* [tag](_schema_errors_.duplicatepropassignmenterror.md#tag)

### Methods

* [toString](_schema_errors_.duplicatepropassignmenterror.md#tostring)

## Constructors

###  constructor

\+ **new DuplicatePropAssignmentError**(`tag`: string, `propNames`: string[], `contentTag`: string): *[DuplicatePropAssignmentError](_schema_errors_.duplicatepropassignmenterror.md)*

*Overrides [SchemaDefinitionError](_schema_errors_.schemadefinitionerror.md).[constructor](_schema_errors_.schemadefinitionerror.md#constructor)*

*Defined in [schema/errors.ts:60](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`tag` | string |
`propNames` | string[] |
`contentTag` | string |

**Returns:** *[DuplicatePropAssignmentError](_schema_errors_.duplicatepropassignmenterror.md)*

## Properties

###  code

• **code**: *[ErrorCode](../enums/_schema_errors_.errorcode.md)*

*Inherited from [HMError](_schema_errors_.hmerror.md).[code](_schema_errors_.hmerror.md#code)*

*Defined in [schema/errors.ts:9](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L9)*

___

###  contentTag

• **contentTag**: *string*

*Defined in [schema/errors.ts:61](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L61)*

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

###  propNames

• **propNames**: *string[]*

*Defined in [schema/errors.ts:61](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L61)*

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from void*

*Overrides void*

Defined in /home/maxime/code/hashml/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:975

___

###  tag

• **tag**: *string*

*Defined in [schema/errors.ts:61](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L61)*

## Methods

###  toString

▸ **toString**(): *string*

*Inherited from [HMError](_schema_errors_.hmerror.md).[toString](_schema_errors_.hmerror.md#tostring)*

*Defined in [schema/errors.ts:13](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L13)*

**Returns:** *string*
