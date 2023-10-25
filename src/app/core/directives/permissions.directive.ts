import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthenticationService } from "../services";

@Directive({
    selector: "[permissions]"
})
export class PermissionsDirective {

    private tags: string[] = [];

    constructor(
        private elementRef: ElementRef,
        private templateRef: TemplateRef<unknown>,
        private viewContainer: ViewContainerRef,
        private authentication: AuthenticationService
    ) {
        // nothing here
    }

    @Input()
    public set permissions(value: string | string[] | undefined) {
        this.populate(value);
        this.updateView();
    }

    private populate(value: string | string[] | undefined): void {
        if (!value) return;
        if (typeof value === "string") {
            this.tags.push(value);
        } else {
            this.tags.push(...value);
        }
    }

    private checkPermissions(): boolean {
        const length = this.tags.length;
        if (!length) return true;
        const permissions = this.authentication.permissions;
        for (let tag of this.tags) {
            if (permissions.includes(tag)) {
                return true;
            }
        }
        return false;
    }

    private updateView(): void {
        if (this.checkPermissions()) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }

}
