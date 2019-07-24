import { NamedSugar } from "../parser/InlineHandler";
import {
	BlockSchemaDefinition,
	InlinePropDefinition,
	InlineSchemaDefinition,
	INVALID_TAG,
	SchemaDefinition,
	SugarDefinition
} from "./SchemaDefinition";

export class SchemaDecorator {
	private readonly blockSchemas: Map<string, BlockSchemaDecorator> = new Map();
	private readonly inlineSchemas: Map<string, InlineSchemaDecorator> = new Map();

	readonly allSugars: NamedSugar[];

	constructor(schema: SchemaDefinition) {
		const sugars = this.getSugars(schema);
		this.allSugars = Array.from(sugars.values());

		for (const [tag, inlineSchema] of Object.entries(schema.inline)) {
			this.inlineSchemas.set(tag, new InlineSchemaDecorator(inlineSchema, sugars));
		}

		for (const [tag, blockSchema] of Object.entries(schema.blocks)) {
			this.blockSchemas.set(tag, new BlockSchemaDecorator(blockSchema, sugars));
		}
	}

	// Create a map of tag => sugar
	private getSugars(schema: SchemaDefinition): Map<string, NamedSugar> {
		const sugars = new Map();
		for (const [tag, { sugar }] of Object.entries(schema.inline)) {
			if (sugar) sugars.set(tag, { tag, ...sugar });
		}
		return sugars;
	}

	getBlockSchema(tag: string): BlockSchemaDecorator | undefined {
		return this.blockSchemas.get(tag) || this.blockSchemas.get(INVALID_TAG);
	}

	getInlineSchema(tag: string): InlineSchemaDecorator | undefined {
		return this.inlineSchemas.get(tag) || this.inlineSchemas.get(INVALID_TAG);
	}
}

export class BlockSchemaDecorator {
	private childTagToProp: Map<string, string> = new Map();

	readonly defaultTag?: string;
	readonly head?: InlinePropDefinition;
	readonly headTokenToSugar: Map<string, NamedSugar> = new Map();

	readonly propNames: string[];
	readonly rawPropName?: string;

	constructor(schema: BlockSchemaDefinition, sugars: Map<string, NamedSugar>) {
		this.head = schema.head;
		this.defaultTag = schema.defaultTag;

		const propsSet = new Set<string>(); // set of prop names

		if (schema.head) {
			propsSet.add(schema.head.name);
			if (!schema.head.raw) {
				const tags = schema.head.content.map(_ => _.tag);
				this.headTokenToSugar = propSugarMap(tags, sugars);
			}
		}

		for (const prop of schema.props) {
			propsSet.add(prop.name);
			if (prop.raw) {
				if (this.rawPropName) throw new Error("Should have only one raw prop!");
				this.rawPropName = prop.name;
			} else {
				prop.content.forEach(rule => this.childTagToProp.set(rule.tag, prop.name));
			}
		}

		this.propNames = Array.from(propsSet);
	}

	getPropName(child: string): string | undefined {
		return this.childTagToProp.get(child) || this.childTagToProp.get(INVALID_TAG);
	}
}

export class InlineSchemaDecorator {
	readonly numberArgs: number;
	readonly sugar?: SugarDefinition;
	readonly propNames: string[];

	// arg name => sugar start token => Sugar
	private readonly argTokenToSugar: Map<string, Map<string, NamedSugar>> = new Map();
	private readonly props: InlinePropDefinition[];

	constructor(schema: InlineSchemaDefinition, sugars: Map<string, NamedSugar>) {
		this.numberArgs = schema.props.length;
		this.sugar = schema.sugar;
		this.props = schema.props;
		this.propNames = schema.props.map(_ => _.name);
		for (const prop of schema.props) {
			if (!prop.raw) {
				const tags = prop.content.map(_ => _.tag);
				this.argTokenToSugar.set(prop.name, propSugarMap(tags, sugars));
			}
		}
	}

	getArgName(index: number): string {
		return this.props[index].name;
	}

	isRawArg(index: number): boolean {
		return Boolean(this.props[index].raw);
	}

	getAllowedSugars(index: number): Map<string, NamedSugar> {
		return this.argTokenToSugar.get(this.getArgName(index)) || new Map();
	}
}

function propSugarMap(tags: string[], sugars: Map<string, NamedSugar>): Map<string, NamedSugar> {
	const values = tags
		.map(tag => sugars.get(tag))
		.filter((sugar): sugar is NamedSugar => sugar !== undefined);
	return indexBy(sugar => sugar.start, values);
}

function indexBy<K, V>(keyGetter: (item: V) => K, array: V[]): Map<K, V> {
	const entries = array.map(item => [keyGetter(item), item] as [K, V]);
	return new Map(entries);
}
