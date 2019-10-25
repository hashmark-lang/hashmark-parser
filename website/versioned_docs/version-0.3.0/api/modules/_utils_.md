---
id: version-0.3.0-_utils_
title: utils
sidebar_label: utils
original_id: _utils_
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["utils"](_utils_.md)

## Index

### Array Functions

* [countOccurrences](_utils_.md#countoccurrences)
* [findDuplicates](_utils_.md#findduplicates)
* [hasDuplicates](_utils_.md#hasduplicates)
* [last](_utils_.md#last)
* [unique](_utils_.md#unique)

### Other Functions

* [capitalize](_utils_.md#capitalize)
* [ordinal](_utils_.md#ordinal)

### RegExp Functions

* [regexpUnion](_utils_.md#regexpunion)
* [stringToRegexp](_utils_.md#stringtoregexp)

## Array Functions

###  countOccurrences

▸ **countOccurrences**<**T**>(`seq`: Iterable‹T›): *Map‹T, number›*

*Defined in [utils.ts:67](https://github.com/hashml/hashml/blob/6983021/src/utils.ts#L67)*

Returns a map of items to their occurrence count.

**Type parameters:**

▪ **T**

Type of the items in the sequence

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`seq` | Iterable‹T› | Sequence items, potentially with duplicates. |

**Returns:** *Map‹T, number›*

___

###  findDuplicates

▸ **findDuplicates**<**T**>(`seq`: Iterable‹T›): *Array‹[T, number]›*

*Defined in [utils.ts:56](https://github.com/hashml/hashml/blob/6983021/src/utils.ts#L56)*

Returns the duplicates in a sequence of items, and their count

**Type parameters:**

▪ **T**

Type of the items in the sequence

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`seq` | Iterable‹T› | Sequence of items, potentially with duplicates. |

**Returns:** *Array‹[T, number]›*

___

###  hasDuplicates

▸ **hasDuplicates**<**T**>(`arr`: T[]): *boolean*

*Defined in [utils.ts:45](https://github.com/hashml/hashml/blob/6983021/src/utils.ts#L45)*

Returns whether an array has duplicate items

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`arr` | T[] | Array of items, potentially with duplicates. |

**Returns:** *boolean*

___

###  last

▸ **last**<**T**>(`seq`: ArrayLike‹T›): *T*

*Defined in [utils.ts:88](https://github.com/hashml/hashml/blob/6983021/src/utils.ts#L88)*

Returns the last item in a sequence.

**`remarks`** 
If the last item does not exist, this function will return `undefined`.
This is coherent with the behavior of arrays in TS, but means that this function should only
be called when we know that a last item exists.

**Type parameters:**

▪ **T**

Type of the items in the sequence

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`seq` | ArrayLike‹T› | String, array, or other array-like sequence |

**Returns:** *T*

___

###  unique

▸ **unique**<**T**>(`seq`: Iterable‹T›): *T[]*

*Defined in [utils.ts:35](https://github.com/hashml/hashml/blob/6983021/src/utils.ts#L35)*

Returns a copy of a sequence with duplicates removed.

**`remarks`** 
Order of the first occurrences is preserved.
To see how this implementation respects that, see [the MDN documentation for `Set`][1].

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#Description

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`seq` | Iterable‹T› | Sequence of items, potentially with duplicates. |

**Returns:** *T[]*

___

## Other Functions

###  capitalize

▸ **capitalize**(`s`: string): *string*

*Defined in [utils.ts:111](https://github.com/hashml/hashml/blob/6983021/src/utils.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`s` | string |

**Returns:** *string*

___

###  ordinal

▸ **ordinal**(`i`: number): *string*

*Defined in [utils.ts:98](https://github.com/hashml/hashml/blob/6983021/src/utils.ts#L98)*

Returns the ordinal form of a number.
For example, the ordinal of 1 is "1st".

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`i` | number | Number to convert to an ordinal.  |

**Returns:** *string*

___

## RegExp Functions

###  regexpUnion

▸ **regexpUnion**(...`regExps`: RegExp[]): *RegExp*

*Defined in [utils.ts:19](https://github.com/hashml/hashml/blob/6983021/src/utils.ts#L19)*

Returns a union of regular expressions, in the given order.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...regExps` | RegExp[] | Array of regular expressions to produce the union of |

**Returns:** *RegExp*

___

###  stringToRegexp

▸ **stringToRegexp**(`regexp`: string): *RegExp*

*Defined in [utils.ts:9](https://github.com/hashml/hashml/blob/6983021/src/utils.ts#L9)*

Convert a string to a regexp, escaping any special characters.

From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`regexp` | string | String that the regex will match. |

**Returns:** *RegExp*
