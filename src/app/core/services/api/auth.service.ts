import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { catchError, map, Observable, of, tap } from "rxjs";

import { HttpService } from "./http.service";
import { IContext } from "../../types";

@Injectable({
    providedIn: "root",
})
export class AuthService extends HttpService<unknown> {

    private readonly _context = signal<IContext | null>(null);
    private readonly _loaded = signal<boolean>(false);

    constructor(http: HttpClient) {
        super(http, "/api");
    }

    // METHODS
    public checkSession(): Observable<boolean> {
        return this.context().pipe(
            tap((res) => {
                this._context.set(res);
                this._loaded.set(true);
            }),
            map(() => true),
            catchError((err) => {
                this._context.set(null);
                this._loaded.set(false);
                return of(false);
            })
        )
    }

    public get loggedIn(): boolean {
        return this._context() !== null;
    }

    public get loaded(): boolean {
        return this._loaded();
    }

    // API
    public login(email: string, password: string): Observable<unknown> {
        return this.http.post<unknown>(`${this.url}/login`, { email, password });
    }

    public context(): Observable<IContext> {
        return this.http.get<IContext>(`${this.url}/context`);
    }

}
