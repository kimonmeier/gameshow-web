import { Games } from "../../enums/Games";
import { ScreenTypes } from "../../enums/ScreenTypes";
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

type GenericGameMasterShowScreenEvent = GenericGameMasterShowScreenEventNoPayload | GenericGameMasterShowScreenEventNextGame | GenericGameMasterShowScreenEventWinner;

interface GenericGameMasterShowScreenEventNoPayload {
    game: Games.Generic;
    action: GenericGameMasterActions.SHOW_SCREEN;
    screenType: ScreenTypes.PAUSE | ScreenTypes.GAMESHOW_POINTS;
}

interface GenericGameMasterShowScreenEventNextGame {
    game: Games.Generic;
    action: GenericGameMasterActions.SHOW_SCREEN,
    screenType: ScreenTypes.NEXT_GAME;
    gameTitle: string;
    gameNumber: number;
}

interface GenericGameMasterShowScreenEventWinner {
    game: Games.Generic;
    action: GenericGameMasterActions.SHOW_SCREEN,
    screenType: ScreenTypes.WINNER_SCREEN;
    winnerId: string;
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
}

interface GenericGameMasterSoundEvent {
    game: Games.Generic;
    action: GenericGameMasterActions.PLAY_SOUND | GenericGameMasterActions.STOP_SOUND,
    sound: GenericGameMasterAudioType
}

export enum GenericGameMasterActions {
    GAME_POINTS_CHANGED,
    SHOW_POINTS_CHANGED,
    SHOW_SCREEN,
    GIVE_CONTROLS,
    TAKE_CONTROLS,
    LOCK_BUZZER,
    RELEASE_BUZZER,
    START_GAMESHOW,
    PLAY_SOUND,
    STOP_SOUND
}

export enum GenericMitgliedActions {
    BUZZER_PRESSED,
    INPUT_CHANGED,
}

export type GenericGameMasterEvent = GenericGameMasterSoundEvent | GenericGameMaterStartShowAction | GenericGameMasterBuzzerEvent | GenericGameMasterControlsEvent | GenericGameMasterShowScreenEvent | GenericGameMasterPointsChangedEvent | GenericGameMasterShowPointsChangedEvent;
export type GenericMitgliedEvent = GenericMitgliedBuzzerEvent;