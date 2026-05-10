import { Environment } from "../app/core/types";
import * as pkg from "../../package.json";

export const environment: Environment = {
	name: pkg.name,
	version: pkg.version,
	mode: "development",
	url: "http://localhost:9000",
};
