import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { DocumentStatus, documentStatusList, documentStatusMetadata, DocumentType, documentTypeList } from "../../core/types";
import { FileService } from "../../core/services";
import { EMPTY, throwError } from "rxjs";

@Component({
    standalone: true,
    selector: "app-form",
    styleUrl: "./form.scss",
    templateUrl: "./form.html",
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Form {

    public readonly types = documentTypeList;
    public readonly statuses = documentStatusList;

    public form = new FormGroup({
        document: new FormControl<string>("", [Validators.required, Validators.maxLength(255)]),
        type: new FormControl<DocumentType>(DocumentType.INPUT, [Validators.required]),
        status: new FormControl<DocumentStatus>(DocumentStatus.ONGOING, [Validators.required]),
        results: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
        source: new FormControl<string>("None", [Validators.required, Validators.maxLength(255)]),
        destination: new FormControl<string>("None", [Validators.required, Validators.maxLength(255)])
    });

    private fileService = inject(FileService);

    public onSubmit(event: unknown): void {
        if (this.form.invalid) {
            return;
        }

        const value = this.form.value;
        console.log("Value:", value);

        this.fileService.save(value).subscribe({
            next: (res) => {
                console.log("Response", res);
            },
            error: (err) => { return EMPTY },
            complete: () => {
                console.log("Save completed");
            }
        });
    }

}
