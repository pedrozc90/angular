export function assertDocument(obj: any): obj is Document {
    return ("id" in obj)
        && ("type" in obj)
        && ("status" in obj);
}
