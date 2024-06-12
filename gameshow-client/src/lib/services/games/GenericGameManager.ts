import { Games } from "gameshow-lib/enums/Games";
import { BasicGameManager } from "$services/games/BaiscGameManager";
import type { ServerGameEvents, } from "gameshow-lib/message/ServerMessage";
import type { StartGameAction } from "gameshow-lib/message/ClientMessage";
import { GenericActions } from "gameshow-lib/message/generell/ServerMessageDetail";
import { buzzers, isBuzzerLocked } from "$lib/stores/BuzzerStore";
import { gamePoints } from "$lib/stores/gamemaster/PlayerStore";

export class GenericGameManager extends BasicGameManager {
    public readonly game: Games = Games.Generic;

    public gameValueUpdated(m: ServerGameEvents): void {
        if (m.game != Games.Generic) {
            throw new Error("Wrong game");
        }

        switch (m.action) {
            case GenericActions.LOCK_BUZZER:
                isBuzzerLocked.set(true);
                break;
            case GenericActions.RELEASE_BUZZER:
                isBuzzerLocked.set(false);
                buzzers.clearBuzzing();
                break;
            case GenericActions.GAME_POINTS_CHANGED:
                gamePoints.updatePoints(m.playerId, null, m.points);
                break;
            case GenericActions.SHOW_POINTS_CHANGED:
                gamePoints.updatePoints(m.playerId, m.points, null);
                break;
            case GenericActions.PRESSED_BUZZER:
                buzzers.playerBuzzed(m.playerId, m.time);
                break;
            default:
                throw new Error("Method not implemented.");
        }
    }

    public startGame(m: StartGameAction): void {
        if (m.game != this.game) {
            throw new Error("Wrong game");
        }
    }

    public startGameAsGamemaster(): void {
        throw new Error("Method not implemented.");
    }
}