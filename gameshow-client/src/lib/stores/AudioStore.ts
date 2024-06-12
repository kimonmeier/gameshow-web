import type { Sound } from "svelte-sound";
import { writable } from "svelte/store";

export const buzzerSound = writable<Sound>();
export const buzzerSecondsSound = writable<Sound>();
export const buzzerLastSecondSound = writable<Sound>();
export const buzzerSoundPlayed = writable<boolean>(false);

export const nextGameSound = writable<Sound>();

export const answerRightSound = writable<Sound>();
export const answerWrongSound = writable<Sound>();

export const ingameSound1 = writable<Sound>();
export const ingameSound2 = writable<Sound>();
export const ingameSound3 = writable<Sound>();
export const ingameSound4 = writable<Sound>();
export const ingameSound5 = writable<Sound>();