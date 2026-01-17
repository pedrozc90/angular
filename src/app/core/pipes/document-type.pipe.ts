import { Pipe, PipeTransform } from "@angular/core";
import { EnumPipe } from "./enum.pipe";
import { DocumentType, documentTypeMetadata, DocumentTypeMetadata } from "../types/enums";

@Pipe({
    name: "documentType",
})
export class DocumentTypePipe extends EnumPipe<DocumentType, DocumentTypeMetadata> implements PipeTransform {

    protected readonly meta = documentTypeMetadata;

}
