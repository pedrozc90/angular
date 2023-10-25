import { Injectable } from "@angular/core";

import { LocalStorageService } from "./localstorage.service";
import { IAuth, UserCredentials } from "../types";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { Observable, map, of } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AuthenticationService extends BaseService<unknown> {

    private _access_token?: string;
    private _permissions: string[] = [];

    constructor(
        http: HttpClient,
        private localstorage: LocalStorageService
    ) {
        super(http);
    }

    // ACCESS TOKEN
    public get access_token(): string | null {
        return this._access_token || this.localstorage.access_token || null;
    }

    public set access_token(value: string) {
        this._access_token = value;
        this.localstorage.access_token = value;
    }

    public isAuthenticated(): Observable<boolean> {
        return of(this.access_token).pipe(map((v) => typeof v === "string"));
    }

    public authenticate(data: IAuth): void {
        this.access_token = data.access_token;
    }

    // PERMISSIONS
    public get permissions(): string[] {
        return this._permissions;
    }

    public set permissions(value: string[]) {
        this._permissions = value;
    }

    // API
    public login(credentials: UserCredentials): Observable<IAuth> {
        return this.http.post<IAuth>(`${this.url}/auth/login`, credentials);
    }

    public logout(): void {
        delete this._access_token;
        this._permissions = [];
        this.localstorage.clear();
    }

}
