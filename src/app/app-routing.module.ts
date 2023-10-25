import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ErrorComponent } from "./views/error/error.component";
import { HomeComponent } from "./views/main/home/home.component";
import { LoginComponent } from "./views/login/login.component";
import { UserListComponent } from "./views/main/user-list/user-list.component";
import { UserRegistrationComponent } from "./views/main/user-registration/user-registration.component";
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
    {
        path: "login",
        title: "Login",
        component: LoginComponent
    },
    {
        path: "",
        canActivate: [ AuthGuard ],
        loadChildren: () => import("./views/views.module").then((v) => v.ViewsModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
