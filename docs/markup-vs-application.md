---
title: Markup language vs application
sidebar_label: Markup language vs applications
id: markup-language-vs-applications
---

HashML is a **markup language**: it's a general-purpose language that can be used for a variety of applications. The HashML project consists of the language design, and an implementation of a parser for HashML documents.

While there are many possible uses of HashML, one of our main goals for HashML was to be able to implement [HashDocs](https://github.com/hashml/hashdocs), a language for writing structured documents; HashDocs is just one **application** of HashML. 

**Schemas** define an application from the general markup language. In the case of HashDocs, for instance, the HashDocs schema defines a set of supported tags, and specifies which tags are legal in which context.


## Comparison with XML
The XML **markup language** defines the general language semantics: for instance, it defines `<` and `>` brackets as delimiters for tags, and defines the semantics for encoding tag attributes. In other words, the XML specification contains all the information needed to write a lexical analyzer.

DTD is a **schema language**. Just like XML defines the semantics for writing documents, DTD defines the semantics for writing schemas. These semantics allow us to write schema documents (also commonly referred to as DTDs; we’ll maintain the term schema document or schema file throughout this document).

XHTML is an **application** of XML; it is the subset of XML that is considered legal according to the XHTML 1.0 DTD schema files. Finally, a concrete XML file that can be validated by these DTD schema files is an XHTML document.

| Markup language | Schema        | Application |
| --------------- | ------------- | ----------- |
| XML             | XML DTD       | XHTML       |
| HashML          | HashML schema | HashDocs    |

Equivalently to XML, HashML is a markup language that allows us to mark up text with arbitrary tags, using well-defined semantics. Schemas for HashML are defined in the HashML Schema Language, which is the parallel to XML's DTD. The specific HashML application in which we can author Web documents is HashDocs—it is to HashML what XHTML is to XML. Just like XHTML is defined by the XHTML 1.0 DTD files, HashDocs are defined by the HashDocs schema.
