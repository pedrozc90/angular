import { Routes } from "@angular/router";

import { authGuard, publicGuard } from "@core/guards";

export const routes: Routes = [
	{ path: "", redirectTo: "login", pathMatch: "full" },
	{ path: "", loadChildren: () => import("./views/auth/auth.routes").then((m) => m.routes), canActivate: [publicGuard] },
	{ path: "", loadChildren: () => import("./views/main/main.routes").then((m) => m.routes), canActivate: [authGuard] },
	{ path: "**", redirectTo: "login" },
];
