import { Card, MemoryIcon } from "../../entities/memory/Card";
import { Koordinate } from "../../entities/memory/Koordinate";
import { Games } from "../../enums/Games";
import { MemoryGamePhase } from "./ClientMessageDetails";

interface MemoryCardsOpenEvent {
    game: Games.Memory;
    action: MemoryGameActions.OPEN_CARD;
    position: Koordinate;
}

interface MemoryCardsCloseEvent {
    game: Games.Memory,
    action: MemoryGameActions.CLOSE_CARD,
    position: Koordinate;
}

interface MemoryPhaseChangedEvent {
    game: Games.Memory;
    action: MemoryGameActions.PHASE_CHANGED;
    phase: MemoryGamePhase;
}

interface MemoryCardsGuessedEvent {
    game: Games.Memory,
    action: MemoryGameActions.CARDS_GUESSED,
    icon: MemoryIcon
}

interface MemoryCardNewEvent {
    game: Games.Memory,
    action: MemoryGameActions.NEW_CARDS,
    cards: Card[]
}

export enum MemoryGameActions {
    OPEN_CARD,
    CLOSE_CARD,
    NEW_CARDS,
    PHASE_CHANGED,
    CARDS_GUESSED,
}

export interface MemoryGameStartedEvent {
    game: Games.Memory;
    cards: Card[];
}

export type MemoryGameEvent = MemoryCardNewEvent | MemoryPhaseChangedEvent | MemoryCardsCloseEvent | MemoryCardsOpenEvent | MemoryCardsGuessedEvent;