import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, Observable, of, switchMap, tap } from "rxjs";

import { BaseService } from "../base.service";
import { User } from "@app/core/types";

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	access_token: string;
	refresh_token: string;
	token_type: string | "Bearer";
	expires_in: number;
}

@Injectable({
	providedIn: "root",
})
export class AuthService extends BaseService {
	/* --- Dependencies --- */
	private readonly router = inject(Router);

	constructor() {
		super("api");
	}

	/* --- State --- */
	private readonly _loaded = signal<boolean>(false);
	private readonly _context = signal<User | null>(null);

	public get loaded() {
		return this._loaded();
	}

	public get context() {
		return this._context();
	}

	public checkSession() {
		return this.me().pipe(
			tap((res) => {
				this._context.set(res);
				this._loaded.set(true);
			}),
			map((_res) => true),
			catchError((err) => {
				console.error("Failed to reload user context", err);
				this._loaded.set(false);
				this._context.set(null);
				return of(false);
			}),
		);
	}

	/* --- API --- */
	public login(data: LoginRequest) {
		return this.http.post<LoginResponse>(`${this.url}/login`, data, { observe: "response" }).pipe(
			map((res) => res.status === 200),
			switchMap(() => this.checkSession()),
		);
	}

	public refresh() {
		return this.http.post<LoginResponse>(`${this.url}/refresh`, {});
	}

	public logout() {
		return this.http.post<unknown>(`${this.url}/logout`, {}).pipe(
			tap(() => {
				this._loaded.set(false);
				this.router.navigate(["/login"]);
			}),
		);
	}

	public me() {
		return this.http.get<User>(`${this.url}/me`);
	}

	public register(data: unknown) {
		return this.http.post<User>(`${this.url}/register`, data);
	}
}
