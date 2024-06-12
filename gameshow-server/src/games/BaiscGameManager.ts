import WebSocketConnection from "connection/WebSocketConnection";
import PlayerManager from "core/PlayerManager";
import { Games } from "gameshow-lib/enums/Games";
import { ClientGameMasterAction, ClientMitgliedAction, StartGameAction } from "gameshow-lib/message/ClientMessage";
import { ServerMessage } from "gameshow-lib/message/ServerMessage";

export abstract class BasicGameManager {
    private readonly connection: WebSocketConnection;
    protected readonly playerManager: PlayerManager;
    public abstract readonly game: Games;

    public constructor (connection: WebSocketConnection, playerManager: PlayerManager) {
        this.connection = connection;
        this.playerManager = playerManager;
    }

    public abstract handlePlayerInputs(m: ClientMitgliedAction, clientId: string): void;

    public abstract handleGameMasterInputs(m: ClientGameMasterAction, clientId: string): void;

    public abstract startGame(gameInfo: StartGameAction): void;

    protected sendMessage(m: ServerMessage, targets: string[] | null = null) {
        if (!targets) {
            this.connection.broadcast(m);
        } else {
            this.connection.sendToViaIds(targets, m);
        }
    }
}