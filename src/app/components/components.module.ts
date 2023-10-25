import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { TitleComponent } from "./title/title.component";
import { MenuComponent } from "./menu/menu.component";
import { MenuItemComponent } from "./menu-item/menu-item.component";

const components = [
    MenuComponent,
    MenuItemComponent,
    TitleComponent
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
    ],
    exports: [
        ...components
    ]
})
export class ComponentsModule { }
