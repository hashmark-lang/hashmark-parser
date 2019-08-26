import { Sugar } from "../parser/Sugar";
import {
	Cardinality,
	CardinalityConstraint,
	cardinalityToConstraint,
	sumCardinalities
} from "./Cardinality";
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

	getBlockSchema(tag: string): BlockSchema | undefined {
		return this.blockSchemas.get(tag) || this.blockSchemas.get(INVALID_TAG);
	}

	getInlineSchema(tag: string): InlineSchema | undefined {
		return this.inlineSchemas.get(tag) || this.inlineSchemas.get(INVALID_TAG);
	}
}

export class BlockSchema {
	private childTagToCardinality: Map<string, [Cardinality, CardinalityConstraint]> = new Map();
	private childTagToProp: Map<string, string> = new Map();

	readonly defaultTag?: string;
	readonly head?: ArgSchema;

	readonly bodyPropNames: ReadonlyArray<string> = [];
	private readonly arrayProps: Set<string> = new Set();

	readonly rawPropName?: string;

	constructor(readonly tag: string, schema: BlockDefinition) {
		const propNames = [];
		if (schema.props.head) {
			const head = schema.props.head;
			this.head = new ArgSchema(tag, head);
		}

		if (schema.rawBody) {
			this.rawPropName = schema.props.body;
			this.arrayProps.add(this.rawPropName);
			propNames.push(schema.props.body);
		} else if (schema.props.body) {
			this.defaultTag = schema.defaultTag;
			for (const [propName, content] of Object.entries(schema.props.body)) {
				const rules = Object.entries(content);
				const propCardinality = sumCardinalities(
					rules.map(([, cardinality]) => cardinality)
				);
				propNames.push(propName);
				if (
					propCardinality === Cardinality.ZeroOrMore ||
					propCardinality === Cardinality.OneOrMore
				) {
					this.arrayProps.add(propName);
				}

				for (const [tagName, cardinality] of Object.entries(content)) {
					const constraint = cardinalityToConstraint(cardinality);
					this.childTagToCardinality.set(tagName, [cardinality, constraint]);
					this.childTagToProp.set(tagName, propName);
				}
			}
		}

		this.bodyPropNames = propNames;
	}

	getPropName(child: string): string | undefined {
		return this.childTagToProp.get(child) || this.childTagToProp.get(INVALID_TAG);
	}

	isPropArray(propName: string): boolean {
		return this.arrayProps.has(propName);
	}

	getCardinality(childName: string): [Cardinality, CardinalityConstraint] | undefined {
		return (
			this.childTagToCardinality.get(childName) || this.childTagToCardinality.get(INVALID_TAG)
		);
	}

	getAllCardinalityConstraints(): ReadonlyMap<string, [Cardinality, CardinalityConstraint]> {
		return this.childTagToCardinality;
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
	private readonly validChildren: Set<string>;

	constructor(readonly parentTag: string, schema: ArgDefinition) {
		this.name = schema.name;
		this.raw = schema.raw;
		this.validChildren = new Set(schema.raw ? [] : schema.content);
		this.type = schema.raw ? schema.type : "parsed";
	}

	isValidChild(tag: string) {
		return this.validChildren.has(tag);
	}
}
