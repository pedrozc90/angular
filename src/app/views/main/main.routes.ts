import { Routes } from "@angular/router";

export const routes: Routes = [
	{
		path: "",
		loadComponent: () => import("./layout/layout").then((m) => m.MainLayout),
		children: [{ path: "dashboard", loadComponent: () => import("./dashboard/dashboard").then((m) => m.DashboardComponent) }],
	},
];
