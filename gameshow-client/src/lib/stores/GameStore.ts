import { ScreenTypes } from "gameshow-lib/enums/ScreenTypes";
import { get, writable, type Readable, type Updater  } from "svelte/store";
import type { ComponentType } from "svelte";
import { Games } from "gameshow-lib/enums/Games";
import MemoryGame from "$lib/components/games/MemoryGame.svelte";
import type { GameScreenInfo } from "$lib/models/Game";
import type { GameStartedEvent } from "gameshow-lib/message/ServerMessage";
import { nextGameSound } from "./AudioStore";


export interface GameStateStore extends Readable<GameScreenInfo> {
    stopGame: () => void
    stopGameWithWinner: (playerId: string) => void
    endShowWithWinner: (playerId: string) => void,
    startGame: (startedEvent: GameStartedEvent) => void,
}

export interface MockedGameStateStore extends GameStateStore {
    set: (this: void, info: GameScreenInfo) => void,
    update: (this: void, info: Updater<GameScreenInfo>) => void,
}

function getTypeByGame(game: Games): ComponentType {
    switch (game) {
        case Games.Memory:
            return MemoryGame;
        default:
            throw new Error("Unexpected Behaviour");
    }
}

function createGameStateStore(): MockedGameStateStore {
    const { set, update, subscribe } = writable<GameScreenInfo>({ type: ScreenTypes.PAUSE });

    let currentGameNumber = 0;

    return {
        set,
        subscribe,
        update,
        stopGame: () => {
            set({
                type: ScreenTypes.PAUSE
            })
        },
        stopGameWithWinner: (playerId) => {
            gameWinner.set(playerId);

            set({
                type: ScreenTypes.SHOW_POINTS,
                playerId: playerId
            })

            setTimeout(() => set({
                type: ScreenTypes.PAUSE
            }), 25_000)
        },
        startGame: (startedEvent: GameStartedEvent) => {
            currentGameNumber += 1;
            set({
                type: ScreenTypes.NEXT_GAME,
                gameName: startedEvent.info.name,
                gameNumber: currentGameNumber,
            })

            get(nextGameSound).play()

            setTimeout(() => set({
                type: ScreenTypes.INGAME,
                component: getTypeByGame(startedEvent.startData.game),
                gameInfo: startedEvent.info,
            }), 10_000);
        },
        endShowWithWinner: (playerId) => {
            set({
                type: ScreenTypes.WINNER_SCREEN,
                playerId
            })
        }
    }
}

export const currentGameState: GameStateStore = createGameStateStore();
export const gameshowStarted = writable<boolean>(false);
export const gameMasterStreamerName = writable<string>("LH_Lucky");
export const gamemasterCamLink = writable<string | null>(null);
export const maxPointsToWin = writable<number>();
export const gameWinner = writable<string | null>();
