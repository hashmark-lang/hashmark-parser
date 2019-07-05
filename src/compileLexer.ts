import { countCaptureGroups } from "./utils";

export interface TokensDefinition {
	type: string | number;
	regex: RegExp;
}

interface TokenRef {
	type: string | number;
	index: number;
	length: number;
}

export interface Token {
	type: string | number;
	value: string;
	matches: Array<string | undefined>;
}

export type Lexer = (input: string) => IterableIterator<Token>;

export function compileLexer(tokensDefs: TokensDefinition[], defaultType: string | number): Lexer {
	const tokens: TokenRef[] = tokensDefs.map(_ => ({
		type: _.type,
		index: 1,
		length: countCaptureGroups(_.regex)
	}));

	const regex = new RegExp(tokensDefs.map(_ => `(${_.regex.source})`).join("|"), "g");

	for (let i = 1; i < tokens.length; ++i) {
		tokens[i].index = tokens[i - 1].index + tokens[i - 1].length + 1;
	}

	return function*(input: string): IterableIterator<Token> {
		let lastIndex = 0;
		for (const matches of input.matchAll(regex)) {
			if (matches.index !== lastIndex) {
				yield {
					type: defaultType,
					value: input.slice(lastIndex, matches.index),
					matches: []
				};
			}
			lastIndex = matches.index! + matches[0].length;

			for (const { index, type, length } of tokens) {
				if (matches[index] !== undefined) {
					yield {
						type,
						value: matches[0],
						matches: matches.slice(index + 1, index + length + 1)
					};
					break;
				}
			}
		}
		if (input.length !== lastIndex) {
			yield {
				type: defaultType,
				value: input.slice(lastIndex, input.length),
				matches: []
			};
		}
	};
}
