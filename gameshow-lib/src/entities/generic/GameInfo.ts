import { GamePointLayout } from "../../enums/GamePointLayout";
import { Games } from "../../enums/Games";
import { Card } from "../memory/Card";

export interface GameInfo {
    points: GamePointLayout;
    maxPoints?: number;
    buzzerActive: boolean;
    data: GameSpecificData;
}

interface MemoryGameData {
    game: Games.Memory;
    cards: Card[];
}

type GameSpecificData = MemoryGameData;

