---
id: version-0.3.0-_typescript_convertschematotypescript_
title: typescript/convertSchemaToTypescript
sidebar_label: typescript/convertSchemaToTypescript
original_id: _typescript_convertschematotypescript_
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["typescript/convertSchemaToTypescript"](_typescript_convertschematotypescript_.md)

## Index

### Variables

* [BLOCK_TYPE](_typescript_convertschematotypescript_.md#const-block_type)
* [INLINE_TYPE](_typescript_convertschematotypescript_.md#const-inline_type)
* [ROOT_TYPE](_typescript_convertschematotypescript_.md#const-root_type)
* [TAG_KEY](_typescript_convertschematotypescript_.md#const-tag_key)
* [TAG_TYPE](_typescript_convertschematotypescript_.md#const-tag_type)

### Functions

* [convertSchemaToTypescript](_typescript_convertschematotypescript_.md#convertschematotypescript)
* [createIdentifierMap](_typescript_convertschematotypescript_.md#createidentifiermap)
* [createTagType](_typescript_convertschematotypescript_.md#createtagtype)
* [identifier](_typescript_convertschematotypescript_.md#identifier)

## Variables

### `Const` BLOCK_TYPE

• **BLOCK_TYPE**: *"Block"* = "Block"

*Defined in [typescript/convertSchemaToTypescript.ts:19](https://github.com/hashml/hashml/blob/6983021/src/typescript/convertSchemaToTypescript.ts#L19)*

___

### `Const` INLINE_TYPE

• **INLINE_TYPE**: *"Inline"* = "Inline"

*Defined in [typescript/convertSchemaToTypescript.ts:20](https://github.com/hashml/hashml/blob/6983021/src/typescript/convertSchemaToTypescript.ts#L20)*

___

### `Const` ROOT_TYPE

• **ROOT_TYPE**: *"Root"* = "Root"

*Defined in [typescript/convertSchemaToTypescript.ts:17](https://github.com/hashml/hashml/blob/6983021/src/typescript/convertSchemaToTypescript.ts#L17)*

___

### `Const` TAG_KEY

• **TAG_KEY**: *"$tag"* = "$tag"

*Defined in [typescript/convertSchemaToTypescript.ts:22](https://github.com/hashml/hashml/blob/6983021/src/typescript/convertSchemaToTypescript.ts#L22)*

___

### `Const` TAG_TYPE

• **TAG_TYPE**: *"Tag"* = "Tag"

*Defined in [typescript/convertSchemaToTypescript.ts:18](https://github.com/hashml/hashml/blob/6983021/src/typescript/convertSchemaToTypescript.ts#L18)*

## Functions

###  convertSchemaToTypescript

▸ **convertSchemaToTypescript**(`schema`: [Schema](../classes/_schema_schema_.schema.md), `definition`: [SchemaDefinition](../interfaces/_schema_schemadefinition_.schemadefinition.md), `importPath`: string): *string*

*Defined in [typescript/convertSchemaToTypescript.ts:24](https://github.com/hashml/hashml/blob/6983021/src/typescript/convertSchemaToTypescript.ts#L24)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`schema` | [Schema](../classes/_schema_schema_.schema.md) | - |
`definition` | [SchemaDefinition](../interfaces/_schema_schemadefinition_.schemadefinition.md) | - |
`importPath` | string | "@hashml/hashml" |

**Returns:** *string*

___

###  createIdentifierMap

▸ **createIdentifierMap**(`names`: string[], `prefix`: string, `suffix`: string): *ReadonlyMap‹string, string›*

*Defined in [typescript/convertSchemaToTypescript.ts:100](https://github.com/hashml/hashml/blob/6983021/src/typescript/convertSchemaToTypescript.ts#L100)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`names` | string[] | - |
`prefix` | string | "" |
`suffix` | string | "" |

**Returns:** *ReadonlyMap‹string, string›*

___

###  createTagType

▸ **createTagType**(`typeName`: string, `tagName`: string, `propsTypeMembers`: string[]): *string*

*Defined in [typescript/convertSchemaToTypescript.ts:112](https://github.com/hashml/hashml/blob/6983021/src/typescript/convertSchemaToTypescript.ts#L112)*

**Parameters:**

Name | Type |
------ | ------ |
`typeName` | string |
`tagName` | string |
`propsTypeMembers` | string[] |

**Returns:** *string*

___

###  identifier

▸ **identifier**(`prefix`: string, `name`: string, `suffix`: string): *string*

*Defined in [typescript/convertSchemaToTypescript.ts:108](https://github.com/hashml/hashml/blob/6983021/src/typescript/convertSchemaToTypescript.ts#L108)*

**Parameters:**

Name | Type |
------ | ------ |
`prefix` | string |
`name` | string |
`suffix` | string |

**Returns:** *string*
