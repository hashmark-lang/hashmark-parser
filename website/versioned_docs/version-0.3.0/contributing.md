---
title: Contributing
id: version-0.3.0-contributing
sidebar_label: Getting started
original_id: contributing
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
$ cd website
$ npm install
```

## NPM commands

| `npm run ...`        | Description                                                                      |
| -------------------- | -------------------------------------------------------------------------------- |
| `build`              | Compiles TypeScript sources and builds the website                               |
| `build:ts`           | Compiles the TypeScript files in `src` to `dist`                                 |
| `build:site`         | Builds the website to `website/build`                                            |
| `build:site:api`     | Builds Markdown files in `docs/api` from TypeDoc comments in `src`               |
| `build:site:static`  | Builds static assets `website/build`. Uses result of `build:site:api`            |
| `clean`              | Deletes all built files                                                          |
| `clean:ts`           | Deletes the built TypeScript files                                               |
| `clean:site`         | Deletes the built website files                                                  |
| `clean:site:api`     | Deletes the built TypeDoc files                                                  |
| `clean:site:static`  | Deletes the built static website files                                           |
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

The `website` directory contains the code for the [Docusaurus website](https://docusaurus.io/). This directory is an NPM module with its own `package.json`. You can run the following commands from `website`:

| `npm run ...`                | Description                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| `start`                      | Serve and watch the website. Note that the API docs cannot be served in this mode    |
| `examples`                   | Generate example code. See Docusaurus documentation.                                 |
| `version x.x.x`              | Freeze a documentation version                                                       |
| `rename-version x.x.x y.y.y` | Rename a frozen version `x.x.x` to `y.y.y`                                           |

