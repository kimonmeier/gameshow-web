import type { GameInfo } from "gameshow-lib/entities/generic/GameInfo";
import type { ScreenTypes } from "gameshow-lib/enums/ScreenTypes";
import type { GameStarted } from "gameshow-lib/message/ServerMessage";
import type { ComponentType } from "svelte";

export interface GameScreenPauseInfo {
    type: ScreenTypes.PAUSE,
}

export interface GameScreenWinnerInfo {
    type: ScreenTypes.WINNER_SCREEN,
    playerId: string
}

export interface GameScreenNextGameInfo {
    type: ScreenTypes.NEXT_GAME,
    gameName: string,
    gameNumber: number,
}

export interface GameScreenShowPointsInfo {
    type: ScreenTypes.SHOW_POINTS,
    playerId: string
}

export interface GameScreenIngameInfo {
    type: ScreenTypes.INGAME,
    gameInfo: GameInfo,
    component: ComponentType
}

export type GameScreenInfo = GameScreenPauseInfo | GameScreenWinnerInfo | GameScreenNextGameInfo | GameScreenShowPointsInfo | GameScreenIngameInfo;