import { testSnapshots } from "./utils";
import { parseInline } from "../src/parser/parseInline";

describe("parseInline", () => testSnapshots("inline", parseInline));
