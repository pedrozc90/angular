import { Pipe, PipeTransform } from "@angular/core";
import { EnumPipe } from "./enum.pipe";
import { DocumentStatus, documentStatusMetadata, DocumentStatusMetadata } from "../types/enums";

@Pipe({
    name: "documentStatus",
})
export class DocumentStatusPipe extends EnumPipe<DocumentStatus, DocumentStatusMetadata> implements PipeTransform {

    protected readonly meta = documentStatusMetadata;

}
