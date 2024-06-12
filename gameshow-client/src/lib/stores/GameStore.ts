import type { ScreenTypes } from "gameshow-lib/enums/ScreenTypes";
import type { GameInfo } from "gameshow-lib/entities/generic/GameInfo";
import { writable  } from "svelte/store";

export const currentGame = writable<GameInfo | undefined>();
export const currentScreen = writable<ScreenTypes>();
export const gameshowStarted = writable<boolean>(false);