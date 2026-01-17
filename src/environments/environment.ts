import { IEnvironment } from "../app/core/types";

import { environment as defaultEnvironment } from "./environment.development";

export const environment: IEnvironment = {
    ...defaultEnvironment
};
