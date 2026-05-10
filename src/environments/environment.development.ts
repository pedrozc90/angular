import { Environment } from "../app/core/types";
import { environment as base } from "./environment.base";

export const environment: Environment = {
	...base,
	mode: "development",
	url: "",
};
