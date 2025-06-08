import { CdkTableModule } from "@angular/cdk/table";
import { Component, Injector, Input, OnInit, SkipSelf, ViewChild, forwardRef } from "@angular/core";
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, FormGroupDirective, NG_VALUE_ACCESSOR } from "@angular/forms";

/**
 * https://stackoverflow.com/questions/38547389/how-can-i-pass-the-formgroup-of-a-parent-component-to-its-child-component-using
 * https://medium.com/angular-in-depth/dont-reinvent-the-wheel-when-implementing-controlvalueaccessor-a0ed4ad0fafd
 */
@Component({
    selector: "app-input",
    templateUrl: "./input.component.html",
    styleUrls: ["./input.component.scss"],
    providers:[
    //     {
    //         provide: NG_VALUE_ACCESSOR,
    //         useExisting: InputComponent,
    //         multi: true
    //     }
        {
            provide: ControlContainer,
            // useExisting: FormGroupDirective,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class InputComponent implements OnInit {

    @Input("label")
    public label!: string;

    @Input("placeholder")
    public placeholder!: string;

    @Input("type")
    public type: string = "text";

    @Input("hint")
    public hint?: string;

    @Input("icon")
    public icon?: string;

    // @ViewChild(FormControlDirective, { static: true })
    // private formControlDirective!: FormControlDirective;

    // @Input("formControl")
    // public formControl?: FormControl<any>;

    @Input("name")
    public name!: string;

    // constructor(private controlContainer: ControlContainer, private injector: Injector, private formGroupDirective: FormGroupDirective) {}
    constructor(private controlContainer: ControlContainer) {}

    public get control() {
        // return this.formControl || (this.formControlName && this.controlContainer.control?.get(this.formControlName));
        return this.controlContainer.control?.get(this.name) as FormControl<any>;
    }

    // public get container() {
    //     return this.injector.get(ControlContainer);
    // }

    public ngOnInit(): void {
        const control = this.control;
        debugger;
    }

    // public writeValue(obj: any): void {
    //     this.formControlDirective.valueAccessor?.writeValue(obj);
    // }

    // public registerOnChange(fn: any): void {
    //     this.formControlDirective.valueAccessor?.registerOnChange(fn);
    // }

    // public registerOnTouched(fn: any): void {
    //     this.formControlDirective.valueAccessor?.registerOnTouched(fn);
    // }

    // public setDisabledState?(isDisabled: boolean): void {
    //     const setDisabledState = this.formControlDirective.valueAccessor?.setDisabledState;
    //     if (setDisabledState) {
    //         setDisabledState(isDisabled);
    //     }
    // }

}
