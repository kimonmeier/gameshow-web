import EventEmitter from "events";
import Client from "./Client";
import { ClientMessage } from "./message/ClientMessage";
import { ServerMessage } from "./message/ServerMessage";

export default interface Connection extends EventEmitter {
	addListener(type: "connect", cb: (c: Client) => void): this;
	addListener(type: "disconnect", cb: (c: Client) => void): this;
	addListener(type: "message", cb: (c: Client, m: ClientMessage) => void): this;
	broadcast(m: ServerMessage): void;
	readonly clients: Client[];
	emit(type: "connect", c: Client): boolean;
	emit(type: "disconnect", c: Client): boolean;
	emit(type: "message", c: Client, message: ClientMessage): boolean;
	removeListener(type: "connect", cb: (c: Client) => void): this;
	removeListener(type: "disconnect", cb: (c: Client) => void): this;
	removeListener(type: "message", cb: (c: Client, message: ClientMessage) => void): this;
	sendTo(clients: Client[], m: ServerMessage): void;
}