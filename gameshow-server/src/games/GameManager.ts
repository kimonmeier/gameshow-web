import WebSocketClient from "connection/WebSocketClient";
import WebSocketConnection from "connection/WebSocketConnection";
import PlayerManager from "core/PlayerManager";
import { ClientEvents } from "gameshow-lib/enums/ClientEvents";
import { Games } from "gameshow-lib/enums/Games";
import { ClientMessage, StartGameAction } from "gameshow-lib/message/ClientMessage";
import { BasicGameManager } from "./BaiscGameManager";
import { GenericGameManger } from "./generic/GenericGameManager";
import { MemoryGameManager } from "./memory/MemoryGameManager";

export class GameManager {
    private manager: BasicGameManager[] = [];
    private readonly connection: WebSocketConnection;
    private readonly playerManager: PlayerManager;

    public constructor (connection: WebSocketConnection, playerManager: PlayerManager) {
        this.connection = connection;
        this.playerManager = playerManager;

            
        const genericGameManager = new GenericGameManger(this.connection, this.playerManager);


        this.manager.push(
            genericGameManager,
            new MemoryGameManager(genericGameManager, this.connection, this.playerManager),
        );
    }

    public startGame(gameInfo: StartGameAction): void {
        this.manager.find(x => x.game == gameInfo.game)!.startGame(gameInfo);
    }

    public handleInputs(client: WebSocketClient, m: ClientMessage): void {
        if (m.type == ClientEvents.MITGLIED_ACTION) {
            this.getManagerByGame(m.data.game).handlePlayerInputs(m.data, client.uuid);
            return;
        } else if (m.type == ClientEvents.GAME_MASTER_ACTION) {
            this.getManagerByGame(m.data.game).handleGameMasterInputs(m.data, client.uuid);
            return;
        } else if (m.type == ClientEvents.START_GAME) {
            this.startGame(m.data);
            return;
        }

        console.log("GameManger doesnt handle this Message", m);
    }

    private getManagerByGame(game: Games): BasicGameManager {
        return this.manager.find(x => x.game == game)!;
    }
}