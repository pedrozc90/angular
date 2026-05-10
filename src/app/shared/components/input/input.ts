import { ChangeDetectionStrategy, Component, computed, forwardRef, input, signal } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
	standalone: true,
	selector: "s-input",
	styleUrl: "./input.scss",
	templateUrl: "./input.html",
	imports: [FormsModule],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true,
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {
	public name = input<string | undefined>(undefined);
	public label = input<string | undefined>(undefined);
	public type = input<"text" | "password" | "number" | "email" | "date" | "date-time">("text");
	public placeholder = input<string | undefined>(undefined);
	public autocomplete = input<string | undefined>(undefined);

	public id = computed(() => this.name() ?? "");
	public for = computed(() => this.id());

	public visible = signal<boolean>(false);
	public activeType = computed(() => (this.type() === "password" ? (this.visible() ? "text" : "password") : this.type()));

	protected value = signal<unknown>(undefined);
	protected disabled = signal<boolean>(false);
	protected onChange: (value: unknown) => void = () => {};
	protected onTouched: () => void = () => {};

	public click(event: Event): void {
		event.stopPropagation();
		this.visible.update((v) => !v);
	}

	public writeValue(obj: unknown): void {
		this.value.set(obj);
	}

	public registerOnChange(fn: (value: unknown) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public setDisabledState(isDisabled: boolean): void {
		this.disabled.set(isDisabled);
	}
}
