import * as pkg from "../../package.json";
import { IEnvironment } from "../app/core/types";

export const environment: IEnvironment = {
    mode: "development",
    name: pkg.name,
    version: pkg.version,
    api: "http://localhost:4000"
};
