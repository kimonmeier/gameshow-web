import { Config } from "../entities/generic/Config";
import { GameInfo } from "../entities/generic/GameInfo";
import { ScreenTypes } from "../enums/ScreenTypes";
import { ServerEvents } from "../enums/ServerEvents";
import { StartGameAction } from "./ClientMessage";
import { GenericGameEvent } from "./generell/ServerMessageDetail";
import { MemoryGameEvent, MemoryGameStartedEvent } from "./memory/ServerMessageDetails";

interface PingServerEvent {
    type: ServerEvents.PING;
    ms: number;
}

interface NewMemberEvent {
    type: ServerEvents.NEW_MITGLIED;
    name: string;
    link: string;
    id: string;
}

interface MemberSetIdEvent {
    type: ServerEvents.MITGLIED_SET_ID;
    id: string;
}

interface RemoveMemberEvent {
    type: ServerEvents.REMOVED_MITGLIED,
    id: string;
}

interface GameEvent {
    type: ServerEvents.UPDATED_GAME_VALUES;
    data: ServerGameEvents;
}

export interface GameStartedEvent {
    type: ServerEvents.GAME_STARTED;
    info: GameInfo;
    startData: StartGameAction
}

interface GameStoppedEvent {
    type: ServerEvents.GAME_STOPPED;
}

interface ServerClosedEvent {
    type: ServerEvents.SERVER_CLOSED;
}

interface ConfigUpdatedEvent {
    type: ServerEvents.CONFIG_UPDATED;
    config: Config;
}
interface ShowStartedEvent {
    type: ServerEvents.SHOW_STARTED;
    pointsNeededToWin: number,
}

interface MemberWonGameEvent {
    type: ServerEvents.MEMBER_WON_GAME,
    playerId: string;
}

interface MemberWonGameShowEvent {
    type: ServerEvents.MEMBER_WON_GAMESHOW,
    playerId: string
}

export type GameStarted = MemoryGameStartedEvent;

export type ServerGameEvents = MemoryGameEvent | GenericGameEvent
export type ServerGameSpecificEvents = GameStartedEvent | GameEvent;

export type ServerMessage = MemberWonGameShowEvent | MemberWonGameEvent | ShowStartedEvent  | ConfigUpdatedEvent | GameStoppedEvent | ServerClosedEvent | PingServerEvent | NewMemberEvent | MemberSetIdEvent | RemoveMemberEvent | ServerGameSpecificEvents;