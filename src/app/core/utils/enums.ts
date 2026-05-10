import { EnumMetadata } from "../types";

export interface EnumOptions<T extends string | number, M extends EnumMetadata> {
	value: T;
	metadata: M;
}

export function enumToList<T extends string | number, M extends EnumMetadata>(meta: Record<T, M>): EnumOptions<T, M>[] {
	return Object.entries(meta).map(([value, m]) => ({ value: value as T, metadata: m as M }) as EnumOptions<T, M>);
}

export function enumToSet<T extends string | number, M extends EnumMetadata>(
	meta: Record<T, M>,
	selected: T[],
): EnumOptions<T, M>[] {
	return selected.map((value) => ({ value, metadata: meta[value] }));
}
