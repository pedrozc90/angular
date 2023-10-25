import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "src/app/core/services";

export interface MenuItem {
    title: string;
    route: string;
    permissions?: string[];
}

@Component({
    selector: "app-menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.scss"]
})
export class MenuComponent {

    public routes: MenuItem[] = [
        { title: "Home", route: "/home" },
        { title: "Users", route: "/users" }
    ];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authentication: AuthenticationService
    ) { }

    public logout(): void {
        this.authentication.logout();
        this.router.navigate([ "home" ]);
    }

}
