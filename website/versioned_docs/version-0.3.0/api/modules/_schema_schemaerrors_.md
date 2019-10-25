---
id: version-0.3.0-_schema_schemaerrors_
title: schema/schemaErrors
sidebar_label: schema/schemaErrors
original_id: _schema_schemaerrors_
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/schemaErrors"](_schema_schemaerrors_.md)

## Index

### Functions

* [duplicatePropAssignmentErrors](_schema_schemaerrors_.md#duplicatepropassignmenterrors)
* [duplicatePropNameErrors](_schema_schemaerrors_.md#duplicatepropnameerrors)
* [illegalPropNameErrors](_schema_schemaerrors_.md#illegalpropnameerrors)
* [illegalTagNameErrors](_schema_schemaerrors_.md#illegaltagnameerrors)
* [schemaErrors](_schema_schemaerrors_.md#schemaerrors)
* [undefinedBlockTagErrors](_schema_schemaerrors_.md#undefinedblocktagerrors)
* [undefinedInlineTagErrors](_schema_schemaerrors_.md#undefinedinlinetagerrors)

## Functions

###  duplicatePropAssignmentErrors

▸ **duplicatePropAssignmentErrors**(`tag`: string, `props`: Array‹object›): *[DuplicatePropAssignmentError](../classes/_schema_errors_.duplicatepropassignmenterror.md)[]*

*Defined in [schema/schemaErrors.ts:106](https://github.com/hashml/hashml/blob/6983021/src/schema/schemaErrors.ts#L106)*

**Parameters:**

Name | Type |
------ | ------ |
`tag` | string |
`props` | Array‹object› |

**Returns:** *[DuplicatePropAssignmentError](../classes/_schema_errors_.duplicatepropassignmenterror.md)[]*

___

###  duplicatePropNameErrors

▸ **duplicatePropNameErrors**(`tag`: string, `propNames`: string[]): *[DuplicatePropNameError](../classes/_schema_errors_.duplicatepropnameerror.md)[]*

*Defined in [schema/schemaErrors.ts:97](https://github.com/hashml/hashml/blob/6983021/src/schema/schemaErrors.ts#L97)*

**Parameters:**

Name | Type |
------ | ------ |
`tag` | string |
`propNames` | string[] |

**Returns:** *[DuplicatePropNameError](../classes/_schema_errors_.duplicatepropnameerror.md)[]*

___

###  illegalPropNameErrors

▸ **illegalPropNameErrors**(`tag`: string, `propNames`: string[]): *[IllegalPropNameError](../classes/_schema_errors_.illegalpropnameerror.md)[]*

*Defined in [schema/schemaErrors.ts:124](https://github.com/hashml/hashml/blob/6983021/src/schema/schemaErrors.ts#L124)*

**Parameters:**

Name | Type |
------ | ------ |
`tag` | string |
`propNames` | string[] |

**Returns:** *[IllegalPropNameError](../classes/_schema_errors_.illegalpropnameerror.md)[]*

___

###  illegalTagNameErrors

▸ **illegalTagNameErrors**(`tag`: string): *[IllegalTagNameError](../classes/_schema_errors_.illegaltagnameerror.md)[]*

*Defined in [schema/schemaErrors.ts:154](https://github.com/hashml/hashml/blob/6983021/src/schema/schemaErrors.ts#L154)*

**Parameters:**

Name | Type |
------ | ------ |
`tag` | string |

**Returns:** *[IllegalTagNameError](../classes/_schema_errors_.illegaltagnameerror.md)[]*

___

###  schemaErrors

▸ **schemaErrors**(`schema`: [SchemaDefinition](../interfaces/_schema_schemadefinition_.schemadefinition.md)): *[SchemaDefinitionError](../classes/_schema_errors_.schemadefinitionerror.md)[]*

*Defined in [schema/schemaErrors.ts:36](https://github.com/hashml/hashml/blob/6983021/src/schema/schemaErrors.ts#L36)*

Check a schema definition for errors. The rules of a schema definition are:

1. All prop names within an element must be different
2. The pairwise intersection of block prop contents must be empty.
3. Prop names may not start with "$"
4. Body props must reference block tags that exist in the schema
5. Head props and args must reference inline tags that exist in the schema
6. Tag names must be "legal": no spaces, no hashtags, no opening brackets

There is an error for each of these rules:

1. [DuplicatePropNameError](../classes/_schema_errors_.duplicatepropnameerror.md)
2. [DuplicatePropAssignmentError](../classes/_schema_errors_.duplicatepropassignmenterror.md)
3. [IllegalPropNameError](../classes/_schema_errors_.illegalpropnameerror.md)
4. [UndefinedBlockTagError](../classes/_schema_errors_.undefinedblocktagerror.md)
5. [UndefinedInlineTagError](../classes/_schema_errors_.undefinedinlinetagerror.md)
6. [IllegalTagNameError](../classes/_schema_errors_.illegaltagnameerror.md)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`schema` | [SchemaDefinition](../interfaces/_schema_schemadefinition_.schemadefinition.md) | Schema definition object. |

**Returns:** *[SchemaDefinitionError](../classes/_schema_errors_.schemadefinitionerror.md)[]*

Array of schema definition errors, or an empty array if no errors were found.

___

###  undefinedBlockTagErrors

▸ **undefinedBlockTagErrors**(`blockTags`: Set‹string›, `tag`: string, `props`: Array‹object›): *[UndefinedBlockTagError](../classes/_schema_errors_.undefinedblocktagerror.md)[]*

*Defined in [schema/schemaErrors.ts:142](https://github.com/hashml/hashml/blob/6983021/src/schema/schemaErrors.ts#L142)*

**Parameters:**

Name | Type |
------ | ------ |
`blockTags` | Set‹string› |
`tag` | string |
`props` | Array‹object› |

**Returns:** *[UndefinedBlockTagError](../classes/_schema_errors_.undefinedblocktagerror.md)[]*

___

###  undefinedInlineTagErrors

▸ **undefinedInlineTagErrors**(`inlineTags`: Set‹string›, `tag`: string, `props`: Array‹object›): *[UndefinedInlineTagError](../classes/_schema_errors_.undefinedinlinetagerror.md)[]*

*Defined in [schema/schemaErrors.ts:130](https://github.com/hashml/hashml/blob/6983021/src/schema/schemaErrors.ts#L130)*

**Parameters:**

Name | Type |
------ | ------ |
`inlineTags` | Set‹string› |
`tag` | string |
`props` | Array‹object› |

**Returns:** *[UndefinedInlineTagError](../classes/_schema_errors_.undefinedinlinetagerror.md)[]*
