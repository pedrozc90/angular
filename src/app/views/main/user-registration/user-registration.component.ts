import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, map, mergeMap, of } from "rxjs";

import { UsersService } from "src/app/core/services";
import { User, UserRegistration } from "src/app/core/types";
import { AppValidators } from "src/app/core/validators";

type UserRegistrationControls = { [key in keyof UserRegistration]: AbstractControl<UserRegistration[key]> }

type UserRegistrationFormGroup = FormGroup & { value: UserRegistration, controls: UserRegistrationControls }

@Component({
    selector: "app-user-registration",
    templateUrl: "./user-registration.component.html",
    styleUrls: ["./user-registration.component.scss"]
})
export class UserRegistrationComponent implements OnInit {

    public isLoading: boolean = true;
    public id?: number;
    public user?: User;

    public formGroup = new FormGroup({
        id: new FormControl<number | null>(null),
        email: new FormControl<string>("", [Validators.required, Validators.email]),
        username: new FormControl<string>("", [Validators.required]),
        password: new FormControl<string>("", [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
        confirm_password: new FormControl<string>("", [Validators.required, Validators.minLength(6), Validators.maxLength(32), AppValidators.confirmPassword("password")])
    }) as UserRegistrationFormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private usrService: UsersService
    ) {
        // do nothing
    }

    public ngOnInit(): void {
        this.isLoading = true;
        this.getParams().pipe(
            mergeMap((id) => (id) ? this.onLoad(id) : this.onCreate())
        ).subscribe((res) => {
            this.isLoading = false;
            this.user = res || undefined;
        });
    }

    private getParams(): Observable<number | null> {
        return this.route.paramMap.pipe(
            map((params) => Number(params.get("id")) || null)
        );
    }

    private onCreate(): Observable<User | null> {
        delete this.id;
        this.populateFormGroup();
        return of(null);
    }

    private onLoad(id: number): Observable<User | null> {
        return this.usrService.get(id).pipe(
            map((res) => {
                this.id = id;
                this.populateFormGroup(res);
                return res;
            })
        );
    }

    private populateFormGroup(user?: User) : void {
        this.formGroup.controls.id.setValue(user?.id || null);
        this.formGroup.controls.email.setValue(user?.email || "");
        this.formGroup.controls.username.setValue(user?.username || "");
        this.formGroup.controls.password.setValue(user?.password || "");
        this.formGroup.controls.confirm_password.setValue(user?.password || "");
    }

    public onSave(): void {
        if (this.formGroup.invalid || this.formGroup.untouched) return;

        const value = this.formGroup.getRawValue();

        if (!value.id) {
            this.usrService.save(value).subscribe((res) => {
                debugger;
            });
        } else {
            this.usrService.update(value.id, value).subscribe((res) => {
                debugger;
            });
        }
    }

    public onDebug(): void {
        debugger;
    }

}
