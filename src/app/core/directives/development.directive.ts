import { Directive, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { environment } from "src/environments/environment.default";

@Directive({
    selector: "[development]"
})
export class DevelopmentDirective implements OnInit {

    constructor(
        private templateRef: TemplateRef<unknown>,
        private viewContainer: ViewContainerRef
    ) { }

    public ngOnInit(): void {
        if (environment.production) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }

}
