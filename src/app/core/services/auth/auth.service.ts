import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

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
	private readonly router = inject(Router);

	constructor() {
		super("api");
	}

	public login(data: LoginRequest) {
		return this.http.post<LoginResponse>(`${this.url}/login`, data);
	}

	public refresh() {
		return this.http.post<LoginResponse>(`${this.url}/refresh`, {});
	}

	public logout() {
		return this.http.post<unknown>(`${this.url}/logout`, {});
	}

	public me() {
		return this.http.get<User>(`${this.url}/me`);
	}

	public register(data: unknown) {
		return this.http.post<User>(`${this.url}/register`, data);
	}
}
