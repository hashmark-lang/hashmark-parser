---
id: version-0.3.0-_schema_schemadefinition_.bodypropdefinitions
title: BodyPropDefinitions
sidebar_label: BodyPropDefinitions
original_id: _schema_schemadefinition_.bodypropdefinitions
---

[@hashml/hashml](../index.md) › [Globals](../globals.md) › ["schema/SchemaDefinition"](../modules/_schema_schemadefinition_.md) › [BodyPropDefinitions](_schema_schemadefinition_.bodypropdefinitions.md)

Object defining which prop holds which tag, and with which cardinality
Note that a tag may be assigned to one prop at most. Failure to do so
will yield a [DuplicatePropAssignmentError](../classes/_schema_errors_.duplicatepropassignmenterror.md).

## Hierarchy

* **BodyPropDefinitions**

## Indexable

* \[ **propName**: *string*\]: object

Object defining which prop holds which tag, and with which cardinality
Note that a tag may be assigned to one prop at most. Failure to do so
will yield a [DuplicatePropAssignmentError](../classes/_schema_errors_.duplicatepropassignmenterror.md).

* \[ **tagName**: *string*\]: [Cardinality](_schema_cardinality_.cardinality.md)

The referenced tag must be a block tag
