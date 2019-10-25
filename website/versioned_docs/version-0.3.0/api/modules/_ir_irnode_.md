---
id: version-0.3.0-_ir_irnode_
title: ir/IRNode
sidebar_label: ir/IRNode
original_id: _ir_irnode_
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["ir/IRNode"](_ir_irnode_.md)

## Index

### Interfaces

* [IRNode](../interfaces/_ir_irnode_.irnode.md)

### Type aliases

* [IRNodeList](_ir_irnode_.md#irnodelist)
* [Prop](_ir_irnode_.md#prop)
* [Quantified](_ir_irnode_.md#quantified)

### Functions

* [isValidPropName](_ir_irnode_.md#isvalidpropname)

## Type aliases

###  IRNodeList

Ƭ **IRNodeList**: *Array‹string | [IRNode](../interfaces/_ir_irnode_.irnode.md)›*

*Defined in [ir/IRNode.ts:8](https://github.com/hashml/hashml/blob/6983021/src/ir/IRNode.ts#L8)*

___

###  Prop

Ƭ **Prop**: *string | URL | Date | Array‹[IRNode](../interfaces/_ir_irnode_.irnode.md) | string› | [Quantified](_ir_irnode_.md#quantified)‹[IRNode](../interfaces/_ir_irnode_.irnode.md)›*

*Defined in [ir/IRNode.ts:10](https://github.com/hashml/hashml/blob/6983021/src/ir/IRNode.ts#L10)*

___

###  Quantified

Ƭ **Quantified**: *T | [T, Array] | null | T | T[]*

*Defined in [ir/IRNode.ts:17](https://github.com/hashml/hashml/blob/6983021/src/ir/IRNode.ts#L17)*

## Functions

###  isValidPropName

▸ **isValidPropName**(`name`: string): *boolean*

*Defined in [ir/IRNode.ts:23](https://github.com/hashml/hashml/blob/6983021/src/ir/IRNode.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *boolean*
