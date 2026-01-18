import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, signal } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";

import { Document, DocumentType } from "../../core/types";
import { DocumentStatusPipe, DocumentTypePipe } from "../../core/pipes";
import { FileService } from "../../core/services";
import { debounceTime } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

interface Filters {
    q: string;
}

type FiltersControls = {
    [key in keyof Filters]: AbstractControl<Filters[key]>
}

type FiltersFormGroup = FormGroup & {
    value: Filters,
    controls: FiltersControls
}

@Component({
    standalone: true,
    selector: "app-dashboard",
    styleUrl: "./dashboard.scss",
    templateUrl: "./dashboard.html",
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DocumentTypePipe,
        DocumentStatusPipe
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard {

    private fileService = inject(FileService);

    // --- reactive form ---
    readonly form = new FormGroup({
        q: new FormControl<string>("", [Validators.minLength(1)])
    }) as FiltersFormGroup;

    private filters = toSignal(
            this.form.valueChanges.pipe(debounceTime(300)),
            { initialValue: this.form.value }
        );

    // --- state ---
    public page = signal(1);
    public loading = signal(false);
    public files = signal<Document[]>([]);
    public total = signal(0);
    public readonly rows = 15;

    public hasPrev = computed(() => this.page() > 1);
    public hasNext = computed(() => this.page() * this.rows < this.total());

    constructor() {
        effect((onCleanup) => {
            if (!this.loading()) {
                this.loading.set(true);
            }

            const value = this.filters();
            const params = {
                page: this.page(),
                q: value.q || undefined
            }

            const sub = this.fileService.fetch(params).subscribe({
                next: (res) => {
                    const t = typeof res.list[0].type;
                    const s = typeof res.list[0].status;
                    this.total.set(res.total);
                    this.files.set(res.list);
                },
                error: () => this.files.set([]),
                complete: () => this.loading.set(false)
            });

            onCleanup(() => sub.unsubscribe());
        });
    }

    public next(): void {
        if (!this.hasNext()) return;
        this.page.update((p) => p + 1);
    }

    public prev(): void {
        if (!this.hasPrev()) return;
        this.page.update((p) => p - 1);
    }

    public search(): void {
        this.page.set(1);
    }

}
