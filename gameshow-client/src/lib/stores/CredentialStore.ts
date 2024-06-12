import { writable } from "svelte/store";
import type Credentials from "$models/Credentials";

export const Credentials = writable<Credentials>();
export const isGamemaster = writable<boolean>(false);
export const isLoggedIn = writable<boolean>(false);
export const currentPlayerId = writable<string>();