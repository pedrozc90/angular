import { ChangeDetectionStrategy, Component, HostBinding, input } from "@angular/core";

@Component({
	standalone: true,
	selector: "s-icon",
	styleUrl: "./icon.scss",
	templateUrl: "./icon.html",
	imports: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
	public icon = input.required<string>();
	public type = input<"sharp" | "rounded" | "outlined">("sharp");

	@HostBinding("class")
	public get material() {
		return `material-symbols-${this.type()}`;
	}
}
