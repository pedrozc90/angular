import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseService } from "./base.service";
import { User } from "../types";

@Injectable({
    providedIn: "root"
})
export class UsersService extends BaseService<User> {

    constructor(http: HttpClient) {
        super(http, "/api/users");
    }

}
