import { Routes } from "@angular/router";

import { Dashboard, Form, Login } from "./pages";

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: Login },
    { path: "dashboard", component: Dashboard },
    { path: "form", component: Form },
    { path: "**", redirectTo: "/", pathMatch: "full" }
];
