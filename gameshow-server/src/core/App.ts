import { ClientMessage } from "gameshow-lib/message/ClientMessage";
import WebSocketClient from "../connection/WebSocketClient";
import WebSocketConnection from "../connection/WebSocketConnection";
import { GameManager } from "../games/GameManager";
import PlayerManager from "./PlayerManager";

export default class App {
    private readonly WebSocket: WebSocketConnection;
    private readonly GameManager: GameManager;
    private readonly PlayerManager: PlayerManager;
    public lastControlled: number = 0;
    public currentPlayer: number = 0;

    public constructor () {
        this.WebSocket = new WebSocketConnection();
        this.PlayerManager = new PlayerManager(this.WebSocket);
        this.GameManager = new GameManager(this.WebSocket, this.PlayerManager);
    }

    public startApp(): void {
        console.log("Websocket wurde gestartet!");

        this.WebSocket.connect();

        this.WebSocket.addListener("message", (client: WebSocketClient, message: ClientMessage) => {
            console.log("Neue Nachricht vo dem Client: " + client.ip);
            console.log(message);

            this.GameManager.handleInputs(client, message);
            this.PlayerManager.handleInputs(client, message);
        });
    }

    public stopApp(): void {
    }
}