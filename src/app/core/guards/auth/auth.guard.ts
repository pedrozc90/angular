import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

import { AuthService } from "@app/core/services";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
	const auth = inject(AuthService);
	const router = inject(Router);
	return !auth.loaded ? router.parseUrl("/login") : true;
};

export const publicGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
	const auth = inject(AuthService);
	const router = inject(Router);
	return auth.loaded ? router.parseUrl("/dashboard") : true;
};
