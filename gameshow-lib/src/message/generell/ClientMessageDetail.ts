import { Games } from "../../enums/Games";
import { StartGameAction } from "../ClientMessage";
import { GenericGameMasterAudioType } from "./ServerMessageDetail";

interface GenericGameMasterPointsChangedEvent {
    game: Games.Generic;
    action: GenericGameMasterActions.GAME_POINTS_CHANGED;
    playerId: string;
    points: number;
}

interface GenericGameMasterShowPointsChangedEvent {
    game: Games.Generic;
    action: GenericGameMasterActions.SHOW_POINTS_CHANGED;
    playerId: string;
    points: number;
}

interface GenericGameMasterSetStreamerEvent {
    game: Games.Generic;
    action: GenericGameMasterActions.SET_STREAMER;
    streamerName: string;
}

interface GenericGameMasterSetUrlEvent {
    game: Games.Generic;
    action: GenericGameMasterActions.SET_BROADCASTER_LINK,
    link: string;
}

interface GenericGameMasterControlsEvent {
    game: Games.Generic;
    action: GenericGameMasterActions.GIVE_CONTROLS | GenericGameMasterActions.TAKE_CONTROLS;
    playerId: string;
}

interface GenericGameMasterBuzzerEvent {
    game: Games.Generic;
    action: GenericGameMasterActions.LOCK_BUZZER | GenericGameMasterActions.RELEASE_BUZZER;
}

interface GenericMitgliedBuzzerEvent {
    game: Games.Generic;
    action: GenericMitgliedActions.BUZZER_PRESSED
} 

interface GenericGameMaterStartShowAction {
    game: Games.Generic,
    action: GenericGameMasterActions.START_GAMESHOW,
    pointsNeededToWin: number,
}

interface GenericGameMasterSoundEvent {
    game: Games.Generic;
    action: GenericGameMasterActions.PLAY_SOUND | GenericGameMasterActions.STOP_SOUND,
    sound: GenericGameMasterAudioType
}

export enum GenericGameMasterActions {
    GAME_POINTS_CHANGED,
    SHOW_POINTS_CHANGED,
    GIVE_CONTROLS,
    TAKE_CONTROLS,
    LOCK_BUZZER,
    RELEASE_BUZZER,
    START_GAMESHOW,
    PLAY_SOUND,
    STOP_SOUND,
    SET_STREAMER,
    SET_BROADCASTER_LINK,
}

export enum GenericMitgliedActions {
    BUZZER_PRESSED,
    INPUT_CHANGED,
}

export type GenericGameMasterEvent = GenericGameMasterSoundEvent | GenericGameMaterStartShowAction | GenericGameMasterBuzzerEvent | GenericGameMasterControlsEvent | GenericGameMasterPointsChangedEvent | GenericGameMasterShowPointsChangedEvent | GenericGameMasterSetStreamerEvent | GenericGameMasterSetUrlEvent;
export type GenericMitgliedEvent = GenericMitgliedBuzzerEvent;