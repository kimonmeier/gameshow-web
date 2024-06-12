import { Config } from "../entities/generic/Config";
import { ClientEvents } from "../enums/ClientEvents";
import { GenericGameMasterEvent as GenericGameMasterActionEvent, GenericMitgliedEvent } from "./generell/ClientMessageDetail";
import { MemoryGameMasterActionEvent, MemoryMemberActionEvent, StartMemoryAction } from "./memory/ClientMessageDetails";

interface ConnectionSuccessEvent {
    type: ClientEvents.CONNECTION_SUCCESS;
    uuid: string;
}

interface MemberLoginEvent {
    type: ClientEvents.MEMBER_LOGIN;
    name: string;
    link: string;
}

interface MemberLeftEvent {
    type: ClientEvents.MEMBER_LEAVT,
}

interface PingReplayEvent {
    type: ClientEvents.PING_REPLAY;
    time: number;
}

interface MemberActionEvent {
    type: ClientEvents.MITGLIED_ACTION,
    data: ClientMitgliedAction;
}

interface GameMasterActionEvent {
    type: ClientEvents.GAME_MASTER_ACTION,
    data: ClientGameMasterAction;
}

interface ConfigUpdateEvent {
    type: ClientEvents.CONFIG_UPDATED,
    config: Config;
}

interface StartGameEvent {
    type: ClientEvents.START_GAME;
    data: StartGameAction;
}

export type ClientMitgliedAction = MemoryMemberActionEvent | GenericMitgliedEvent;
export type ClientGameMasterAction = MemoryGameMasterActionEvent | GenericGameMasterActionEvent;
export type StartGameAction = StartMemoryAction;

export type ClientGameSpecificEvents = StartGameEvent | MemberActionEvent | GameMasterActionEvent;

export type ClientMessage = ClientGameSpecificEvents | ConnectionSuccessEvent | MemberLoginEvent | MemberLeftEvent | PingReplayEvent | ConfigUpdateEvent;