import { Koordinate } from "../../entities/memory/Koordinate";
import { Games } from "../../enums/Games";

export enum MemoryClientAction {
    MemoryCardClicked
}

interface MemoryCardClickedEvent {
    game: Games.Memory;
    action: MemoryClientAction.MemoryCardClicked;
    position: Koordinate;
}

interface StartMemoryGameEvent {
    game: Games.Memory;
    gridLayout: { anzCol: number, anzRows: number; };
    rounds: number;
}

interface MemoryNextPhaseEvent {
    game: Games.Memory;
    action: MemoryGameMasterAction.NEXT_PHASE;
    phase: MemoryGamePhase;
}

export enum MemoryGameMasterAction {
    NEXT_PHASE
}

export enum MemoryGamePhase {
    PICKING,
    PAUSE,
}

export type MemoryGameMasterActionEvent = MemoryNextPhaseEvent;
export type MemoryMemberActionEvent = MemoryCardClickedEvent;
export type StartMemoryAction = StartMemoryGameEvent; 