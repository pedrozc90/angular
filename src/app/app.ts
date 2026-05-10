import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
	standalone: true,
	selector: "s-root",
	templateUrl: "./app.html",
	styleUrl: "./app.scss",
	imports: [RouterOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
	protected readonly title = signal<string>("Blank");
}
