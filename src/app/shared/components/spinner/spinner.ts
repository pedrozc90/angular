import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	standalone: true,
	selector: "s-spinner",
	styleUrl: "./spinner.scss",
	templateUrl: "./spinner.html",
	imports: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {}
