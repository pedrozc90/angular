import { environment as defaultEnvironment } from "./environment.default";
import { IEnvironment } from "src/app/core/types";

export const environment: IEnvironment = {
    ...defaultEnvironment,
    api: "http://localhost:8000"
};
