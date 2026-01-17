import { EnumMetadata } from "../types";

export function enumToList<
    T extends string | number,
    M extends EnumMetadata
>(meta: Record<T, M>): T[] {
    return Object.entries(meta).map(([value, m]) => value as T);
}