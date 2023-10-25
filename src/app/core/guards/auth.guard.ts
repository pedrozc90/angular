import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree, createUrlTreeFromSnapshot } from "@angular/router";
import { Observable, map } from "rxjs";

import { AuthenticationService } from "../services";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<true | UrlTree> => {
    return inject(AuthenticationService)
        .isAuthenticated()
        .pipe(map((v) => ((v) ? true : createUrlTreeFromSnapshot(route, [ "/login" ]))));
};
