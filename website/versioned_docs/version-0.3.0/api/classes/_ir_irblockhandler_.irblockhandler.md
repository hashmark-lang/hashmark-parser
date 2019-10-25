---
id: version-0.3.0-_ir_irblockhandler_.irblockhandler
title: IRBlockHandler
sidebar_label: IRBlockHandler
original_id: _ir_irblockhandler_.irblockhandler
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["ir/IRBlockHandler"](../modules/_ir_irblockhandler_.md) › [IRBlockHandler](_ir_irblockhandler_.irblockhandler.md)

## Hierarchy

* **IRBlockHandler**

## Implements

* [BlockHandler](../interfaces/_parser_blockhandler_.blockhandler.md)

## Index

### Constructors

* [constructor](_ir_irblockhandler_.irblockhandler.md#constructor)

### Properties

* [ignoreFlag](_ir_irblockhandler_.irblockhandler.md#private-ignoreflag)
* [inlineHandler](_ir_irblockhandler_.irblockhandler.md#private-inlinehandler)
* [inlineParser](_ir_irblockhandler_.irblockhandler.md#private-inlineparser)
* [log](_ir_irblockhandler_.irblockhandler.md#private-log)
* [root](_ir_irblockhandler_.irblockhandler.md#private-root)
* [schema](_ir_irblockhandler_.irblockhandler.md#private-schema)
* [stack](_ir_irblockhandler_.irblockhandler.md#private-stack)

### Methods

* [blockError](_ir_irblockhandler_.irblockhandler.md#private-blockerror)
* [closeBlock](_ir_irblockhandler_.irblockhandler.md#closeblock)
* [getResult](_ir_irblockhandler_.irblockhandler.md#getresult)
* [head](_ir_irblockhandler_.irblockhandler.md#head)
* [openBlock](_ir_irblockhandler_.irblockhandler.md#openblock)
* [pushBlock](_ir_irblockhandler_.irblockhandler.md#private-pushblock)
* [rawLine](_ir_irblockhandler_.irblockhandler.md#rawline)
* [reset](_ir_irblockhandler_.irblockhandler.md#reset)

## Constructors

###  constructor

\+ **new IRBlockHandler**(`schema`: [Schema](_schema_schema_.schema.md), `log`: [ErrorLogger](../modules/_schema_errors_.md#errorlogger)): *[IRBlockHandler](_ir_irblockhandler_.irblockhandler.md)*

*Defined in [ir/IRBlockHandler.ts:28](https://github.com/hashml/hashml/blob/6983021/src/ir/IRBlockHandler.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`schema` | [Schema](_schema_schema_.schema.md) |
`log` | [ErrorLogger](../modules/_schema_errors_.md#errorlogger) |

**Returns:** *[IRBlockHandler](_ir_irblockhandler_.irblockhandler.md)*

## Properties

### `Private` ignoreFlag

• **ignoreFlag**: *boolean* = false

*Defined in [ir/IRBlockHandler.ts:28](https://github.com/hashml/hashml/blob/6983021/src/ir/IRBlockHandler.ts#L28)*

___

### `Private` inlineHandler

• **inlineHandler**: *[IRInlineHandler](_ir_irinlinehandler_.irinlinehandler.md)*

*Defined in [ir/IRBlockHandler.ts:20](https://github.com/hashml/hashml/blob/6983021/src/ir/IRBlockHandler.ts#L20)*

___

### `Private` inlineParser

• **inlineParser**: *[InlineParser](_parser_inlineparser_.inlineparser.md)*

*Defined in [ir/IRBlockHandler.ts:21](https://github.com/hashml/hashml/blob/6983021/src/ir/IRBlockHandler.ts#L21)*

___

### `Private` log

• **log**: *[ErrorLogger](../modules/_schema_errors_.md#errorlogger)*

*Defined in [ir/IRBlockHandler.ts:30](https://github.com/hashml/hashml/blob/6983021/src/ir/IRBlockHandler.ts#L30)*

___

### `Private` root

• **root**: *[IRNode](../interfaces/_ir_irnode_.irnode.md)*

*Defined in [ir/IRBlockHandler.ts:22](https://github.com/hashml/hashml/blob/6983021/src/ir/IRBlockHandler.ts#L22)*

___

### `Private` schema

• **schema**: *[Schema](_schema_schema_.schema.md)*

*Defined in [ir/IRBlockHandler.ts:30](https://github.com/hashml/hashml/blob/6983021/src/ir/IRBlockHandler.ts#L30)*

___

### `Private` stack

• **stack**: *Array‹object›* =  []

*Defined in [ir/IRBlockHandler.ts:23](https://github.com/hashml/hashml/blob/6983021/src/ir/IRBlockHandler.ts#L23)*

## Methods

### `Private` blockError

▸ **blockError**(`error`: [HMError](_schema_errors_.hmerror.md)): *false*

*Defined in [ir/IRBlockHandler.ts:105](https://github.com/hashml/hashml/blob/6983021/src/ir/IRBlockHandler.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`error` | [HMError](_schema_errors_.hmerror.md) |

**Returns:** *false*

___

###  closeBlock

▸ **closeBlock**(): *void*

*Defined in [ir/IRBlockHandler.ts:89](https://github.com/hashml/hashml/blob/6983021/src/ir/IRBlockHandler.ts#L89)*

**Returns:** *void*

___

###  getResult

▸ **getResult**(): *[IRNode](../interfaces/_ir_irnode_.irnode.md)*

*Defined in [ir/IRBlockHandler.ts:42](https://github.com/hashml/hashml/blob/6983021/src/ir/IRBlockHandler.ts#L42)*

**Returns:** *[IRNode](../interfaces/_ir_irnode_.irnode.md)*

___

###  head

▸ **head**(`content`: string, `pos`: [InputPosition](../interfaces/_parser_inputposition_.inputposition.md)): *void*

*Implementation of [BlockHandler](../interfaces/_parser_blockhandler_.blockhandler.md)*

*Defined in [ir/IRBlockHandler.ts:111](https://github.com/hashml/hashml/blob/6983021/src/ir/IRBlockHandler.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`content` | string |
`pos` | [InputPosition](../interfaces/_parser_inputposition_.inputposition.md) |

**Returns:** *void*

___

###  openBlock

▸ **openBlock**(`tagString`: string | undefined, `pos`: [InputPosition](../interfaces/_parser_inputposition_.inputposition.md)): *boolean*

*Implementation of [BlockHandler](../interfaces/_parser_blockhandler_.blockhandler.md)*

*Defined in [ir/IRBlockHandler.ts:57](https://github.com/hashml/hashml/blob/6983021/src/ir/IRBlockHandler.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`tagString` | string &#124; undefined |
`pos` | [InputPosition](../interfaces/_parser_inputposition_.inputposition.md) |

**Returns:** *boolean*

___

### `Private` pushBlock

▸ **pushBlock**(`tag`: string, `schema`: [BlockSchema](_schema_schema_.blockschema.md)): *[IRNode](../interfaces/_ir_irnode_.irnode.md)*

*Defined in [ir/IRBlockHandler.ts:46](https://github.com/hashml/hashml/blob/6983021/src/ir/IRBlockHandler.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`tag` | string |
`schema` | [BlockSchema](_schema_schema_.blockschema.md) |

**Returns:** *[IRNode](../interfaces/_ir_irnode_.irnode.md)*

___

###  rawLine

▸ **rawLine**(`content`: string, `pos`: [InputPosition](../interfaces/_parser_inputposition_.inputposition.md)): *void*

*Implementation of [BlockHandler](../interfaces/_parser_blockhandler_.blockhandler.md)*

*Defined in [ir/IRBlockHandler.ts:130](https://github.com/hashml/hashml/blob/6983021/src/ir/IRBlockHandler.ts#L130)*

**Parameters:**

Name | Type |
------ | ------ |
`content` | string |
`pos` | [InputPosition](../interfaces/_parser_inputposition_.inputposition.md) |

**Returns:** *void*

___

###  reset

▸ **reset**(): *void*

*Defined in [ir/IRBlockHandler.ts:36](https://github.com/hashml/hashml/blob/6983021/src/ir/IRBlockHandler.ts#L36)*

**Returns:** *void*
