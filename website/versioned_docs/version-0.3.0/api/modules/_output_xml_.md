---
id: version-0.3.0-_output_xml_
title: output/xml
sidebar_label: output/xml
original_id: _output_xml_
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["output/xml"](_output_xml_.md)

## Index

### Functions

* [escapeXML](_output_xml_.md#escapexml)
* [indent](_output_xml_.md#indent)
* [propToXML](_output_xml_.md#proptoxml)
* [toXML](_output_xml_.md#toxml)
* [xmlTag](_output_xml_.md#xmltag)

## Functions

###  escapeXML

▸ **escapeXML**(`str`: string): *string*

*Defined in [output/xml.ts:51](https://github.com/hashml/hashml/blob/6983021/src/output/xml.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *string*

___

###  indent

▸ **indent**(`line`: string, `indentation`: number): *string*

*Defined in [output/xml.ts:61](https://github.com/hashml/hashml/blob/6983021/src/output/xml.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`line` | string |
`indentation` | number |

**Returns:** *string*

___

###  propToXML

▸ **propToXML**(`tag`: string, `content`: [Prop](_ir_irnode_.md#prop), `indentation`: number): *string*

*Defined in [output/xml.ts:21](https://github.com/hashml/hashml/blob/6983021/src/output/xml.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`tag` | string |
`content` | [Prop](_ir_irnode_.md#prop) |
`indentation` | number |

**Returns:** *string*

___

###  toXML

▸ **toXML**(`root`: [IRNode](../interfaces/_ir_irnode_.irnode.md), `indentation`: number): *string*

*Defined in [output/xml.ts:12](https://github.com/hashml/hashml/blob/6983021/src/output/xml.ts#L12)*

Convert an IR tree to an XML string.
Child nodes are indented with a tab `\t` character.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`root` | [IRNode](../interfaces/_ir_irnode_.irnode.md) | - | Root of the IR tree |
`indentation` | number | 0 | Indentation level  |

**Returns:** *string*

Tab-indented XML representation of the IR tree.

___

###  xmlTag

▸ **xmlTag**(`name`: string, `indentation`: number, ...`children`: string[]): *string*

*Defined in [output/xml.ts:40](https://github.com/hashml/hashml/blob/6983021/src/output/xml.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`indentation` | number |
`...children` | string[] |

**Returns:** *string*
