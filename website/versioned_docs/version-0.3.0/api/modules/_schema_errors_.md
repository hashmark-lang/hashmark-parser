---
id: version-0.3.0-_schema_errors_
title: schema/errors
sidebar_label: schema/errors
original_id: _schema_errors_
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/errors"](_schema_errors_.md)

## Index

### Enumerations

* [ErrorCode](../enums/_schema_errors_.errorcode.md)

### Classes

* [CardinalityError](../classes/_schema_errors_.cardinalityerror.md)
* [DisallowedArgError](../classes/_schema_errors_.disallowedargerror.md)
* [DisallowedDefaultTagError](../classes/_schema_errors_.disalloweddefaulttagerror.md)
* [DisallowedHeadError](../classes/_schema_errors_.disallowedheaderror.md)
* [DisallowedInArgError](../classes/_schema_errors_.disallowedinargerror.md)
* [DisallowedInBlockError](../classes/_schema_errors_.disallowedinblockerror.md)
* [DisallowedInHeadError](../classes/_schema_errors_.disallowedinheaderror.md)
* [DuplicatePropAssignmentError](../classes/_schema_errors_.duplicatepropassignmenterror.md)
* [DuplicatePropNameError](../classes/_schema_errors_.duplicatepropnameerror.md)
* [HMError](../classes/_schema_errors_.hmerror.md)
* [IllegalPropNameError](../classes/_schema_errors_.illegalpropnameerror.md)
* [IllegalTagNameError](../classes/_schema_errors_.illegaltagnameerror.md)
* [SchemaDefinitionError](../classes/_schema_errors_.schemadefinitionerror.md)
* [TooFewArgsError](../classes/_schema_errors_.toofewargserror.md)
* [UndefinedBlockTagError](../classes/_schema_errors_.undefinedblocktagerror.md)
* [UndefinedInlineTagError](../classes/_schema_errors_.undefinedinlinetagerror.md)
* [UnknownBlockTagError](../classes/_schema_errors_.unknownblocktagerror.md)
* [UnknownInlineTagError](../classes/_schema_errors_.unknowninlinetagerror.md)
* [ValidationError](../classes/_schema_errors_.validationerror.md)

### Type aliases

* [ErrorLogger](_schema_errors_.md#errorlogger)

## Type aliases

###  ErrorLogger

Ƭ **ErrorLogger**: *function*

*Defined in [schema/errors.ts:6](https://github.com/hashml/hashml/blob/6983021/src/schema/errors.ts#L6)*

#### Type declaration:

▸ (`error`: [HMError](../classes/_schema_errors_.hmerror.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`error` | [HMError](../classes/_schema_errors_.hmerror.md) |
