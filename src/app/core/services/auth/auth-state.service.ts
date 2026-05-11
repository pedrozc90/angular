import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService, LoginRequest } from "./auth.service";
import { tap, map, catchError, of, switchMap, EMPTY } from "rxjs";
import { User } from "../../types";

@Injectable({
	providedIn: "root",
})
export class AuthStateService {
	private readonly auth = inject(AuthService);

	/* --- State --- */
	private readonly _loaded = signal<boolean>(false);
	private readonly _context = signal<User | null>(null);

	public get loaded() {
		return this._loaded();
	}

	public get context() {
		return this._context();
	}

	private update(cxt: User): void {
		this._loaded.set(true);
		this._context.set(cxt);
	}

	public clear(): void {
		this._loaded.set(false);
		this._context.set(null);
	}

	public checkSession() {
		return this.auth.me().pipe(
			tap((res) => this.update(res)),
			map((_res) => true),
			catchError((err) => {
				console.error("Failed to reload user context", err);
				this.clear();
				return of(false);
			}),
		);
	}

	public login(data: LoginRequest) {
		return this.auth.login(data).pipe(
			switchMap(() => this.checkSession()),
		);
	}

	public logout() {
		return this.auth.logout().pipe(
			catchError((err) => {
				console.error("Logout failed", err);
				return EMPTY;
			}),
			tap(() => this.clear()),
		);
	}

	public refresh() {
		return this.auth.refresh().pipe(
			switchMap(() => this.checkSession()),
		);
	}
}
