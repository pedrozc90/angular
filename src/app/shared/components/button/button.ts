import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { IconComponent } from "../icon/icon";

export type ButtonType = "button" | "submit" | "reset";

@Component({
	standalone: true,
	selector: "s-button",
	styleUrl: "./button.scss",
	templateUrl: "./button.html",
	imports: [
		// App
		IconComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
	public type = input<ButtonType>("button");
	public icon = input<string | undefined>(undefined);
	public label = input<string | undefined>(undefined);
	public disabled = input<boolean>(false);
	public loading = input<boolean>(false);
}
