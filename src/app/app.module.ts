import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ViewsModule } from "./views/views.module";
import { CoreModule } from "./core/core.module";
import { ServicesModule } from "./core/services.module";
import { ComponentsModule } from "./components/components.module";
import { MaterialModule } from "./core/material.module";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        // angular modules
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        // app modules
        CoreModule,
        ServicesModule,
        ComponentsModule,
        ViewsModule,
        // external
        MaterialModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
