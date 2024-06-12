import { GamePointLayout } from "../../enums/GamePointLayout";

export interface GameInfoGeneric {
    name: string;
    points: GamePointLayout.NO_POINTS | GamePointLayout.POINTS_COUNT;
    buzzerActive: boolean;
}

export interface GameInfoMaxPoints {
    name: string;
    points: GamePointLayout.POINTS_MAX;
    maxPoints: number;
    buzzerActive: boolean;
}

export type GameInfo = GameInfoGeneric | GameInfoMaxPoints;
