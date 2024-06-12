import { Games } from "../../enums/Games";

interface GenericMemberPointsChangedEvent {
    game: Games.Generic;
    action: GenericActions.GAME_POINTS_CHANGED;
    playerId: string;
    points: number;
}

interface GenericShowPointsChangedEvent {
    game: Games.Generic;
    action: GenericActions.SHOW_POINTS_CHANGED;
    playerId: string;
    points: number;
}

interface GenericGameMasterControlsEvent {
    game: Games.Generic;
    action: GenericActions.GIVE_CONTROLS | GenericActions.TAKE_CONTROLS;
    playerId: string;
}

interface GenericBuzzerPressedEvent {
    game: Games.Generic;
    action: GenericActions.PRESSED_BUZZER
    playerId: string
    time: number
}

interface GenericBuzzerEvent {
    game: Games.Generic;
    action: GenericActions.LOCK_BUZZER | GenericActions.RELEASE_BUZZER
}

interface GenericGameMasterSoundEvent {
    game: Games.Generic;
    action: GenericActions.PLAY_SOUND | GenericActions.STOP_SOUND,
    sound: GenericGameMasterAudioType
}

export enum GenericGameMasterAudioType {
    SUCCESS_SOUND,
    WRONG_SOUND,
    GAME_FINISHED,
    GAME_MUSIC,
}

export enum GenericActions {
    GAME_POINTS_CHANGED,
    SHOW_POINTS_CHANGED,
    GIVE_CONTROLS,
    TAKE_CONTROLS,
    PRESSED_BUZZER,
    LOCK_BUZZER,
    RELEASE_BUZZER,
    PLAY_SOUND,
    STOP_SOUND,
}


export type GenericGameEvent = GenericGameMasterControlsEvent | GenericShowPointsChangedEvent | GenericMemberPointsChangedEvent | GenericGameMasterSoundEvent | GenericBuzzerEvent | GenericBuzzerPressedEvent;