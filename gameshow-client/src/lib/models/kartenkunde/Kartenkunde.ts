import type { Location } from "gameshow-lib/entities/kartenkunde/Location"

export interface KartenkundeModel {
    question: string;
    location: Location | null;
    answers: KartenkundeAnswer[];
}

export interface KartenkundeAnswer {
    playerId: string,
    location: Location
}