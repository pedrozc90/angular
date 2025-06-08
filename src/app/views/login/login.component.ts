import { Component } from "@angular/core";
import { AbstractControl, FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthenticationService } from "src/app/core/services";
import { UserCredentials } from "src/app/core/types";

type UserCredentialsControls = { [key in keyof UserCredentials]: AbstractControl<UserCredentials[key]> }

type UserCredentialsFormGroup = FormGroup & { value: UserCredentials, controls: UserCredentialsControls }

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent {

    public formGroup = new FormGroup({
        email: new FormControl<string>("", [Validators.required, Validators.email]),
        password: new FormControl<string>("", [Validators.required, Validators.minLength(6), Validators.maxLength(32)])
    }) as UserCredentialsFormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authentication: AuthenticationService
    ) { }

    public onLogin(): void {
        if (this.formGroup.invalid || this.formGroup.untouched) return;

        const value = this.formGroup.getRawValue();
        console.log(value);
        // this.authentication.login(value).subscribe((res) => {
        //     this.authentication.authenticate(res);
        //     this.router.navigate([ "home" ]);
        // });
    }

}
