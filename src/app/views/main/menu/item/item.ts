import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

import { MenuRoute } from "../routes";
import { IconComponent } from "../../../../shared/components";

@Component({
	standalone: true,
	selector: "s-menu-item",
	styleUrl: "./item.scss",
	templateUrl: "./item.html",
	imports: [
		// Angular
		CommonModule,
		RouterLink,
		// App
		IconComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent {

	public data = input.required<MenuRoute>();

}
