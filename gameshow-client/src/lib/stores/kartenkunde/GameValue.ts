import type { KartenkundeModel } from "$lib/models/kartenkunde/Kartenkunde";
import { writable } from "svelte/store";

export const kartenkundeCurrentInfo = writable<KartenkundeModel>();