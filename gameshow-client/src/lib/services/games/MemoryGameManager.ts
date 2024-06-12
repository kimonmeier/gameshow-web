import { Games } from "gameshow-lib/enums/Games";
import { get } from "svelte/store";
import { BasicGameManager } from "$services/games/BaiscGameManager";
import { ClientEvents } from "gameshow-lib/enums/ClientEvents";
import { memoryAnzCol, memoryAnzRounds, memoryAnzRows } from "$stores/memory/GameStarteValues";
import type { ServerGameEvents } from "gameshow-lib/message/ServerMessage";
import type { StartGameAction } from "gameshow-lib/message/ClientMessage";

export class MemoryGameManager extends BasicGameManager {
    public readonly game: Games = Games.Memory;
    
    public gameValueUpdated(m: ServerGameEvents): void {
        throw new Error("Method not implemented.");
    }

    public startGameAsGamemaster(): void {
        this.sendMessage({
            type: ClientEvents.START_GAME,
            data: {
                game: Games.Memory,
                gridLayout: { anzCol: get(memoryAnzCol), anzRows: get(memoryAnzRows) },
                rounds: get(memoryAnzRounds)
            }
        })
    }

    public startGame(m: StartGameAction): void {
        if (m.game != this.game) {
            throw new Error("Wrong game");
        }
    }
}