import type { MemoryIcon } from "gameshow-lib/entities/memory/Card";
import type { Koordinate } from "gameshow-lib/entities/memory/Koordinate";
import type { MemoryGamePhase } from "gameshow-lib/message/memory/ClientMessageDetails";
import { writable } from "svelte/store";

export const openCards = writable<Koordinate[]>([]);
export const guessedCards = writable<MemoryIcon[]>([]);
export const currentGamePhase = writable<MemoryGamePhase>();