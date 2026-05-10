import { Routes } from "@angular/router";

export const routes: Routes = [
	{
		path: "",
		loadComponent: () => import("./layout/layout").then((m) => m.AuthLayout),
		children: [
			{ path: "login", loadComponent: () => import("./login/login").then((m) => m.LoginComponent) },
			{ path: "register", loadComponent: () => import("./register/register").then((m) => m.RegisterComponent) },
		],
	},
];
