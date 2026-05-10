import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { AuthService } from "@app/core/services";
import { ButtonComponent, ProgressBarComponent, SpinnerComponent } from "@app/shared/components";

@Component({
	standalone: true,
	selector: "s-dashboard",
	templateUrl: "./dashboard.html",
	styleUrl: "./dashboard.scss",
	imports: [
		// Angular
		CommonModule,
		// App
		ButtonComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
	private readonly auth = inject(AuthService);

	public readonly user = signal<{ name: string; username: string; email: string }>({
		name: "Luaerror",
		username: "luaerror",
		email: "luaerror@email.com",
	});

	public refresh(event: Event): void {
		event.preventDefault();

		this.auth.refresh().subscribe((res) => {
			console.log(res);
		});
	}

	public logout(event: Event): void {
		event.preventDefault();

		this.auth.logout().subscribe((res) => {
			console.log(res);
		});
	}
}
