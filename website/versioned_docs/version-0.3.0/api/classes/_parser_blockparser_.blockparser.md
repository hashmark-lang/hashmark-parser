---
id: version-0.3.0-_parser_blockparser_.blockparser
title: BlockParser
sidebar_label: BlockParser
original_id: _parser_blockparser_.blockparser
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["parser/BlockParser"](../modules/_parser_blockparser_.md) › [BlockParser](_parser_blockparser_.blockparser.md)

Parses Hashml blocks. A block is a Hashml tag with a body. For example:

```
#block head
		block content
```

## Hierarchy

* **BlockParser**

## Index

### Constructors

* [constructor](_parser_blockparser_.blockparser.md#constructor)

### Properties

* [handler](_parser_blockparser_.blockparser.md#private-handler)
* [regex](_parser_blockparser_.blockparser.md#private-regex)
* [tagRegex](_parser_blockparser_.blockparser.md#private-tagregex)

### Methods

* [parse](_parser_blockparser_.blockparser.md#parse)

## Constructors

###  constructor

\+ **new BlockParser**(`handler`: [BlockHandler](../interfaces/_parser_blockhandler_.blockhandler.md)): *[BlockParser](_parser_blockparser_.blockparser.md)*

*Defined in [parser/BlockParser.ts:15](https://github.com/hashml/hashml/blob/6983021/src/parser/BlockParser.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`handler` | [BlockHandler](../interfaces/_parser_blockhandler_.blockhandler.md) |

**Returns:** *[BlockParser](_parser_blockparser_.blockparser.md)*

## Properties

### `Private` handler

• **handler**: *[BlockHandler](../interfaces/_parser_blockhandler_.blockhandler.md)*

*Defined in [parser/BlockParser.ts:17](https://github.com/hashml/hashml/blob/6983021/src/parser/BlockParser.ts#L17)*

___

### `Private` regex

• **regex**: *RegExp* =  /(?:\r\n|\n|\r|^)(\t*)(.*)/gm

*Defined in [parser/BlockParser.ts:14](https://github.com/hashml/hashml/blob/6983021/src/parser/BlockParser.ts#L14)*

___

### `Private` tagRegex

• **tagRegex**: *RegExp* =  /(?:#([^ \[\r\n]+)(?: |$))?(.+)?/

*Defined in [parser/BlockParser.ts:15](https://github.com/hashml/hashml/blob/6983021/src/parser/BlockParser.ts#L15)*

## Methods

###  parse

▸ **parse**(`input`: string, `pos`: [InputPosition](../interfaces/_parser_inputposition_.inputposition.md)): *void*

*Defined in [parser/BlockParser.ts:19](https://github.com/hashml/hashml/blob/6983021/src/parser/BlockParser.ts#L19)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`input` | string | - |
`pos` | [InputPosition](../interfaces/_parser_inputposition_.inputposition.md) |  { line: 1, column: 1, length: 0 } |

**Returns:** *void*
