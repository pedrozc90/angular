import { DocumentType } from "../types/enums";
import { DocumentTypePipe } from "./document-type.pipe";

import { describe, it, expect } from "vitest";

describe("DocumentTypePipe", () => {
    it("create an instance", () => {
        const pipe = new DocumentTypePipe();
        expect(pipe).toBeTruthy();
    });

    it("transform", () => {
        const pipe = new DocumentTypePipe();
        const result = pipe.transform(DocumentType.INPUT);
        expect(result).toEqual("Input");
    });
});
