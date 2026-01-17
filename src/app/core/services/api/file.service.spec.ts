import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";

import { FileService } from "./file.service";

describe("FileService", () => {
    let service: FileService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FileService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
