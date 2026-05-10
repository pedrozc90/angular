import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";

export type ProgressBarMode = "determinate" | "indeterminate";

@Component({
	standalone: true,
	selector: "s-progress-bar",
	templateUrl: "./progress-bar.html",
	styleUrl: "./progress-bar.scss",
	imports: [
		// Angular
		CommonModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
	public readonly mode = input<ProgressBarMode>("determinate");

	public readonly value = input<number>(0);

	protected readonly width = computed<string | undefined>(() => {
		const mode = this.mode();
		if (mode === "indeterminate") return;

		const value = this.value();
		const normalized = Math.min(100, Math.max(0, value));
		return `${normalized}%`;
	});
}
