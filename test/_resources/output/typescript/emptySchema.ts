/*! This file was generated by Hashml https://github.com/hashml/hashml */
import { HMError, parse, SchemaDefinition } from "../../../../src";
export type Tag = (Block | Inline);
export type Block = never;
export type Inline = never;

export interface Root {
    $tag: "root";
}
const schema: SchemaDefinition = {
    "root": {
        "rawBody": false,
        "props": {
            "body": {}
        }
    },
    "blocks": {},
    "inline": {}
};

export function parseTyped(file: string): Root | HMError[] {
    const errors: HMError[] = [];
    const logger = (err: HMError) => errors.push(err);
    const result = parse(file, schema, logger);
    if (errors.length === 0) {
        return (result as unknown) as Root;
    } else {
        return errors;
    }
}
