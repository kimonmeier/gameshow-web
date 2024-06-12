import { Games } from "gameshow-lib/enums/Games";
import { BasicGameManager } from "$services/games/BaiscGameManager";
import type { ServerGameEvents, } from "gameshow-lib/message/ServerMessage";
import type { StartGameAction } from "gameshow-lib/message/ClientMessage";
import { GenericActions, GenericGameMasterAudioType } from "gameshow-lib/message/generell/ServerMessageDetail";
import { buzzers, isBuzzerLocked } from "$lib/stores/BuzzerStore";
import { controls, gamePoints } from "$lib/stores/gamemaster/PlayerStore";
import { answerRightSound, answerWrongSound, ingameSound1, ingameSound2, ingameSound3, ingameSound4, ingameSound5 } from "$lib/stores/AudioStore";
import { get, type Readable } from "svelte/store";
import type { Sound } from "svelte-sound";
import { gameMasterStreamerName, gamemasterCamLink } from "$lib/stores/GameStore";

export class GenericGameManager extends BasicGameManager {
    public readonly game: Games = Games.Generic;
    private playingSounds: GenericGameMasterAudioType[] = [];

    public gameValueUpdated(m: ServerGameEvents): void {
        if (m.game != Games.Generic) {
            throw new Error("Wrong game");
        }

        switch (m.action) {
            case GenericActions.LOCK_BUZZER:
                isBuzzerLocked.set(true);
                break;
            case GenericActions.RELEASE_BUZZER:
                isBuzzerLocked.set(false);
                buzzers.clearBuzzing();
                break;
            case GenericActions.GAME_POINTS_CHANGED:
                gamePoints.updatePoints(m.playerId, null, m.points);
                break;
            case GenericActions.SHOW_POINTS_CHANGED:
                gamePoints.updatePoints(m.playerId, m.points, null);
                break;
            case GenericActions.PRESSED_BUZZER:
                buzzers.playerBuzzed(m.playerId, m.time);
                break;
            case GenericActions.PLAY_SOUND:
                this.playSound(m.sound, m.stopOthers);
                break;
            case GenericActions.STOP_SOUND:
                this.stopSound(m.sound);
                break;
            case GenericActions.SET_BROADCASTER_LINK:
                gamemasterCamLink.set(m.link);
                break;
            case GenericActions.SET_STREAMER:
                gameMasterStreamerName.set(m.streamerName);
                break;
            case GenericActions.GIVE_CONTROLS:
                controls.giveControl(m.playerId);
                break;
            case GenericActions.TAKE_CONTROLS:
                controls.removeControl(m.playerId);
                break;
            default:
                throw new Error("Method not implemented.");
        }
    }

    public startGame(m: StartGameAction): void {
        if (m.game != this.game) {
            throw new Error("Wrong game");
        }
    }

    public startGameAsGamemaster(): void {
        throw new Error("Method not implemented.");
    }

    private playSound(soundType: GenericGameMasterAudioType, stopOthers: boolean): void {        
        if (stopOthers) {
            this.playingSounds.forEach((type) => this.getAudioByType(type).stop());

            this.playingSounds = [];
        }
        
        if (this.playingSounds.find(x => x == soundType)) {
            return;
        }

        if (soundType == GenericGameMasterAudioType.GAME_MUSIC) {
            this.playingSounds.push(soundType)
        }

        this.getAudioByType(soundType).play();
    }

    private stopSound(soundType: GenericGameMasterAudioType) {
        switch (soundType) {
            case GenericGameMasterAudioType.GAME_MUSIC:
                get(ingameSound1).stop();
                get(ingameSound2).stop();
                get(ingameSound3).stop();
                get(ingameSound4).stop();
                get(ingameSound5).stop();
                break;
            default:
                this.getAudioByType(soundType).stop();
                break;
        }

        this.playingSounds = this.playingSounds.filter(x => x != soundType);
    }

    private getAudioByType(soundType: GenericGameMasterAudioType): Sound {
        switch (soundType) {
            case GenericGameMasterAudioType.WRONG_SOUND:
                return get(answerWrongSound);
            case GenericGameMasterAudioType.GAME_MUSIC:
                const random = Math.floor(Math.random() * 5);
                let soundToPlay: Readable<Sound>;
                switch (random) {
                    case 1:
                        soundToPlay = ingameSound2;
                        break;
                    case 2:
                        soundToPlay = ingameSound3;
                        break;
                    case 3:
                        soundToPlay = ingameSound4;
                        break;
                    case 4:
                        soundToPlay = ingameSound5;
                        break;
                    case 0:
                    default:
                        soundToPlay = ingameSound1;
                        break;
                }

                return get(soundToPlay);
            case GenericGameMasterAudioType.SUCCESS_SOUND:
                return get(answerRightSound);
            default:
                throw new Error("Unkown Sound");
        }
    }
}