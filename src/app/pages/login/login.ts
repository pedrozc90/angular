import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { catchError, EMPTY, finalize, tap } from "rxjs";

import { AuthService } from "../../core/services";
import { CommonModule } from "@angular/common";

interface Credentials {
    email: string;
    password: string;
}

type CredentialsControls = {
    [key in keyof Credentials]: AbstractControl<Credentials[key]>
}

type CredentialsFormGroup = FormGroup & {
    value: Credentials,
    controls: CredentialsControls
}

@Component({
    standalone: true,
    selector: "app-login",
    styleUrl: "./login.scss",
    templateUrl: "./login.html",
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {

    public form = new FormGroup({
        email: new FormControl<string>("pedrozc90@angular.com", [Validators.required, Validators.email, Validators.maxLength(255)]),
        password: new FormControl<string>("angular", [Validators.required, Validators.minLength(6), Validators.maxLength(32)])
    }) as CredentialsFormGroup;

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
        // ignore
    }

    public onSubmit(event: unknown): void {
         console.log("Event:", event);

        if (this.form.invalid) {
            console.error("Login form has errors.", this.form);
            return;
        }

        const value = this.form.getRawValue() as Credentials;
        console.log("Value:", value);

        this.authService.login(value.email, value.password).pipe(
            tap((_) => this.router.navigate(["dashboard"])),
            catchError((err) => {
                console.error("Request Failed:", err);
                return EMPTY;
            }),
            finalize(() => {
                // ignore
            })
        ).subscribe();
    }

}
