import WebSocketClient from "connection/WebSocketClient";
import WebSocketConnection from "connection/WebSocketConnection";
import { ClientEvents } from "gameshow-lib/enums/ClientEvents";
import { Games } from "gameshow-lib/enums/Games";
import { ServerEvents } from "gameshow-lib/enums/ServerEvents";
import { ClientMessage } from "gameshow-lib/message/ClientMessage";
import { GenericActions } from "gameshow-lib/message/generell/ServerMessageDetail";

export default class PlayerManager {
    private readonly connection: WebSocketConnection;

    private players: Map<WebSocketClient, Player> = new Map();
    private showProgress: Map<string, number> = new Map();
    private gameProgress: Map<string, number> = new Map();
    private subGameProgress: Map<string, number> = new Map();


    public constructor (connection: WebSocketConnection) {
        this.connection = connection;
    }

    public clearGame(): void {
        this.gameProgress.clear();
        this.subGameProgress.clear();
    }

    public getSubGamePoints(uuid: string): number {
        if (!this.subGameProgress.has(uuid)) {
            this.subGameProgress.set(uuid, 0);
        }
        return this.subGameProgress.get(uuid)!;
    }

    public setSubGamePoints(uuid: string, points: number): void {
        this.subGameProgress.set(uuid, points);
    }

    public getGamePoints(uuid: string): number {
        if (!this.gameProgress.has(uuid)) {
            this.gameProgress.set(uuid, 0);
        }
        return this.gameProgress.get(uuid)!;
    }

    public getShowPoints(uuid: string): number {
        if (!this.showProgress.has(uuid)) {
            this.showProgress.set(uuid, 0);
        }
        return this.showProgress.get(uuid)!;
    }

    public setGamePoints(uuid: string, points: number): void {
        this.gameProgress.set(uuid, points);

        this.connection.broadcast({
            type: ServerEvents.UPDATED_GAME_VALUES,
            data: {
                game: Games.Generic,
                action: GenericActions.GAME_POINTS_CHANGED,
                playerId: uuid,
                points: this.getGamePoints(uuid)
            }
        });
    }

    public setShowPoints(uuid: string, points: number): void {
        this.showProgress.set(uuid, points);


        this.connection.broadcast({
            type: ServerEvents.UPDATED_GAME_VALUES,
            data: {
                game: Games.Generic,
                action: GenericActions.SHOW_POINTS_CHANGED,
                playerId: uuid,
                points: this.getShowPoints(uuid)
            }
        });
    }

    public handleInputs(client: WebSocketClient, m: ClientMessage): void {
        if (m.type == ClientEvents.MEMBER_LOGIN) {
            this.players.set(client, {
                client,
                name: m.name,
                link: m.link
            });

            this.connection.broadcast({
                type: ServerEvents.NEW_MITGLIED,
                id: client.uuid,
                name: m.name,
                link: m.link
            });

            client.send({
                type: ServerEvents.MITGLIED_SET_ID,
                id: client.uuid
            })
        } else if (m.type == ClientEvents.MEMBER_LEAVT) {
            this.gameProgress.delete(client.uuid);
            this.showProgress.delete(client.uuid);

            this.players.delete(client);

            this.connection.broadcast({
                type: ServerEvents.REMOVED_MITGLIED,
                id: client.uuid
            });
        }
    }

    public getPlayerByUuid(uuid: string): Player {
        return this.players.get(this.connection.clients.find(x => x.uuid == uuid) as WebSocketClient) as Player;
    }

    public getPlayers(): Player[] {
        return Array.from(this.players.values());
    }
}

export interface Player {
    client: WebSocketClient;
    name: string;
    link: string;
}