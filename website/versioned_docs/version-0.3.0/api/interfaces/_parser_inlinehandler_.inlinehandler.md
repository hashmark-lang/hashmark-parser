---
id: version-0.3.0-_parser_inlinehandler_.inlinehandler
title: InlineHandler
sidebar_label: InlineHandler
original_id: _parser_inlinehandler_.inlinehandler
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["parser/InlineHandler"](../modules/_parser_inlinehandler_.md) › [InlineHandler](_parser_inlinehandler_.inlinehandler.md)

## Hierarchy

* **InlineHandler**

## Implemented by

* [IRInlineHandler](../classes/_ir_irinlinehandler_.irinlinehandler.md)

## Index

### Methods

* [closeArgument](_parser_inlinehandler_.inlinehandler.md#closeargument)
* [closeInlineTag](_parser_inlinehandler_.inlinehandler.md#closeinlinetag)
* [openArgument](_parser_inlinehandler_.inlinehandler.md#openargument)
* [openInlineTag](_parser_inlinehandler_.inlinehandler.md#openinlinetag)
* [pushText](_parser_inlinehandler_.inlinehandler.md#pushtext)

## Methods

###  closeArgument

▸ **closeArgument**(`pos`: [InputPosition](_parser_inputposition_.inputposition.md)): *void*

*Defined in [parser/InlineHandler.ts:7](https://github.com/hashml/hashml/blob/6983021/src/parser/InlineHandler.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`pos` | [InputPosition](_parser_inputposition_.inputposition.md) |

**Returns:** *void*

___

###  closeInlineTag

▸ **closeInlineTag**(`pos`: [InputPosition](_parser_inputposition_.inputposition.md)): *void*

*Defined in [parser/InlineHandler.ts:5](https://github.com/hashml/hashml/blob/6983021/src/parser/InlineHandler.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`pos` | [InputPosition](_parser_inputposition_.inputposition.md) |

**Returns:** *void*

___

###  openArgument

▸ **openArgument**(`index`: number, `pos`: [InputPosition](_parser_inputposition_.inputposition.md)): *boolean*

*Defined in [parser/InlineHandler.ts:6](https://github.com/hashml/hashml/blob/6983021/src/parser/InlineHandler.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |
`pos` | [InputPosition](_parser_inputposition_.inputposition.md) |

**Returns:** *boolean*

___

###  openInlineTag

▸ **openInlineTag**(`tag`: string, `pos`: [InputPosition](_parser_inputposition_.inputposition.md)): *void*

*Defined in [parser/InlineHandler.ts:4](https://github.com/hashml/hashml/blob/6983021/src/parser/InlineHandler.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`tag` | string |
`pos` | [InputPosition](_parser_inputposition_.inputposition.md) |

**Returns:** *void*

___

###  pushText

▸ **pushText**(`content`: string): *void*

*Defined in [parser/InlineHandler.ts:8](https://github.com/hashml/hashml/blob/6983021/src/parser/InlineHandler.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`content` | string |

**Returns:** *void*
