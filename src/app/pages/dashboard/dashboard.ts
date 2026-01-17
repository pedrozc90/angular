import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";

import { Document, DocumentType } from "../../core/types";
import { DocumentStatusPipe, DocumentTypePipe } from "../../core/pipes";
import { FileService } from "../../core/services";

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
export class Dashboard implements OnInit {

    private fileService = inject(FileService);

    // --- reactive form ---
    readonly form = new FormGroup({
        q: new FormControl<string>("", [Validators.minLength(1)])
    }) as FiltersFormGroup;

    // --- state ---
    public page = signal(1);
    public loading = signal(false);
    public files = signal<Document[]>([]);
    public total = signal(0);
    public readonly rows = 15;

    public hasPrev = computed(() => this.page() > 1);
    public hasNext = computed(() => this.page() * this.rows < this.total());

    public ngOnInit(): void {
        this.load();
    }

    public load(): void {
        this.loading.set(true);

        const value = this.form.value;
        const params = {
            page: this.page(),
            q: value.q || undefined
        }

        this.fileService.fetch(params).subscribe({
            next: (res) => {
                const t = typeof res.list[0].type;
                const s = typeof res.list[0].status;
                console.log(t, res.list[0].type === DocumentType.INPUT, s);
                this.total.set(res.total);
                this.files.set(res.list);
            },
            error: () => this.files.set([]),
            complete: () => this.loading.set(false)
        });
    }

    public next(): void {
        if (!this.hasNext()) return;
        this.page.update((p) => p + 1);
        this.load();
    }

    public prev(): void {
        if (!this.hasPrev()) return;
        this.page.update((p) => p - 1);
        this.load();
    }

    public search(): void {
        this.page.set(1);
        this.load();
    }

}
