---
id: version-0.3.0-_schema_readschema_
title: schema/readSchema
sidebar_label: schema/readSchema
original_id: _schema_readschema_
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/readSchema"](_schema_readschema_.md)

## Index

### Functions

* [convertArgs](_schema_readschema_.md#convertargs)
* [convertBlock](_schema_readschema_.md#convertblock)
* [convertBody](_schema_readschema_.md#convertbody)
* [convertCardinality](_schema_readschema_.md#convertcardinality)
* [convertHead](_schema_readschema_.md#converthead)
* [convertInline](_schema_readschema_.md#convertinline)
* [convertItems](_schema_readschema_.md#convertitems)
* [convertPropContent](_schema_readschema_.md#convertpropcontent)
* [convertRoot](_schema_readschema_.md#convertroot)
* [convertSugar](_schema_readschema_.md#convertsugar)
* [readSchema](_schema_readschema_.md#readschema)

## Functions

###  convertArgs

▸ **convertArgs**(`args`: [ArgsBlock](../interfaces/_schema_schemaschemainterface_.argsblock.md)): *[ArgDefinition](_schema_schemadefinition_.md#argdefinition)[]*

*Defined in [schema/readSchema.ts:111](https://github.com/hashml/hashml/blob/6983021/src/schema/readSchema.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | [ArgsBlock](../interfaces/_schema_schemaschemainterface_.argsblock.md) |

**Returns:** *[ArgDefinition](_schema_schemadefinition_.md#argdefinition)[]*

___

###  convertBlock

▸ **convertBlock**(`block`: [BlockBlock](../interfaces/_schema_schemaschemainterface_.blockblock.md)): *[BlockDefinition](_schema_schemadefinition_.md#blockdefinition)*

*Defined in [schema/readSchema.ts:32](https://github.com/hashml/hashml/blob/6983021/src/schema/readSchema.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`block` | [BlockBlock](../interfaces/_schema_schemaschemainterface_.blockblock.md) |

**Returns:** *[BlockDefinition](_schema_schemadefinition_.md#blockdefinition)*

___

###  convertBody

▸ **convertBody**(`body`: [BodyBlock](../interfaces/_schema_schemaschemainterface_.bodyblock.md)): *[BodyPropDefinitions](../interfaces/_schema_schemadefinition_.bodypropdefinitions.md)*

*Defined in [schema/readSchema.ts:66](https://github.com/hashml/hashml/blob/6983021/src/schema/readSchema.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`body` | [BodyBlock](../interfaces/_schema_schemaschemainterface_.bodyblock.md) |

**Returns:** *[BodyPropDefinitions](../interfaces/_schema_schemadefinition_.bodypropdefinitions.md)*

___

###  convertCardinality

▸ **convertCardinality**(`cardinality`: [OneBlock](../interfaces/_schema_schemaschemainterface_.oneblock.md) | [OneOrMoreBlock](../interfaces/_schema_schemaschemainterface_.oneormoreblock.md) | [OptionalBlock](../interfaces/_schema_schemaschemainterface_.optionalblock.md) | [ZeroOrMoreBlock](../interfaces/_schema_schemaschemainterface_.zeroormoreblock.md)): *[Cardinality](../interfaces/_schema_cardinality_.cardinality.md)*

*Defined in [schema/readSchema.ts:84](https://github.com/hashml/hashml/blob/6983021/src/schema/readSchema.ts#L84)*

**Parameters:**

Name | Type |
------ | ------ |
`cardinality` | [OneBlock](../interfaces/_schema_schemaschemainterface_.oneblock.md) &#124; [OneOrMoreBlock](../interfaces/_schema_schemaschemainterface_.oneormoreblock.md) &#124; [OptionalBlock](../interfaces/_schema_schemaschemainterface_.optionalblock.md) &#124; [ZeroOrMoreBlock](../interfaces/_schema_schemaschemainterface_.zeroormoreblock.md) |

**Returns:** *[Cardinality](../interfaces/_schema_cardinality_.cardinality.md)*

___

###  convertHead

▸ **convertHead**(`head`: [HeadBlock](../interfaces/_schema_schemaschemainterface_.headblock.md)): *[ArgDefinition](_schema_schemadefinition_.md#argdefinition)*

*Defined in [schema/readSchema.ts:43](https://github.com/hashml/hashml/blob/6983021/src/schema/readSchema.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`head` | [HeadBlock](../interfaces/_schema_schemaschemainterface_.headblock.md) |

**Returns:** *[ArgDefinition](_schema_schemadefinition_.md#argdefinition)*

___

###  convertInline

▸ **convertInline**(`inline`: [InlineBlock](../interfaces/_schema_schemaschemainterface_.inlineblock.md)): *[InlineDefinition](../interfaces/_schema_schemadefinition_.inlinedefinition.md)*

*Defined in [schema/readSchema.ts:103](https://github.com/hashml/hashml/blob/6983021/src/schema/readSchema.ts#L103)*

**Parameters:**

Name | Type |
------ | ------ |
`inline` | [InlineBlock](../interfaces/_schema_schemaschemainterface_.inlineblock.md) |

**Returns:** *[InlineDefinition](../interfaces/_schema_schemadefinition_.inlinedefinition.md)*

___

###  convertItems

▸ **convertItems**(`items`: [ItemBlock](../interfaces/_schema_schemaschemainterface_.itemblock.md)[]): *string[]*

*Defined in [schema/readSchema.ts:72](https://github.com/hashml/hashml/blob/6983021/src/schema/readSchema.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`items` | [ItemBlock](../interfaces/_schema_schemaschemainterface_.itemblock.md)[] |

**Returns:** *string[]*

___

###  convertPropContent

▸ **convertPropContent**(`propContent`: Array): *object*

*Defined in [schema/readSchema.ts:76](https://github.com/hashml/hashml/blob/6983021/src/schema/readSchema.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`propContent` | Array |

**Returns:** *object*

* \[ **tag**: *string*\]: [Cardinality](../interfaces/_schema_cardinality_.cardinality.md)

___

###  convertRoot

▸ **convertRoot**(`root`: [RootBlock](../interfaces/_schema_schemaschemainterface_.rootblock.md)): *[RootDefinition](../interfaces/_schema_schemadefinition_.rootdefinition.md)*

*Defined in [schema/readSchema.ts:21](https://github.com/hashml/hashml/blob/6983021/src/schema/readSchema.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`root` | [RootBlock](../interfaces/_schema_schemaschemainterface_.rootblock.md) |

**Returns:** *[RootDefinition](../interfaces/_schema_schemadefinition_.rootdefinition.md)*

___

###  convertSugar

▸ **convertSugar**(`sugar`: [SugarBlock](../interfaces/_schema_schemaschemainterface_.sugarblock.md)): *[SugarSyntax](../interfaces/_parser_sugar_.sugarsyntax.md)*

*Defined in [schema/readSchema.ts:122](https://github.com/hashml/hashml/blob/6983021/src/schema/readSchema.ts#L122)*

**Parameters:**

Name | Type |
------ | ------ |
`sugar` | [SugarBlock](../interfaces/_schema_schemaschemainterface_.sugarblock.md) |

**Returns:** *[SugarSyntax](../interfaces/_parser_sugar_.sugarsyntax.md)*

___

###  readSchema

▸ **readSchema**(`root`: [Root](../interfaces/_schema_schemaschemainterface_.root.md)): *[SchemaDefinition](../interfaces/_schema_schemadefinition_.schemadefinition.md)*

*Defined in [schema/readSchema.ts:13](https://github.com/hashml/hashml/blob/6983021/src/schema/readSchema.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`root` | [Root](../interfaces/_schema_schemaschemainterface_.root.md) |

**Returns:** *[SchemaDefinition](../interfaces/_schema_schemadefinition_.schemadefinition.md)*
