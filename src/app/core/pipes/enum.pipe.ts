import { PipeTransform } from "@angular/core";

import { EnumMetadata } from "../types/enums";

export abstract class EnumPipe<
    T extends string | number,
    M extends EnumMetadata
> implements PipeTransform {

    protected abstract readonly meta: Record<T, M>;

    public transform(value: T | null | undefined, fallback: string = "none"): string {
        if (value) {
            const meta = this.meta[value];
            if (meta) {
                const value = this.format(meta);
                if (value) {
                    return value;
                }
            }
        }
        return fallback;
    }

    /**
     * Override this to customize what is rendered
     * 
     * @param meta - enum metadata
     * @returns return enum label, if null or undefined it fallback to default value 'none';
     */
    protected format(meta: M): string | null | undefined {
        return meta.label;
    }

}
