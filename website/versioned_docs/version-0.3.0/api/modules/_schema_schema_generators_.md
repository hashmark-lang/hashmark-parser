---
id: version-0.3.0-_schema_schema_generators_
title: schema/schema-generators
sidebar_label: schema/schema-generators
original_id: _schema_schema_generators_
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/schema-generators"](_schema_schema_generators_.md)

## Index

### Cardinality Functions

* [one](_schema_schema_generators_.md#one)
* [oneOrMore](_schema_schema_generators_.md#oneormore)
* [optional](_schema_schema_generators_.md#optional)
* [zeroOrMore](_schema_schema_generators_.md#zeroormore)

### Other Functions

* [blockTag](_schema_schema_generators_.md#blocktag)
* [dateArg](_schema_schema_generators_.md#datearg)
* [dateTag](_schema_schema_generators_.md#datetag)
* [inline](_schema_schema_generators_.md#inline)
* [inlineSugar](_schema_schema_generators_.md#inlinesugar)
* [lineTag](_schema_schema_generators_.md#linetag)
* [parsedArg](_schema_schema_generators_.md#parsedarg)
* [rawBodyTag](_schema_schema_generators_.md#rawbodytag)
* [root](_schema_schema_generators_.md#root)
* [stringArg](_schema_schema_generators_.md#stringarg)
* [stringTag](_schema_schema_generators_.md#stringtag)
* [sugar](_schema_schema_generators_.md#sugar)
* [urlArg](_schema_schema_generators_.md#urlarg)
* [urlTag](_schema_schema_generators_.md#urltag)

### Prop Functions

* [prop](_schema_schema_generators_.md#prop)
* [props](_schema_schema_generators_.md#props)

## Cardinality Functions

###  one

▸ **one**(`tag`: string): *object*

*Defined in [schema/schema-generators.ts:50](https://github.com/hashml/hashml/blob/6983021/src/schema/schema-generators.ts#L50)*

Allow a tag to appear exactly once within a prop.

Usage example:

```ts
prop("content", one("bar"))
```

This defines a `content` prop that may contain only exactly one occurrence of `#bar`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tag` | string | Name of the tag to allow |

**Returns:** *object*

A cardinality rule for a prop in a block body

* \[ **tag**: *string*\]: [Cardinality](../interfaces/_schema_cardinality_.cardinality.md)

___

###  oneOrMore

▸ **oneOrMore**(`tag`: string): *object*

*Defined in [schema/schema-generators.ts:31](https://github.com/hashml/hashml/blob/6983021/src/schema/schema-generators.ts#L31)*

Allow a tag to appear once or more within a prop.

Usage example:

```ts
prop("content", oneOrMore("bar"))
```

This defines a `content` prop that may contain one or more occurrences of `#bar`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tag` | string | Name of the tag to allow |

**Returns:** *object*

A cardinality rule for a prop in a block body

* \[ **tag**: *string*\]: [Cardinality](../interfaces/_schema_cardinality_.cardinality.md)

___

###  optional

▸ **optional**(`tag`: string): *object*

*Defined in [schema/schema-generators.ts:88](https://github.com/hashml/hashml/blob/6983021/src/schema/schema-generators.ts#L88)*

Allow a tag to appear at most once.

Usage example:

```ts
prop("content", optional("bar"))
```

This defines a `content` prop that may contain zero or one occurrences of `#bar`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tag` | string | Name of the tag to allow |

**Returns:** *object*

A cardinality rule for a prop in a block body

* \[ **tag**: *string*\]: [Cardinality](../interfaces/_schema_cardinality_.cardinality.md)

___

###  zeroOrMore

▸ **zeroOrMore**(`tag`: string): *object*

*Defined in [schema/schema-generators.ts:69](https://github.com/hashml/hashml/blob/6983021/src/schema/schema-generators.ts#L69)*

Allow a tag to appear any number of times within a prop.

Usage example:

```ts
prop("content", zeroOrMore("bar"))
```

This defines a `content` prop that may contain any number of `#bar`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tag` | string | Name of the tag to allow |

**Returns:** *object*

A cardinality rule for a prop in a block body

* \[ **tag**: *string*\]: [Cardinality](../interfaces/_schema_cardinality_.cardinality.md)

___

## Other Functions

###  blockTag

▸ **blockTag**(`head?`: [ArgDefinition](_schema_schemadefinition_.md#argdefinition), `body?`: [BodyPropDefinitions](../interfaces/_schema_schemadefinition_.bodypropdefinitions.md), `defaultTag?`: undefined | string): *[ParsedBlockDefinition](../interfaces/_schema_schemadefinition_.parsedblockdefinition.md)*

*Defined in [schema/schema-generators.ts:121](https://github.com/hashml/hashml/blob/6983021/src/schema/schema-generators.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`head?` | [ArgDefinition](_schema_schemadefinition_.md#argdefinition) |
`body?` | [BodyPropDefinitions](../interfaces/_schema_schemadefinition_.bodypropdefinitions.md) |
`defaultTag?` | undefined &#124; string |

**Returns:** *[ParsedBlockDefinition](../interfaces/_schema_schemadefinition_.parsedblockdefinition.md)*

___

###  dateArg

▸ **dateArg**(`name`: string): *[ArgDefinition](_schema_schemadefinition_.md#argdefinition)*

*Defined in [schema/schema-generators.ts:192](https://github.com/hashml/hashml/blob/6983021/src/schema/schema-generators.ts#L192)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *[ArgDefinition](_schema_schemadefinition_.md#argdefinition)*

___

###  dateTag

▸ **dateTag**(`propName`: string): *[ParsedBlockDefinition](../interfaces/_schema_schemadefinition_.parsedblockdefinition.md)*

*Defined in [schema/schema-generators.ts:113](https://github.com/hashml/hashml/blob/6983021/src/schema/schema-generators.ts#L113)*

**Parameters:**

Name | Type |
------ | ------ |
`propName` | string |

**Returns:** *[ParsedBlockDefinition](../interfaces/_schema_schemadefinition_.parsedblockdefinition.md)*

___

###  inline

▸ **inline**(...`args`: [ArgDefinition](_schema_schemadefinition_.md#argdefinition)[]): *[InlineDefinition](../interfaces/_schema_schemadefinition_.inlinedefinition.md)*

*Defined in [schema/schema-generators.ts:204](https://github.com/hashml/hashml/blob/6983021/src/schema/schema-generators.ts#L204)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | [ArgDefinition](_schema_schemadefinition_.md#argdefinition)[] |

**Returns:** *[InlineDefinition](../interfaces/_schema_schemadefinition_.inlinedefinition.md)*

___

###  inlineSugar

▸ **inlineSugar**(`sugarSyntax`: [SugarSyntax](../interfaces/_parser_sugar_.sugarsyntax.md), ...`args`: [ArgDefinition](_schema_schemadefinition_.md#argdefinition)[]): *[InlineDefinition](../interfaces/_schema_schemadefinition_.inlinedefinition.md)*

*Defined in [schema/schema-generators.ts:208](https://github.com/hashml/hashml/blob/6983021/src/schema/schema-generators.ts#L208)*

**Parameters:**

Name | Type |
------ | ------ |
`sugarSyntax` | [SugarSyntax](../interfaces/_parser_sugar_.sugarsyntax.md) |
`...args` | [ArgDefinition](_schema_schemadefinition_.md#argdefinition)[] |

**Returns:** *[InlineDefinition](../interfaces/_schema_schemadefinition_.inlinedefinition.md)*

___

###  lineTag

▸ **lineTag**(`propName`: string, `content`: string[]): *[ParsedBlockDefinition](../interfaces/_schema_schemadefinition_.parsedblockdefinition.md)*

*Defined in [schema/schema-generators.ts:117](https://github.com/hashml/hashml/blob/6983021/src/schema/schema-generators.ts#L117)*

**Parameters:**

Name | Type |
------ | ------ |
`propName` | string |
`content` | string[] |

**Returns:** *[ParsedBlockDefinition](../interfaces/_schema_schemadefinition_.parsedblockdefinition.md)*

___

###  parsedArg

▸ **parsedArg**(`name`: string, `content`: string[]): *[ArgDefinition](_schema_schemadefinition_.md#argdefinition)*

*Defined in [schema/schema-generators.ts:196](https://github.com/hashml/hashml/blob/6983021/src/schema/schema-generators.ts#L196)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`content` | string[] |

**Returns:** *[ArgDefinition](_schema_schemadefinition_.md#argdefinition)*

___

###  rawBodyTag

▸ **rawBodyTag**(`rawPropName`: string, `head?`: [ArgDefinition](_schema_schemadefinition_.md#argdefinition)): *[RawBlockDefinition](../interfaces/_schema_schemadefinition_.rawblockdefinition.md)*

*Defined in [schema/schema-generators.ts:136](https://github.com/hashml/hashml/blob/6983021/src/schema/schema-generators.ts#L136)*

**Parameters:**

Name | Type |
------ | ------ |
`rawPropName` | string |
`head?` | [ArgDefinition](_schema_schemadefinition_.md#argdefinition) |

**Returns:** *[RawBlockDefinition](../interfaces/_schema_schemadefinition_.rawblockdefinition.md)*

___

###  root

▸ **root**(`body`: [BodyPropDefinitions](../interfaces/_schema_schemadefinition_.bodypropdefinitions.md), `defaultTag?`: string | undefined): *[RootDefinition](../interfaces/_schema_schemadefinition_.rootdefinition.md)*

*Defined in [schema/schema-generators.ts:96](https://github.com/hashml/hashml/blob/6983021/src/schema/schema-generators.ts#L96)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | [BodyPropDefinitions](../interfaces/_schema_schemadefinition_.bodypropdefinitions.md) |
`defaultTag?` | string &#124; undefined |

**Returns:** *[RootDefinition](../interfaces/_schema_schemadefinition_.rootdefinition.md)*

___

###  stringArg

▸ **stringArg**(`name`: string): *[ArgDefinition](_schema_schemadefinition_.md#argdefinition)*

*Defined in [schema/schema-generators.ts:186](https://github.com/hashml/hashml/blob/6983021/src/schema/schema-generators.ts#L186)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *[ArgDefinition](_schema_schemadefinition_.md#argdefinition)*

___

###  stringTag

▸ **stringTag**(`propName`: string): *[ParsedBlockDefinition](../interfaces/_schema_schemadefinition_.parsedblockdefinition.md)*

*Defined in [schema/schema-generators.ts:105](https://github.com/hashml/hashml/blob/6983021/src/schema/schema-generators.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`propName` | string |

**Returns:** *[ParsedBlockDefinition](../interfaces/_schema_schemadefinition_.parsedblockdefinition.md)*

___

###  sugar

▸ **sugar**(`start`: string, `end`: string): *[SugarSyntax](../interfaces/_parser_sugar_.sugarsyntax.md)*

*Defined in [schema/schema-generators.ts:212](https://github.com/hashml/hashml/blob/6983021/src/schema/schema-generators.ts#L212)*

**Parameters:**

Name | Type |
------ | ------ |
`start` | string |
`end` | string |

**Returns:** *[SugarSyntax](../interfaces/_parser_sugar_.sugarsyntax.md)*

▸ **sugar**(`start`: string, `separator`: string, `end`: string): *[SugarSyntax](../interfaces/_parser_sugar_.sugarsyntax.md)*

*Defined in [schema/schema-generators.ts:214](https://github.com/hashml/hashml/blob/6983021/src/schema/schema-generators.ts#L214)*

**Parameters:**

Name | Type |
------ | ------ |
`start` | string |
`separator` | string |
`end` | string |

**Returns:** *[SugarSyntax](../interfaces/_parser_sugar_.sugarsyntax.md)*

___

###  urlArg

▸ **urlArg**(`name`: string): *[ArgDefinition](_schema_schemadefinition_.md#argdefinition)*

*Defined in [schema/schema-generators.ts:189](https://github.com/hashml/hashml/blob/6983021/src/schema/schema-generators.ts#L189)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *[ArgDefinition](_schema_schemadefinition_.md#argdefinition)*

___

###  urlTag

▸ **urlTag**(`propName`: string): *[ParsedBlockDefinition](../interfaces/_schema_schemadefinition_.parsedblockdefinition.md)*

*Defined in [schema/schema-generators.ts:109](https://github.com/hashml/hashml/blob/6983021/src/schema/schema-generators.ts#L109)*

**Parameters:**

Name | Type |
------ | ------ |
`propName` | string |

**Returns:** *[ParsedBlockDefinition](../interfaces/_schema_schemadefinition_.parsedblockdefinition.md)*

___

## Prop Functions

###  prop

▸ **prop**(`name`: string, ...`content`: Array‹object›): *[BodyPropDefinitions](../interfaces/_schema_schemadefinition_.bodypropdefinitions.md)*

*Defined in [schema/schema-generators.ts:166](https://github.com/hashml/hashml/blob/6983021/src/schema/schema-generators.ts#L166)*

Define a prop and its content.

Usage example:

```ts
prop("content", zeroOrMore("foo"), optional("bar"))
```

This defines a `content` prop that may contain any number of `#foo` and optionally a `#bar`.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | Name of the prop |
`...content` | Array‹object› | Array of allowed content. See Cardinality Functions. |

**Returns:** *[BodyPropDefinitions](../interfaces/_schema_schemadefinition_.bodypropdefinitions.md)*

___

###  props

▸ **props**(...`bodyProps`: [BodyPropDefinitions](../interfaces/_schema_schemadefinition_.bodypropdefinitions.md)[]): *[BodyPropDefinitions](../interfaces/_schema_schemadefinition_.bodypropdefinitions.md)*

*Defined in [schema/schema-generators.ts:178](https://github.com/hashml/hashml/blob/6983021/src/schema/schema-generators.ts#L178)*

Unite multiple props into a single [BodyPropDefinitions](../interfaces/_schema_schemadefinition_.bodypropdefinitions.md) object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...bodyProps` | [BodyPropDefinitions](../interfaces/_schema_schemadefinition_.bodypropdefinitions.md)[] | spread array of [BodyPropDefinitions](../interfaces/_schema_schemadefinition_.bodypropdefinitions.md) |

**Returns:** *[BodyPropDefinitions](../interfaces/_schema_schemadefinition_.bodypropdefinitions.md)*
