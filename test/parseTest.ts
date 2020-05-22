import { testSnapshots } from "./utils";
import { parse } from "../src/parser/parse";

describe("parse", () => testSnapshots("blocks", parse));
