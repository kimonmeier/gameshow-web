import { writable } from "svelte/store";
import type { Location } from "gameshow-lib/entities/kartenkunde/Location";

export const kartenkundeQuestions = writable<{ question: string, location: Location }[]>([])
export const kartenkundeMaxPoints = writable<number>() 