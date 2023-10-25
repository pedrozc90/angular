import pkg from "../../package.json";
import { IEnvironment } from "src/app/core/types";

export const environment: IEnvironment = {
    name: pkg.name,
    version: pkg.version,
    production: false,
    api: "http//lolcahost:4000"
};
