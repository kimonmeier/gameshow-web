import { Games } from "gameshow-lib/enums/Games";
import { get } from "svelte/store";
import { BasicGameManager } from "$services/games/BaiscGameManager";
import { ClientEvents } from "gameshow-lib/enums/ClientEvents";
import { memoryAnzCol, memoryAnzRounds, memoryAnzRows, memoryIcons } from "$stores/memory/GameStarteValues";
import { MemoryGameActions, type MemoryGameEvent } from "gameshow-lib/message/memory/ServerMessageDetails";
import { currentGamePhase, guessedCards, openCards } from "$lib/stores/memory/GameValue";
import type { StartMemoryAction } from "gameshow-lib/message/memory/ClientMessageDetails";

export class MemoryGameManager extends BasicGameManager {
    public readonly game: Games = Games.Memory;
    
    public gameValueUpdated(m: MemoryGameEvent): void {
        switch (m.action) {
            case MemoryGameActions.OPEN_CARD:
                openCards.update((x) => {
                    x.push(m.position);
                    return x;
                })
                break;
            case MemoryGameActions.CLOSE_CARD:
                openCards.update((x) => x.filter(z => z.x != m.position.x && z.y != m.position.y));
                break;
            case MemoryGameActions.NEW_CARDS:                
                memoryIcons.set(m.cards);
                break;
            case MemoryGameActions.CARDS_GUESSED:
                guessedCards.update(x => { x.push(m.icon); return x; })
                break;
            case MemoryGameActions.PHASE_CHANGED:
                currentGamePhase.set(m.phase);
                break;
        }
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

    public startGame(m: StartMemoryAction): void {
        if (m.game != this.game) {
            throw new Error("Wrong game");
        }

        memoryAnzCol.set(m.gridLayout.anzCol);
        memoryAnzRows.set(m.gridLayout.anzRows);
        memoryAnzRounds.set(m.rounds);
    }
}