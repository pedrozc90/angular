import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ComponentsModule } from "src/app/components/components.module";
import { CoreModule } from "src/app/core/core.module";
import { HomeComponent } from "./home/home.component";
import { MainComponent } from "./main.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserRegistrationComponent } from "./user-registration/user-registration.component";

const components = [
    HomeComponent,
    UserRegistrationComponent,
    UserListComponent,
    MainComponent
];

@NgModule({
    declarations: [
        ...components
    ],
    imports: [
        // angular modules
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // app modules
        CoreModule,
        ComponentsModule
    ],
    exports: [
        ...components
    ]
})
export class MainModule { }
