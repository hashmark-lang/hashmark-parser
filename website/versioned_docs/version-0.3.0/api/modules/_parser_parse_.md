---
id: version-0.3.0-_parser_parse_
title: parser/parse
sidebar_label: parser/parse
original_id: _parser_parse_
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["parser/parse"](_parser_parse_.md)

## Index

### Functions

* [makeParser](_parser_parse_.md#makeparser)
* [parse](_parser_parse_.md#parse)

## Functions

###  makeParser

▸ **makeParser**(`schema`: [SchemaDefinition](../interfaces/_schema_schemadefinition_.schemadefinition.md), `logger`: [ErrorLogger](_schema_errors_.md#errorlogger)): *function*

*Defined in [parser/parse.ts:8](https://github.com/hashml/hashml/blob/6983021/src/parser/parse.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`schema` | [SchemaDefinition](../interfaces/_schema_schemadefinition_.schemadefinition.md) |
`logger` | [ErrorLogger](_schema_errors_.md#errorlogger) |

**Returns:** *function*

▸ (`input`: string): *[IRNode](../interfaces/_ir_irnode_.irnode.md)*

**Parameters:**

Name | Type |
------ | ------ |
`input` | string |

___

###  parse

▸ **parse**(`input`: string, `schema`: [SchemaDefinition](../interfaces/_schema_schemadefinition_.schemadefinition.md), `logger`: [ErrorLogger](_schema_errors_.md#errorlogger)): *[IRNode](../interfaces/_ir_irnode_.irnode.md)*

*Defined in [parser/parse.ts:21](https://github.com/hashml/hashml/blob/6983021/src/parser/parse.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`input` | string |
`schema` | [SchemaDefinition](../interfaces/_schema_schemadefinition_.schemadefinition.md) |
`logger` | [ErrorLogger](_schema_errors_.md#errorlogger) |

**Returns:** *[IRNode](../interfaces/_ir_irnode_.irnode.md)*
