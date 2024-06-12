import type { Card, MemoryIcon } from "gameshow-lib/entities/memory/Card";
import type { Koordinate } from "gameshow-lib/entities/memory/Koordinate";
import { writable } from "svelte/store";

export interface MemoryIconInfo {
    icon: MemoryIcon,
    koordinate: Koordinate,
    opened: boolean
}

export const memoryAnzCol = writable(0);
export const memoryAnzRows = writable(0);
export const memoryAnzRounds = writable(0);
export const memoryIcons = writable<Card[]>([]);