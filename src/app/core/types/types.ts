import { DocumentType, DocumentStatus } from "./enums";

export interface IEnvironment {
    mode: "production" | "stage" | "development",
    name: string;
    version: string;
    api: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Document {
    id: number,
    document: string,
    type: DocumentType,
    status: DocumentStatus,
    results: number,
    method: string,
    source: string | null,
    destination: string | null
}

export interface IContext {
    user: User;
    permissions: string[];
}

export interface IPage<T> {
    page: number;
    rows: number;
    total: number;
    list: T[];
}
