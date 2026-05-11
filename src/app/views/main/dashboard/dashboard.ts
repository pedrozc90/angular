import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";

import { AuthService, AuthStateService } from "@app/core/services";
import { ButtonComponent } from "@app/shared/components";

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
	private readonly authApi = inject(AuthService);
	private readonly authState = inject(AuthStateService);

	public readonly user = signal<{ name: string; username: string; email: string }>({
		name: "Luaerror",
		username: "luaerror",
		email: "luaerror@email.com",
	});

	public refresh(event: Event): void {
		event.preventDefault();

		this.authApi.refresh().subscribe((res) => {
			console.log(res);
		});
	}

	public logout(event: Event): void {
		event.preventDefault();

		this.authState.logout().subscribe((res) => {
			console.log(res);
		});
	}
}
