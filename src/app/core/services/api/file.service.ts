import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { HttpService } from "./http.service";
import { Document } from "../../types";

@Injectable({
    providedIn: "root",
})
export class FileService extends HttpService<Document> {

    constructor(http: HttpClient) {
        super(http, "/api/files");
    }

}
