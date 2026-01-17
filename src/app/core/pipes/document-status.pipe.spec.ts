import { DocumentStatus } from "../types/enums";
import { DocumentStatusPipe } from "./document-status.pipe";

import { describe, it, expect } from "vitest";

describe("DocumentStatusPipe", () => {
    it("create an instance", () => {
        const pipe = new DocumentStatusPipe();
        expect(pipe).toBeTruthy();
    });

    it("transform", () => {
        const pipe = new DocumentStatusPipe();
        const result = pipe.transform(DocumentStatus.COMPLETED);
        expect(result).toEqual("Completed");
    });
});
