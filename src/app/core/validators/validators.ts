import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class BlankValidators {

    /**
     * Validate if a form control value is equal to a target value.
     */
    public static equals(target: unknown): ValidatorFn {
        return (control: AbstractControl<unknown>): ValidationErrors | null => {
            const value = control.value;
            return (value !== target) ? { notEqual: true } : null;
        }
    }

}
