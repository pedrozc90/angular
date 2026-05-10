import { ChangeDetectionStrategy, Component, computed, forwardRef, Input, input, signal } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
	standalone: true,
	selector: "s-select",
	styleUrl: "./select.scss",
	templateUrl: "./select.html",
	imports: [FormsModule],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectComponent),
			multi: true,
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<T = unknown> implements ControlValueAccessor {
	public id = input<string | undefined>(undefined);
	public label = input<string | undefined>(undefined);
	public placeholder = input<string | undefined>(undefined);

	public name = computed(() => this.id() ?? "");
	public for = computed(() => this.name());

	public options = input.required<T[]>();

	@Input()
	public value!: (row: T) => unknown;

	@Input()
	public text!: (row: T) => unknown;

	public nullable = input<string | undefined>(undefined);

	public selected = signal<unknown>(undefined);
	public disabled = signal<boolean>(false);
	public onChange: (value: unknown) => void = () => {};
	public onTouched: () => void = () => {};

	public writeValue(obj: unknown): void {
		this.selected.set(obj);
	}

	public registerOnChange(fn: (value: unknown) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public setDisabledState?(isDisabled: boolean): void {
		this.disabled.set(isDisabled);
	}
}
