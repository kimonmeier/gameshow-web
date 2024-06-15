import { Games } from "../../enums/Games";
import type { Location } from "../../entities/kartenkunde/Location";

interface PlayerGuess {
    playerId: string;
    location: Location;
}

interface KartenkundeNewQuestionAction {
    game: Games.Kartenkunde;
    action: KartenkundeGameAction.NEW_QUESTION;
    question: string;
}

interface KartenkundeRevealGuessAction {
    game: Games.Kartenkunde;
    action: KartenkundeGameAction.REVEAL_GUESSES;
    location: Location;
    playerGuesses: PlayerGuess[];
}

interface KartenkundeQuestionUpdates {
    game: Games.Kartenkunde,
    action: KartenkundeGameAction.QUESTION_UPDATES,
    questions: {
        question: string,
        location: Location
    }[]
}

export interface KartenkundeStartedEvent {
    game: Games.Kartenkunde;
    anzahlRunden: number;
}

export enum KartenkundeGameAction {
    REVEAL_GUESSES,
    NEW_QUESTION,
    QUESTION_UPDATES
}

export type KartenkundeGameEvent = KartenkundeQuestionUpdates | KartenkundeNewQuestionAction | KartenkundeRevealGuessAction; 