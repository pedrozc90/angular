import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
	standalone: true,
	selector: "s-auth-layout",
	styleUrl: "./layout.scss",
	templateUrl: "./layout.html",
	imports: [RouterOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayout {}
