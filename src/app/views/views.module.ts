import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { CoreModule } from "../core/core.module";
import { ComponentsModule } from "../components/components.module";
import { MainModule } from "./main/main.module";
import { ErrorComponent } from "./error/error.component";
import { LoginComponent } from "./login/login.component";
import { ViewsRoutingModule } from "./views-routing.module";

@NgModule({
    declarations: [
        LoginComponent,
        ErrorComponent
    ],
    imports: [
        // angular modules
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // RouterModule,
        // app modules
        ViewsRoutingModule,
        CoreModule,
        ComponentsModule,
        MainModule
    ],
    // exports: [
    //     ...components
    // ]
})
export class ViewsModule { }
