import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { debounce, email, form, FormField, maxLength, minLength, required, validate } from "@angular/forms/signals";
import { Router } from "@angular/router";
import { tap, catchError, EMPTY, finalize } from "rxjs";

import { AuthService } from "@app/core/services";
import { ButtonComponent, InputComponent, SelectComponent } from "@app/shared/components";
import { Role, ROLE_OPTIONS } from "@app/core/types";

interface RegisterForm {
	name: string;
	email: string;
	password: string;
	confirm_password: string;
	role: Role;
}

@Component({
	standalone: true,
	selector: "s-register",
	templateUrl: "./register.html",
	styleUrl: "./register.scss",
	imports: [
		// Angular
		FormField,
		// App
		ButtonComponent,
		InputComponent,
		SelectComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
	private readonly auth = inject(AuthService);
	private readonly router = inject(Router);

	public readonly roles = ROLE_OPTIONS;

	/* --- State --- */
	public readonly loading = signal<boolean>(false);

	public readonly value = signal<RegisterForm>({ name: "", email: "", password: "", confirm_password: "", role: Role.Guest });
	public readonly form = form<RegisterForm>(this.value, (schema) => {
		debounce(schema.name, 500);
		required(schema.name);
		maxLength(schema.name, 255);

		debounce(schema.email, 500);
		required(schema.email);
		email(schema.email);
		maxLength(schema.email, 255);

		debounce(schema.password, 500);
		required(schema.password);
		minLength(schema.password, 6);
		maxLength(schema.password, 128);

		debounce(schema.confirm_password, 500);
		required(schema.confirm_password);
		validate(schema.confirm_password, ({ value }) => {
			const cur = value();
			const ref = this.value().password;
			if (cur === ref) return null;
			return {
				kind: "password_mismatch",
				message: "Passwords do not match",
			};
		});
		maxLength(schema.confirm_password, 128);

		debounce(schema.role, 500);
		required(schema.role);
	});

	async submit(event: Event) {
		event.preventDefault();

		const form = this.form();
		if (form.invalid()) {
			throw new Error("Form is invalid");
		}

		const data = form.value();

		this.loading.set(true);

		this.auth
			.register(data)
			.pipe(
				tap(() => {
					this.router.navigate(["/dashboard"]);
				}),
				catchError((_err) => {
					return EMPTY;
				}),
				finalize(() => this.loading.set(false)),
			)
			.subscribe();
	}
}
