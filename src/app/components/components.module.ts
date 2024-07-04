import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { TitleComponent } from "./title/title.component";
import { MenuComponent } from "./menu/menu.component";
import { MenuItemComponent } from "./menu-item/menu-item.component";
import { InputComponent } from './input/input.component';
import { MaterialModule } from "../core/material.module";

const components = [
    MenuComponent,
    MenuItemComponent,
    TitleComponent,
    InputComponent
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

        MaterialModule
    ],
    exports: [
        ...components
    ]
})
export class ComponentsModule { }
