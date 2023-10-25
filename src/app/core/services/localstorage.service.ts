import { Injectable } from "@angular/core";

const ACCESS_TOKEN = "access_token";

@Injectable({
    providedIn: "root"
})
export class LocalStorageService {

    constructor() { }

    public get access_token(): string | null {
        return localStorage.getItem(ACCESS_TOKEN);
    }

    public set access_token(value: string | null) {
        if (!value) return;
        localStorage.setItem(ACCESS_TOKEN, value);
    }

    public clear(): void {
        localStorage.clear();
    }

}
