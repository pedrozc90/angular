import { enumToList } from "../utils/enum";

export type EnumMetadata = {
    label: string;
}

export enum DocumentType {
    INPUT = "INPUT",
    OUTPUT = "OUTPUT"
}

export type DocumentTypeKey = keyof typeof DocumentType;

export type DocumentTypeMetadata = EnumMetadata & {
    flag: boolean;
}

export const documentTypeMetadata: Record<DocumentType, DocumentTypeMetadata> = {
    [DocumentType.INPUT]: { label: "Input", flag: true },
    [DocumentType.OUTPUT]: { label: "Output", flag: false }
};

export const documentTypeList = enumToList(documentTypeMetadata);

export enum DocumentStatus {
    ONGOING = "ONGOING",
    COMPLETED = "COMPLETED",
    ABORTED = "ABORTED",
    CANCELED = "CANCELED"
}

export type DocumentStatusKey = keyof typeof DocumentStatus;

export type DocumentStatusMetadata = EnumMetadata & {
    arg1?: string;
}

export const documentStatusMetadata: Record<DocumentStatus, DocumentStatusMetadata> = {
    [DocumentStatus.ONGOING]: { label: "Ongoing" },
    [DocumentStatus.COMPLETED]: { label: "Completed" },
    [DocumentStatus.ABORTED]: { label: "Aborted" },
    [DocumentStatus.CANCELED]: { label: "Canceled" }
};

export const documentStatusList = enumToList(documentStatusMetadata);
