---
id: version-0.3.0-_parser_inlineparser_.inlineparser
title: InlineParser
sidebar_label: InlineParser
original_id: _parser_inlineparser_.inlineparser
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["parser/InlineParser"](../modules/_parser_inlineparser_.md) › [InlineParser](_parser_inlineparser_.inlineparser.md)

## Hierarchy

* **InlineParser**

## Index

### Constructors

* [constructor](_parser_inlineparser_.inlineparser.md#constructor)

### Properties

* [handler](_parser_inlineparser_.inlineparser.md#private-handler)
* [isRaw](_parser_inlineparser_.inlineparser.md#private-optional-israw)
* [regex](_parser_inlineparser_.inlineparser.md#private-regex)
* [stack](_parser_inlineparser_.inlineparser.md#private-stack)
* [sugarsByStart](_parser_inlineparser_.inlineparser.md#private-sugarsbystart)

### Methods

* [close](_parser_inlineparser_.inlineparser.md#private-close)
* [handleToken](_parser_inlineparser_.inlineparser.md#private-handletoken)
* [isRawEnd](_parser_inlineparser_.inlineparser.md#private-israwend)
* [open](_parser_inlineparser_.inlineparser.md#private-open)
* [openArg](_parser_inlineparser_.inlineparser.md#private-openarg)
* [parse](_parser_inlineparser_.inlineparser.md#parse)

### Object literals

* [inlineTagSyntax](_parser_inlineparser_.inlineparser.md#private-inlinetagsyntax)

## Constructors

###  constructor

\+ **new InlineParser**(`handler`: [InlineHandler](../interfaces/_parser_inlinehandler_.inlinehandler.md), `sugars`: [Sugar](../interfaces/_parser_sugar_.sugar.md)[]): *[InlineParser](_parser_inlineparser_.inlineparser.md)*

*Defined in [parser/InlineParser.ts:21](https://github.com/hashml/hashml/blob/6983021/src/parser/InlineParser.ts#L21)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`handler` | [InlineHandler](../interfaces/_parser_inlinehandler_.inlinehandler.md) | - |
`sugars` | [Sugar](../interfaces/_parser_sugar_.sugar.md)[] |  [] |

**Returns:** *[InlineParser](_parser_inlineparser_.inlineparser.md)*

## Properties

### `Private` handler

• **handler**: *[InlineHandler](../interfaces/_parser_inlinehandler_.inlinehandler.md)*

*Defined in [parser/InlineParser.ts:23](https://github.com/hashml/hashml/blob/6983021/src/parser/InlineParser.ts#L23)*

___

### `Private` `Optional` isRaw

• **isRaw**? : *undefined | false | true*

*Defined in [parser/InlineParser.ts:21](https://github.com/hashml/hashml/blob/6983021/src/parser/InlineParser.ts#L21)*

___

### `Private` regex

• **regex**: *RegExp*

*Defined in [parser/InlineParser.ts:13](https://github.com/hashml/hashml/blob/6983021/src/parser/InlineParser.ts#L13)*

___

### `Private` stack

• **stack**: *Array‹object›* =  []

*Defined in [parser/InlineParser.ts:17](https://github.com/hashml/hashml/blob/6983021/src/parser/InlineParser.ts#L17)*

___

### `Private` sugarsByStart

• **sugarsByStart**: *Map‹string, [Sugar](../interfaces/_parser_sugar_.sugar.md)›*

*Defined in [parser/InlineParser.ts:20](https://github.com/hashml/hashml/blob/6983021/src/parser/InlineParser.ts#L20)*

## Methods

### `Private` close

▸ **close**(`index`: number, `pos`: [InputPosition](../interfaces/_parser_inputposition_.inputposition.md)): *void*

*Defined in [parser/InlineParser.ts:118](https://github.com/hashml/hashml/blob/6983021/src/parser/InlineParser.ts#L118)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`index` | number |  this.stack.length - 1 |
`pos` | [InputPosition](../interfaces/_parser_inputposition_.inputposition.md) | - |

**Returns:** *void*

___

### `Private` handleToken

▸ **handleToken**(`token`: string, `pos`: [InputPosition](../interfaces/_parser_inputposition_.inputposition.md)): *void*

*Defined in [parser/InlineParser.ts:60](https://github.com/hashml/hashml/blob/6983021/src/parser/InlineParser.ts#L60)*

Handles escaped characters, inline sugar and inline tags

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`token` | string | string containing the token |
`pos` | [InputPosition](../interfaces/_parser_inputposition_.inputposition.md) | - |

**Returns:** *void*

___

### `Private` isRawEnd

▸ **isRawEnd**(`token`: string): *boolean*

*Defined in [parser/InlineParser.ts:127](https://github.com/hashml/hashml/blob/6983021/src/parser/InlineParser.ts#L127)*

**Parameters:**

Name | Type |
------ | ------ |
`token` | string |

**Returns:** *boolean*

___

### `Private` open

▸ **open**(`tag`: string, `syntax`: [InlineSyntax](../interfaces/_parser_inlineparser_.inlinesyntax.md), `pos`: [InputPosition](../interfaces/_parser_inputposition_.inputposition.md), `closed`: boolean): *void*

*Defined in [parser/InlineParser.ts:103](https://github.com/hashml/hashml/blob/6983021/src/parser/InlineParser.ts#L103)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`tag` | string | - |
`syntax` | [InlineSyntax](../interfaces/_parser_inlineparser_.inlinesyntax.md) | - |
`pos` | [InputPosition](../interfaces/_parser_inputposition_.inputposition.md) | - |
`closed` | boolean | false |

**Returns:** *void*

___

### `Private` openArg

▸ **openArg**(`pos`: [InputPosition](../interfaces/_parser_inputposition_.inputposition.md)): *void*

*Defined in [parser/InlineParser.ts:111](https://github.com/hashml/hashml/blob/6983021/src/parser/InlineParser.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`pos` | [InputPosition](../interfaces/_parser_inputposition_.inputposition.md) |

**Returns:** *void*

___

###  parse

▸ **parse**(`input`: string, `pos`: [InputPosition](../interfaces/_parser_inputposition_.inputposition.md)): *void*

*Defined in [parser/InlineParser.ts:37](https://github.com/hashml/hashml/blob/6983021/src/parser/InlineParser.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`input` | string |
`pos` | [InputPosition](../interfaces/_parser_inputposition_.inputposition.md) |

**Returns:** *void*

## Object literals

### `Private` inlineTagSyntax

### ▪ **inlineTagSyntax**: *object*

*Defined in [parser/InlineParser.ts:15](https://github.com/hashml/hashml/blob/6983021/src/parser/InlineParser.ts#L15)*

###  end

• **end**: *string* = "]"

*Defined in [parser/InlineParser.ts:15](https://github.com/hashml/hashml/blob/6983021/src/parser/InlineParser.ts#L15)*

###  separator

• **separator**: *string* = "]["

*Defined in [parser/InlineParser.ts:15](https://github.com/hashml/hashml/blob/6983021/src/parser/InlineParser.ts#L15)*
