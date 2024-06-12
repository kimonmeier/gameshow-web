import type { Sound } from "svelte-sound";
import { writable } from "svelte/store";

export const buzzerSound = writable<Sound>();
export const buzzerSecondsSound = writable<Sound>();
export const buzzerLastSecondSound = writable<Sound>();
export const buzzerSoundPlayed = writable<boolean>(false);

export const answerRightSound = writable<Sound>();
export const answerWrongSound = writable<Sound>();