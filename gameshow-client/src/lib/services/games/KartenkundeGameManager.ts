import { Games } from "gameshow-lib/enums/Games";
import type { ServerGameEvents } from "gameshow-lib/message/ServerMessage";
import { BasicGameManager } from "./BaiscGameManager";
import type { StartKartenkundeAction } from "gameshow-lib/message/kartenkunde/ClientMessageDetail";
import { KartenkundeGameAction, type KartenkundeGameEvent } from "gameshow-lib/message/kartenkunde/ServerMessageDetail";
import { isGamemaster } from "$lib/stores/CredentialStore";
import { get } from "svelte/store";
import { kartenkundeMaxPoints, kartenkundeQuestions } from "$lib/stores/kartenkunde/GameMasterQeustionStore";
import { kartenkundeCurrentInfo } from "$lib/stores/kartenkunde/GameValue";
import { ClientEvents } from "gameshow-lib/enums/ClientEvents";
import { currentGameState, type MockedGameStateStore } from "$lib/stores/GameStore";
import { ScreenTypes } from "gameshow-lib/enums/ScreenTypes";

export class KartenkundeGameManager extends BasicGameManager {
    public game: Games = Games.Kartenkunde;

    public gameValueUpdated(m: KartenkundeGameEvent): void {
        switch (m.action) {
            case KartenkundeGameAction.QUESTION_UPDATES:
                if (!get(isGamemaster)) {
                    break;
                }
                kartenkundeQuestions.set(m.questions);
                break;
            case KartenkundeGameAction.NEW_QUESTION:
                kartenkundeCurrentInfo.set({
                    question: m.question,
                    location: null,
                    answers: []
                });
                break;
            case KartenkundeGameAction.REVEAL_GUESSES:
                kartenkundeCurrentInfo.update(x => {
                    x.location = m.location;
                    x.answers = m.playerGuesses;
                    return x;
                })
                break;
        }
    }

    public startGame(m: StartKartenkundeAction): void {
        
    }

    public startGameAsGamemaster(): void {
        this.sendMessage({
            type: ClientEvents.START_GAME,
            data: {
                game: Games.Kartenkunde,
                anzahlPunkte: get(kartenkundeMaxPoints)
            }
        })
    }
}