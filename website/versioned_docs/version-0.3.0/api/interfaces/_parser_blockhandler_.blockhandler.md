---
id: version-0.3.0-_parser_blockhandler_.blockhandler
title: BlockHandler
sidebar_label: BlockHandler
original_id: _parser_blockhandler_.blockhandler
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["parser/BlockHandler"](../modules/_parser_blockhandler_.md) › [BlockHandler](_parser_blockhandler_.blockhandler.md)

A `BlockHandler` builds a data structure from instructions from the [BlockParser](../classes/_parser_blockparser_.blockparser.md).

## Hierarchy

* **BlockHandler**

## Implemented by

* [IRBlockHandler](../classes/_ir_irblockhandler_.irblockhandler.md)

## Index

### Methods

* [closeBlock](_parser_blockhandler_.blockhandler.md#closeblock)
* [head](_parser_blockhandler_.blockhandler.md#head)
* [openBlock](_parser_blockhandler_.blockhandler.md#openblock)
* [rawLine](_parser_blockhandler_.blockhandler.md#rawline)

## Methods

###  closeBlock

▸ **closeBlock**(`pos`: [InputPosition](_parser_inputposition_.inputposition.md)): *void*

*Defined in [parser/BlockHandler.ts:33](https://github.com/hashml/hashml/blob/6983021/src/parser/BlockHandler.ts#L33)*

Close the currently open block.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`pos` | [InputPosition](_parser_inputposition_.inputposition.md) | start position of the block  |

**Returns:** *void*

___

###  head

▸ **head**(`content`: string, `pos`: [InputPosition](_parser_inputposition_.inputposition.md)): *void*

*Defined in [parser/BlockHandler.ts:26](https://github.com/hashml/hashml/blob/6983021/src/parser/BlockHandler.ts#L26)*

Receive the head content of the currently open block.

It is the responsibility of the block handler to further parse the head content
(i.e. call the [InlineParser](../classes/_parser_inlineparser_.inlineparser.md) if needed).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`content` | string | raw content of the head |
`pos` | [InputPosition](_parser_inputposition_.inputposition.md) | position of the head content  |

**Returns:** *void*

___

###  openBlock

▸ **openBlock**(`tag`: string | undefined, `pos`: [InputPosition](_parser_inputposition_.inputposition.md)): *boolean*

*Defined in [parser/BlockHandler.ts:15](https://github.com/hashml/hashml/blob/6983021/src/parser/BlockHandler.ts#L15)*

Open a block tag.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tag` | string &#124; undefined | name of the tag, or `undefined` if the tag is not explicitly named |
`pos` | [InputPosition](_parser_inputposition_.inputposition.md) | position of the start of the block  |

**Returns:** *boolean*

`true` if the block body is parsed, `false` otherwise

___

###  rawLine

▸ **rawLine**(`content`: string, `pos`: [InputPosition](_parser_inputposition_.inputposition.md)): *void*

*Defined in [parser/BlockHandler.ts:40](https://github.com/hashml/hashml/blob/6983021/src/parser/BlockHandler.ts#L40)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`content` | string | - |
`pos` | [InputPosition](_parser_inputposition_.inputposition.md) |   |

**Returns:** *void*
