import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { MenuComponent } from "../menu/menu";

@Component({
	standalone: true,
	selector: "s-main-layout",
	styleUrl: "./layout.scss",
	templateUrl: "./layout.html",
	imports: [
		// Angular
		CommonModule,
		RouterOutlet,
		// App
		MenuComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {}
