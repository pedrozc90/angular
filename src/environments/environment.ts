import { environment as defaultEnvironment } from "./environment.default";
import { IEnvironment } from "src/app/core/types";

export const environment: IEnvironment = {
    ...defaultEnvironment,
    production: true,
    api: "http://172.22.99.220:8000"
};
