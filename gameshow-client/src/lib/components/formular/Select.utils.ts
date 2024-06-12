import type { Option } from "./Select.svelte";

export function getOptionsByEnum<T extends string | number | symbol>(labelMap: Record<T, string>): Option<T>[] {
    return Object.entries(labelMap).map(
        ([value, label]) =>
        ({
            value,
            label,
        } as Option<T>)
    );
}
