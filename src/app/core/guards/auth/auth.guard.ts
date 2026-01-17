import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

import { AuthService } from "../../services";
import { map } from "rxjs";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    // already loaded
    if (auth.loaded) {
        return auth.loggedIn
            ? true
            : router.createUrlTree(["/"]);
    }

    return auth.checkSession().pipe(
        map((res) => res || router.createUrlTree(["/"]))
    );
};
