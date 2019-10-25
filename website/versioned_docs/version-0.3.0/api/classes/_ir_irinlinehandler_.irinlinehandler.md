---
id: version-0.3.0-_ir_irinlinehandler_.irinlinehandler
title: IRInlineHandler
sidebar_label: IRInlineHandler
original_id: _ir_irinlinehandler_.irinlinehandler
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["ir/IRInlineHandler"](../modules/_ir_irinlinehandler_.md) › [IRInlineHandler](_ir_irinlinehandler_.irinlinehandler.md)

## Hierarchy

* **IRInlineHandler**

## Implements

* [InlineHandler](../interfaces/_parser_inlinehandler_.inlinehandler.md)

## Index

### Constructors

* [constructor](_ir_irinlinehandler_.irinlinehandler.md#constructor)

### Properties

* [inlineElementStack](_ir_irinlinehandler_.irinlinehandler.md#protected-inlineelementstack)
* [inlineGroupStack](_ir_irinlinehandler_.irinlinehandler.md#protected-inlinegroupstack)
* [log](_ir_irinlinehandler_.irinlinehandler.md#private-log)
* [schema](_ir_irinlinehandler_.irinlinehandler.md#private-schema)

### Methods

* [closeArgument](_ir_irinlinehandler_.irinlinehandler.md#closeargument)
* [closeInlineTag](_ir_irinlinehandler_.irinlinehandler.md#closeinlinetag)
* [getResult](_ir_irinlinehandler_.irinlinehandler.md#getresult)
* [openArgument](_ir_irinlinehandler_.irinlinehandler.md#openargument)
* [openInlineTag](_ir_irinlinehandler_.irinlinehandler.md#openinlinetag)
* [pushText](_ir_irinlinehandler_.irinlinehandler.md#pushtext)
* [reset](_ir_irinlinehandler_.irinlinehandler.md#reset)

## Constructors

###  constructor

\+ **new IRInlineHandler**(`schema`: [Schema](_schema_schema_.schema.md), `log`: [ErrorLogger](../modules/_schema_errors_.md#errorlogger)): *[IRInlineHandler](_ir_irinlinehandler_.irinlinehandler.md)*

*Defined in [ir/IRInlineHandler.ts:23](https://github.com/hashml/hashml/blob/6983021/src/ir/IRInlineHandler.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`schema` | [Schema](_schema_schema_.schema.md) |
`log` | [ErrorLogger](../modules/_schema_errors_.md#errorlogger) |

**Returns:** *[IRInlineHandler](_ir_irinlinehandler_.irinlinehandler.md)*

## Properties

### `Protected` inlineElementStack

• **inlineElementStack**: *Array‹object | null›* =  []

*Defined in [ir/IRInlineHandler.ts:19](https://github.com/hashml/hashml/blob/6983021/src/ir/IRInlineHandler.ts#L19)*

___

### `Protected` inlineGroupStack

• **inlineGroupStack**: *Array‹object | null›* =  []

*Defined in [ir/IRInlineHandler.ts:15](https://github.com/hashml/hashml/blob/6983021/src/ir/IRInlineHandler.ts#L15)*

___

### `Private` log

• **log**: *[ErrorLogger](../modules/_schema_errors_.md#errorlogger)*

*Defined in [ir/IRInlineHandler.ts:25](https://github.com/hashml/hashml/blob/6983021/src/ir/IRInlineHandler.ts#L25)*

___

### `Private` schema

• **schema**: *[Schema](_schema_schema_.schema.md)*

*Defined in [ir/IRInlineHandler.ts:25](https://github.com/hashml/hashml/blob/6983021/src/ir/IRInlineHandler.ts#L25)*

## Methods

###  closeArgument

▸ **closeArgument**(): *void*

*Defined in [ir/IRInlineHandler.ts:96](https://github.com/hashml/hashml/blob/6983021/src/ir/IRInlineHandler.ts#L96)*

**Returns:** *void*

___

###  closeInlineTag

▸ **closeInlineTag**(`pos`: [InputPosition](../interfaces/_parser_inputposition_.inputposition.md)): *void*

*Implementation of [InlineHandler](../interfaces/_parser_inlinehandler_.inlinehandler.md)*

*Defined in [ir/IRInlineHandler.ts:67](https://github.com/hashml/hashml/blob/6983021/src/ir/IRInlineHandler.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`pos` | [InputPosition](../interfaces/_parser_inputposition_.inputposition.md) |

**Returns:** *void*

___

###  getResult

▸ **getResult**(): *[IRNodeList](../modules/_ir_irnode_.md#irnodelist)*

*Defined in [ir/IRInlineHandler.ts:27](https://github.com/hashml/hashml/blob/6983021/src/ir/IRInlineHandler.ts#L27)*

**Returns:** *[IRNodeList](../modules/_ir_irnode_.md#irnodelist)*

___

###  openArgument

▸ **openArgument**(`index`: number, `pos`: [InputPosition](../interfaces/_parser_inputposition_.inputposition.md)): *boolean*

*Implementation of [InlineHandler](../interfaces/_parser_inlinehandler_.inlinehandler.md)*

*Defined in [ir/IRInlineHandler.ts:74](https://github.com/hashml/hashml/blob/6983021/src/ir/IRInlineHandler.ts#L74)*

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |
`pos` | [InputPosition](../interfaces/_parser_inputposition_.inputposition.md) |

**Returns:** *boolean*

___

###  openInlineTag

▸ **openInlineTag**(`tag`: string, `pos`: [InputPosition](../interfaces/_parser_inputposition_.inputposition.md)): *void*

*Implementation of [InlineHandler](../interfaces/_parser_inlinehandler_.inlinehandler.md)*

*Defined in [ir/IRInlineHandler.ts:37](https://github.com/hashml/hashml/blob/6983021/src/ir/IRInlineHandler.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`tag` | string |
`pos` | [InputPosition](../interfaces/_parser_inputposition_.inputposition.md) |

**Returns:** *void*

___

###  pushText

▸ **pushText**(`content`: string): *void*

*Implementation of [InlineHandler](../interfaces/_parser_inlinehandler_.inlinehandler.md)*

*Defined in [ir/IRInlineHandler.ts:103](https://github.com/hashml/hashml/blob/6983021/src/ir/IRInlineHandler.ts#L103)*

**Parameters:**

Name | Type |
------ | ------ |
`content` | string |

**Returns:** *void*

___

###  reset

▸ **reset**(`rootSchema`: [ArgSchema](_schema_schema_.argschema.md)): *void*

*Defined in [ir/IRInlineHandler.ts:31](https://github.com/hashml/hashml/blob/6983021/src/ir/IRInlineHandler.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`rootSchema` | [ArgSchema](_schema_schema_.argschema.md) |

**Returns:** *void*
