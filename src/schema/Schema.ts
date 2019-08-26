import { Sugar } from "../parser/Sugar";
import { Cardinality, sumCardinalities } from "./Cardinality";
import {
	ArgDefinition,
	BlockDefinition,
	InlineDefinition,
	INVALID_TAG,
	ROOT,
	SchemaDefinition
} from "./SchemaDefinition";
import { schemaErrors } from "./schemaErrors";

export class Schema {
	readonly rootSchema: BlockSchema;
	private readonly blockSchemas: Map<string, BlockSchema> = new Map();
	private readonly inlineSchemas: Map<string, InlineSchema> = new Map();
	readonly sugars: Sugar[] = [];

	constructor(schema: SchemaDefinition) {
		const errors = schemaErrors(schema);
		if (errors.length > 0) {
			throw new Error("Invalid schema. " + errors.map(e => e.toString()).join("\n"));
		}

		this.rootSchema = new BlockSchema(ROOT, schema.root);

		for (const [tag, inlineSchema] of Object.entries(schema.inline)) {
			this.inlineSchemas.set(tag, new InlineSchema(tag, inlineSchema));
			const syntax = inlineSchema.sugar;
			if (syntax) this.sugars.push({ tag, syntax });
		}

		for (const [tag, blockSchema] of Object.entries(schema.blocks)) {
			this.blockSchemas.set(tag, new BlockSchema(tag, blockSchema));
		}
	}

	get blocks(): BlockSchema[] {
		return Array.from(this.blockSchemas.values());
	}

	get inlines(): InlineSchema[] {
		return Array.from(this.inlineSchemas.values());
	}

	getBlockSchema(tag: string): BlockSchema | undefined {
		return this.blockSchemas.get(tag) || this.blockSchemas.get(INVALID_TAG);
	}

	getInlineSchema(tag: string): InlineSchema | undefined {
		return this.inlineSchemas.get(tag) || this.inlineSchemas.get(INVALID_TAG);
	}
}

export class BlockSchema {
	readonly head?: ArgSchema;
	readonly defaultTag?: string;

	readonly bodyProps: ReadonlyArray<BodyPropSchema>;
	readonly rawProp?: BodyPropSchema;
	readonly childCardinalities: ReadonlyArray<[string, Cardinality]>;

	private readonly childTagToProp: Map<string, BodyPropSchema> = new Map();

	constructor(readonly tag: string, schema: BlockDefinition) {
		const bodyProps: BodyPropSchema[] = [];
		const childCardinalities: Array<[string, Cardinality]> = [];

		if (schema.props.head) {
			const head = schema.props.head;
			this.head = new ArgSchema(tag, head);
		}

		if (schema.rawBody) {
			this.rawProp = new BodyPropSchema(schema.props.body, { raw: true });
			bodyProps.push(this.rawProp);
		} else if (schema.props.body) {
			this.defaultTag = schema.defaultTag;
			for (const [propName, rules] of Object.entries(schema.props.body)) {
				const prop = new BodyPropSchema(propName, { raw: false, rules });
				bodyProps.push(prop);
				for (const [child, cardinality] of Object.entries(rules)) {
					this.childTagToProp.set(child, prop);
					childCardinalities.push([child, cardinality]);
				}
			}
		}

		this.bodyProps = bodyProps;
		this.childCardinalities = childCardinalities;
	}

	getPropByChild(child: string): BodyPropSchema | undefined {
		return this.childTagToProp.get(child) || this.childTagToProp.get(INVALID_TAG);
	}
}

export class BodyPropSchema {
	readonly raw: boolean;
	readonly cardinality: Cardinality;
	readonly isArrayType: boolean;
	readonly children: ReadonlyArray<string>;

	constructor(
		readonly name: string,
		private readonly content:
			| { raw: true }
			| { raw: false; rules: { [tag: string]: Cardinality } }
	) {
		this.raw = content.raw;
		this.cardinality = content.raw
			? { min: 0, max: Infinity }
			: sumCardinalities(Object.values(content.rules));
		this.isArrayType = this.cardinality.max > 1;
		this.children = content.raw ? [] : Object.keys(content.rules);
	}

	childCardinality(childName: string): Cardinality | undefined {
		if (!this.content.raw) {
			return this.content.rules[childName] || this.content.rules[INVALID_TAG];
		}
	}
}

export class InlineSchema {
	readonly propNames: string[];
	readonly args: ReadonlyArray<ArgSchema>;

	constructor(readonly tag: string, schema: InlineDefinition) {
		this.args = schema.args.map(arg => new ArgSchema(tag, arg));
		this.propNames = schema.args.map(arg => arg.name);
	}
}

export class ArgSchema {
	/** Name of the argument */
	readonly name: string;
	/** How the arg should be represented in the IR */
	readonly type: "parsed" | "string" | "url" | "date";
	/** If `true`, the schema tells us that the argument should be not parsed as Hashml. */
	readonly raw: boolean;
	/** Set of tags allowed in this argument */
	readonly validChildren: ReadonlySet<string>;

	constructor(readonly parentTag: string, schema: ArgDefinition) {
		this.name = schema.name;
		this.raw = schema.raw;
		this.validChildren = new Set(schema.raw ? [] : schema.content);
		this.type = schema.raw ? schema.type : "parsed";
	}
}
