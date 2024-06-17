import { Games } from "../../enums/Games";

interface KartenkundeMapClickedAction {
    game: Games.Kartenkunde,
    action: KartenkundeClientAction.MAP_CLICKED,
    langitude: number,
    longitude: number;
}

interface KartenkundeLockedInAction {
    game: Games.Kartenkunde,
    action: KartenkundeClientAction.LOCKED_IN;
}

interface KartenkundeRevealGuessAction {
    game: Games.Kartenkunde,
    action: KartenkundeGameMasterAction.REVEAL_GUESSES,
}

interface KartenkundeNextQuestionAction {
    game: Games.Kartenkunde,
    action: KartenkundeGameMasterAction.NEXT_QUESTION;
}

interface KartenkundeAddQuestionAction {
    game: Games.Kartenkunde;
    action: KartenkundeGameMasterAction.ADD_QUESTION;
    id: string;
    question: string;
    location: Location;
}

interface KartenkundeRemoveQuestionAction {
    game: Games.Kartenkunde,
    action: KartenkundeGameMasterAction.REMOVE_QUESTION,
    id: string,
}

interface StartKartenkundeGame {
    game: Games.Kartenkunde,
    anzahlPunkte: number;
}

export enum KartenkundeClientAction {
    MAP_CLICKED,
    LOCKED_IN
}

export enum KartenkundeGameMasterAction {
    REVEAL_GUESSES,
    NEXT_QUESTION,
    ADD_QUESTION,
    REMOVE_QUESTION
}


export type KartenkundenGameMasterActionEvent = KartenkundeRevealGuessAction | KartenkundeNextQuestionAction | KartenkundeAddQuestionAction | KartenkundeRemoveQuestionAction;
export type KartenkundeMemberActionEvent = KartenkundeMapClickedAction | KartenkundeLockedInAction;
export type StartKartenkundeAction = StartKartenkundeGame;