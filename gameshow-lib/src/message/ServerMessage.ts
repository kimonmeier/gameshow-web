import { Config } from "../entities/generic/Config";
import { ScreenTypes } from "../enums/ScreenTypes";
import { ServerEvents } from "../enums/ServerEvents";
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

interface GameStartedEvent {
    type: ServerEvents.GAME_STARTED;
    data: GameStarted;
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


type ShowScreenEvent = ShowScreenEventNoPayload | ShowScreenEventNextGame | ShowScreenEventWinner;

interface ShowScreenEventNoPayload {
    type: ServerEvents.SHOW_SCREEN;
    screenType: ScreenTypes.PAUSE | ScreenTypes.GAMESHOW_POINTS;
}

interface ShowScreenEventNextGame {
    type: ServerEvents.SHOW_SCREEN;
    screenType: ScreenTypes.NEXT_GAME;
    gameTitle: string;
    gameNumber: number;
}

interface ShowScreenEventWinner {
    type: ServerEvents.SHOW_SCREEN;
    screenType: ScreenTypes.WINNER_SCREEN;
    winnerId: string;
}

interface ShowStartedEvent {
    type: ServerEvents.SHOW_STARTED;
}

interface MemberWonGameEvent {
    type: ServerEvents.MEMBER_WON_GAME,
    playerId: string;
}

export type GameStarted = MemoryGameStartedEvent;

export type ServerGameEvents = MemoryGameEvent | GenericGameEvent
export type ServerGameSpecificEvents = GameStartedEvent | GameEvent;

export type ServerMessage = MemberWonGameEvent | ShowStartedEvent | ShowScreenEvent | ConfigUpdatedEvent | GameStoppedEvent | ServerClosedEvent | PingServerEvent | NewMemberEvent | MemberSetIdEvent | RemoveMemberEvent | ServerGameSpecificEvents;