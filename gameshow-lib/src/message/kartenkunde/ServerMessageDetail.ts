import { Games } from "../../enums/Games";

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

export interface KartenkundeStartedEvent {
    game: Games.Kartenkunde;
    anzahlRunden: number;
}

export enum KartenkundeGameAction {
    REVEAL_GUESSES,
    NEW_QUESTION,
}

export type KartenkundeGameEvent = KartenkundeNewQuestionAction | KartenkundeRevealGuessAction; 