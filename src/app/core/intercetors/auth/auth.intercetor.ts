import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, finalize, map, Observable, of, shareReplay, switchMap, throwError } from "rxjs";

import { AuthService, AuthStateService } from "@app/core/services";

const SKIP_REFRESH_URLS = [
	"/api/login",
	"/api/logout",
	"/api/refresh"
];

let $refresh: Observable<unknown> | null = null;

// https://claude.ai/chat/8507ea69-bbd5-40fe-a1f4-eadc78e4406d
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
	const authApi = inject(AuthService);
	const authState = inject(AuthStateService);
	const router = inject(Router);

	return next(req.clone({ withCredentials: true })).pipe(
		catchError((err) => {
			if (err.status !== 401) return throwError(() => err);

			const isAuthUrl = SKIP_REFRESH_URLS.some((url) => req.url.includes(url));
			if (isAuthUrl) {
				authState.clear();
				router.navigate(["/login"]);
					return throwError(() => err);
			}

			// Reuse the in-flight refresh if one is already in progress
			$refresh ??= authApi.refresh().pipe(
				shareReplay(1),
				finalize(() => {
					$refresh = null;
				}),
			);

			return $refresh.pipe(
				switchMap(() => next(req.clone({ withCredentials: true }))),
				catchError((refreshErr) => {
					authState.clear();
					router.navigate(["/login"]);
					console.error("Failed to refresh access token", refreshErr);
					return throwError(() => refreshErr);
				})
			);
		}),
	);
};
