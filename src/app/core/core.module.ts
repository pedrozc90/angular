import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DevelopmentDirective } from "./directives/development.directive";

const directives = [
    DevelopmentDirective
];

@NgModule({
    declarations: [
        ...directives
    ],
    imports: [
        CommonModule
    ]
})
export class CoreModule { }
