import { EventEmitter } from "events";
import Client from "gameshow-lib/Client";
import Connection from "gameshow-lib/Connection";
import { ServerEvents } from "gameshow-lib/enums/ServerEvents";
import { ServerMessage } from "gameshow-lib/message/ServerMessage";
import { IncomingMessage } from "http";
import * as WebSocket from "ws";
import WebSocketClient from "./WebSocketClient";
import { Server } from "ws";


export default class WebSocketConnection
	extends EventEmitter
	implements Connection {
	private socket!: Server;
	private _clients: WebSocketClient[] = [];
	private readonly events: ServerMessage[] = [];

	public constructor () {
		super();
	}

	public connect(): void {
		this.socket = new WebSocket.WebSocketServer({
			port: 2223
		});

		this.socket.on("connection", this.handleConnect);
	}

	public broadcast(m: ServerMessage): void {
		this.sendTo(this._clients, m);
	}

	public broadcastExcept(m: ServerMessage, ...clients: WebSocketClient[]): void {
		let arrays = new Array();
		this._clients.forEach(element => {
			if (!clients.includes(element, 0)) {
				arrays.push(element);
			}
		});

		this.sendTo(arrays, m);
	}

	public sendTo(clients: WebSocketClient[], m: ServerMessage): void {
		for (const client of clients) client.send(m);
		this.events.push(m);
	}

	public sendToViaIds(clients: string[], m: ServerMessage): void {
		for (const clientId of clients) this.sendTo(this._clients.filter(x => x.uuid == clientId), m);
	}

	public get clients(): Client[] {
		return this._clients;
	}

	private handleConnect = (clientSocket: WebSocket, request: IncomingMessage) => {
		const ip = request.connection.remoteAddress;

		if (!ip) throw new Error("Connection had no ip");

		const client = new WebSocketClient(clientSocket, ip);

		this._clients.push(client);
		this.emit("connect", client);

		clientSocket.on("close", () => this.handleClose(client));
		clientSocket.on("message", (m) => this.handleMessage(client, m));

		client.send({ type: ServerEvents.PING, ms: 0 });
		this.events.forEach(element => {
			client.send(element);
		});
	};

	private handleClose = (client: WebSocketClient) => {
		this._clients = this._clients.filter((c) => c !== client);
		this.emit("disconnect", client);
	};

	private handleMessage = (client: WebSocketClient, data: WebSocket.Data) => {
		this.emit("message", client, JSON.parse(data.toString()));
	};
}