import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { debounce, email, form, required, FormField, minLength, maxLength } from "@angular/forms/signals";
import { catchError, EMPTY, finalize, max, min, tap } from "rxjs";

import { AuthStateService, LoginRequest } from "@core/services";
import { ButtonComponent, InputComponent } from "@shared/components";

@Component({
	standalone: true,
	selector: "s-login",
	templateUrl: "./login.html",
	styleUrl: "./login.scss",
	imports: [
		// Angular
		FormField,
		RouterLink,
		// App
		ButtonComponent,
		InputComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
	private readonly auth = inject(AuthStateService);
	private readonly router = inject(Router);

	/* --- State --- */
	public readonly loading = signal<boolean>(false);

	public readonly value = signal<LoginRequest>({ email: "pedro@email.com", password: "123456" });
	public readonly form = form<LoginRequest>(this.value, (schema) => {
		debounce(schema.email, 500);
		required(schema.email);
		email(schema.email);
		maxLength(schema.email, 255);
		debounce(schema.password, 500);
		required(schema.password);
		minLength(schema.password, 6);
		maxLength(schema.password, 128);
	});

	public readonly showPassword = signal<boolean>(false);
	public readonly error = signal<string | null>(null);

	async onSubmit(event: Event) {
		event.preventDefault();

		const form = this.form();
		if (form.invalid()) {
			throw new Error("Form is invalid");
		}

		const data = form.value();

		this.loading.set(true);

		this.auth.login(data)
			.pipe(
				tap(() => {
					this.router.navigate(["/dashboard"]);
				}),
				catchError((_err) => {
					this.error.set("Invalid email or password. Please try again.");
					return EMPTY;
				}),
				finalize(() => this.loading.set(false)),
			)
			.subscribe();
	}
}
