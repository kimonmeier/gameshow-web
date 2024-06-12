import type { Games } from "gameshow-lib/enums/Games";
import type { ClientMessage, StartGameAction } from "gameshow-lib/message/ClientMessage";
import type App from "$services/GameManager";
import type { ServerGameEvents } from "gameshow-lib/message/ServerMessage";

export abstract class BasicGameManager {
    public abstract readonly game: Games;
    private manager: App;

    public constructor (manager: App) {
        this.manager = manager;
    }

    public abstract gameValueUpdated(m: ServerGameEvents): void;

    public abstract startGame(m: StartGameAction): void;

    public abstract startGameAsGamemaster(): void;

    protected sendMessage(m: ClientMessage): void {
        this.manager.sendMessage(m);
    }
}