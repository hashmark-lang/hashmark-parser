#!/usr/bin/env node
// tslint:disable:no-console
import chalk from "chalk";
import * as program from "commander";
import * as fs from "fs";
import { version } from "../package.json";
import { Block, parse } from "./parse";
import { toXML } from "./xml";

interface Args {
	input?: string;
	output?: string;
	format: string;
}

program
	.version(version, "-v, --version")
	.description("Parse Hashmark files")
	.arguments("<file>")
	.action(f => (program.input = f))
	.option("-o, --output <file>", "Output file")
	.option("-f, --format <format>", 'Output format. Either "JSON" or "XML"', "JSON")
	.parse(process.argv);

const args = program as program.CommanderStatic & Args;

function getFile(): string {
	if (!args.input) {
		throw new Error("An input file must be specified");
	}
	return fs.readFileSync(args.input, "utf-8");
}

function stringify(root: Block): string {
	switch (args.format.toUpperCase()) {
		case "JSON":
			return JSON.stringify(root, null, "\t");
		case "XML":
			return toXML(root);
		default:
			throw new Error(`Unknown file format "${args.format}"`);
	}
}

function output(result: string): void {
	if (args.output) {
		fs.writeFileSync(args.output, result);
	} else {
		console.log(result);
	}
}

try {
	const parsed = parse(getFile());
	const result = stringify(parsed);
	output(result);
} catch (e) {
	console.error(chalk.red("Error: " + e.message));
	console.log();
	program.help();
}
