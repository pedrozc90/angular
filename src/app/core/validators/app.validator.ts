import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class AppValidators {

    public static confirmPassword(target: string) : ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            const reference = control.parent?.get(target)?.value;
            return (value !== reference) ? { mismatch: target } : null;
        }
    }

}
