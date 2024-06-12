import { goto } from "$app/navigation";
import { ClientEvents } from "gameshow-lib/enums/ClientEvents";
import type { Games } from "gameshow-lib/enums/Games";
import { ServerEvents } from "gameshow-lib/enums/ServerEvents";
import type { ClientMessage } from "gameshow-lib/message/ClientMessage";
import type { ServerMessage } from "gameshow-lib/message/ServerMessage";
import { currentPlayer, enemyPlayer, player } from "$stores/gamemaster/PlayerStore";
import WebSocketClient from "./WebSocketClient";
import type { BasicGameManager } from "$services/games/BaiscGameManager";
import { GenericGameManager } from "$services/games/GenericGameManager";
import { MemoryGameManager } from "$services/games/MemoryGameManager";
import { get } from "svelte/store";
import { currentPlayerId, isGamemaster, isLoggedIn } from "$stores/CredentialStore";
import { currentGameState, gameWinner, gameshowStarted } from "$stores/GameStore";

export default class App {
    private static instance: App;

    public static getInstance(): App {
        if (App.instance == undefined) {
            new App();
        }

        return App.instance;
    }

    private client!: WebSocketClient;
    private gameManager: BasicGameManager[];

    private constructor () {
        App.instance = this;

        this.gameManager = [
            new GenericGameManager(this),
            new MemoryGameManager(this)
        ];
    }

    public startApp(): void {
        //this.client = new WebSocketClient("wss://gameshow.k-meier.ch");
        this.client = new WebSocketClient("ws://localhost:2222");

        this.client.recieve = (m) => this.recieve(m);
    }

    public async awaitConnection(timeout: number): Promise<boolean> {
        console.log("await connection");
        let index = 0;
        while (!this.client.isOpen && index < timeout) {
            console.log("Checking", this.client.isOpen, index);
            await new Promise(r => setTimeout(r, 10));
            index++;
        }

        console.log("No checking anymore");

        return this.client.isOpen;
    }

    public stopApp(): void {
        this.client?.send({
            type: ClientEvents.MEMBER_LEAVT
        });

        goto("/", {
            invalidateAll: true,
            replaceState: true,
            state: null
        });
    }

    public startGame(game: Games): void {
        this.gameManager.find(x => x.game == game)!.startGameAsGamemaster();
    }

    public sendMessage(m: ClientMessage): void {
        this.client.send(m);
    }

    public get isConnected(): boolean {
        return this.client?.isOpen;
    }


    public getGameManager(game: Games.Generic): GenericGameManager;
    public getGameManager(game: Games.Memory): MemoryGameManager;
    public getGameManager(game: Games): BasicGameManager {
        return this.gameManager.find(x => x.game === game)!;
    }

    private async recieve(m: ServerMessage): Promise<void> {
        console.log("Neue Nachricht vom Server");
        console.log(m);

        switch (m.type) {
            case ServerEvents.NEW_MITGLIED:
                player.addPlayer({
                    id: m.id,
                    link: m.link,
                    name: m.name
                });
                break;
            case ServerEvents.REMOVED_MITGLIED:
                player.removePlayer(m.id);
                break;

            case ServerEvents.PING:
                console.log("PING");
                break;
                
            case ServerEvents.UPDATED_GAME_VALUES:
                this.gameManager.find(x => x.game == m.data.game)!.gameValueUpdated(m.data);
                break;

            case ServerEvents.SERVER_CLOSED:
                await goto('/');
                break;

            case ServerEvents.MITGLIED_SET_ID:
                currentPlayerId.set(m.id);
                isLoggedIn.set(true);

                break;

            case ServerEvents.SHOW_STARTED:
                const players = get(player);

                const currentId = get(currentPlayerId);
                if (currentId) {

                    currentPlayer.set(players.find(x => x.id == currentId)!)
                    enemyPlayer.set(players.find(x => x.id != currentId));
                } else {
                    // Public
                    currentPlayer.set(players.at(0)!)
                    enemyPlayer.set(players.at(1));
                }

                gameshowStarted.set(true);

                if (!get(isGamemaster)) {
                    goto("/play");
                }
                break;
            case ServerEvents.MEMBER_WON_GAME:
                currentGameState.stopGameWithWinner(m.playerId);
                break;
            case ServerEvents.GAME_STARTED:
                this.getGameManager(m.startData.game).startGame(m.startData);
                
                currentGameState.startGame(m);
                break;
            case ServerEvents.MEMBER_WON_GAMESHOW:
                break;
            case ServerEvents.CONFIG_UPDATED:
                throw new Error("TO IMPLEMENT");
        }
    }
}