import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, finalize, Observable, shareReplay, switchMap, throwError } from "rxjs";
import { AuthService } from "@app/core/services";

const SKIP_REFRESH_URLS = ["/api/login", "/api/refresh"];

let $refresh: Observable<unknown> | null = null;

// https://claude.ai/chat/8507ea69-bbd5-40fe-a1f4-eadc78e4406d
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
	const auth = inject(AuthService);
	const router = inject(Router);

	return next(req.clone({ withCredentials: true })).pipe(
		catchError((err) => {
			if (err.status !== 401) return throwError(() => err);

			const isAuthUrl = SKIP_REFRESH_URLS.some((url) => req.url.includes(url));
			if (isAuthUrl) {
				auth.logout();
				router.navigate(["/login"]);
				return throwError(() => err);
			}

			// Reuse the in-flight refresh if one is already in progress
			$refresh ??= auth.refresh().pipe(
				shareReplay(1),
				finalize(() => {
					$refresh = null;
				}),
			);

			return $refresh.pipe(
				switchMap(() => next(req.clone({ withCredentials: true }))),
				catchError((refreshErr) => {
					auth.logout();
					router.navigate(["/login"]);
					return throwError(() => refreshErr);
				}),
			);
		}),
	);
};
