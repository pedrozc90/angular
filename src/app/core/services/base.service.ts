import { HttpClient } from "@angular/common/http";
import { computed, EnvironmentInjector, inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";

import { environment } from "../../../environments/environment";

@Injectable({
	providedIn: "root",
})
export abstract class BaseService {
	/* --- Dependencies --- */
	protected readonly http = inject(HttpClient);

	protected readonly url: string;

	constructor(protected readonly endpoint: string) {
		this.url = `${environment.url}/${endpoint}`;
		console.log(`BaseService initialized with URL: ${this.url}`);
	}
}
