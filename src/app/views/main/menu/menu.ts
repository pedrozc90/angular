import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

import { ButtonComponent } from "../../../shared/components";
import { MenuRoute, routes } from "./routes";
import { MenuItemComponent } from "./item/item";

@Component({
	standalone: true,
	selector: "s-menu",
	styleUrl: "./menu.scss",
	templateUrl: "./menu.html",
	imports: [
		// Angular
		CommonModule,
		// App
		MenuItemComponent,
		ButtonComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
	private readonly router = inject(Router);

	public readonly routes = routes;

	public logout() {
		this.router.navigate(["/logout"]);
	}
}
