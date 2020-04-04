---
title: Contributing
id: contributing
sidebar_label: Getting started
---

## Installing

HashML requires at least Node 12. You can check your Node version by running:

```console
$ node -v
```

To clone and install the project, run:

```console
$ git clone https://github.com/hashml/hashml
$ cd hashml
$ npm install
```

## NPM commands

### Core project

| `npm run ...`        | Description                                                                      |
| -------------------- | -------------------------------------------------------------------------------- |
| `build`              | Compile TypeScript sources and builds the website                                |
| `build:ts`           | Compile the TypeScript files in `src` to `dist`                                  |
| `build:site`         | Build the website to `website/build`                                             |
| `build:site:api`     | Build Markdown files in `docs/api` from TypeDoc comments in `src`                |
| `build:site:static`  | Build static assets `website/build`. Uses result of `build:site:api`             |
| `clean`              | Delete all built files                                                           |
| `clean:ts`           | Delete the built TypeScript files                                                |
| `clean:site`         | Delete the built website files                                                   |
| `clean:site:api`     | Delete the built TypeDoc files                                                   |
| `clean:site:static`  | Delete the built static website files                                            |
| `fix`                | Run all fixes                                                                    |
| `fix:lint`           | Run linting fixes                                                                |
| `fix:format`         | Run formatting fixes                                                             |
| `benchmark`          | Run all benchmarks                                                               |
| `benchmark:xml`      | Run XML output benchmark                                                         |
| `benchmark:parse`    | Run parsing benchmark                                                            |
| `test`               | Run unit tests, lint tests and format tests                                      |
| `test:unit`          | Run unit tests                                                                   |
| `test:lint`          | Test source files for linting errors                                             |
| `test:format`        | Test source files for formatting errors                                          |
| `test:package`       | Test `package.json` for file path errors                                         |
| `test:tslint-config` | Test that `tslint.json` does not contain rules conflicting with formatting rules |
| `generate`           | Generate schema schema interfaces and parsing function                           |

### Documentation website

The `website` directory contains the code for the [Docusaurus website](https://docusaurus.io/). This directory is an NPM module with its own `package.json`. You can run the following commands from the `website` directory:

| `npm run ...`                | Description                                          |
| ---------------------------- | ---------------------------------------------------- |
| `start`                      | Serve and watch the website.                         |
| `examples`                   | Generate example code. See Docusaurus documentation. |
| `version x.x.x`              | Freeze a documentation version                       |
| `rename-version x.x.x y.y.y` | Rename a frozen version `x.x.x` to `y.y.y`           |
