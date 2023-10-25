import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./main/home/home.component";
import { UserListComponent } from "./main/user-list/user-list.component";
import { UserRegistrationComponent } from "./main/user-registration/user-registration.component";
import { MainComponent } from "./main/main.component";
import { ErrorComponent } from "./error/error.component";

const routes: Routes = [
    {
        path: "",
        component: MainComponent,
        children: [
            {
                path: "home",
                title: "Home",
                component: HomeComponent
            },
            {
                path: "users",
                children: [
                    {
                        path: "",
                        title: "User List",
                        component: UserListComponent
                    },
                    {
                        path: "registration",
                        title: "User Registration",
                        component: UserRegistrationComponent
                    },
                    {
                        path: ":id",
                        title: "User",
                        component: UserRegistrationComponent
                    }
                ]
            }
        ]
    },
    { path: "**", component: ErrorComponent, pathMatch: "full" }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewsRoutingModule { }
