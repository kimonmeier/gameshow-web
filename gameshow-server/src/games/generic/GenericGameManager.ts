import WebSocketConnection from "connection/WebSocketConnection";
import PlayerManager from "core/PlayerManager";
import { Games } from "gameshow-lib/enums/Games";
import { ServerEvents } from "gameshow-lib/enums/ServerEvents";
import { ClientGameMasterAction, ClientMitgliedAction, StartGameAction } from "gameshow-lib/message/ClientMessage";
import { GenericGameMasterActions, GenericMitgliedActions } from "gameshow-lib/message/generell/ClientMessageDetail";
import { BasicGameManager } from "../BaiscGameManager";
import { GenericActions, GenericGameMasterAudioType } from "gameshow-lib/message/generell/ServerMessageDetail";
import { Server } from "http";

export class GenericGameManger extends BasicGameManager {
    public readonly game: Games = Games.Generic;
    private readonly buzzerPressed: Map<string, number> = new Map();
    private playerControls: string[] = [];

    public constructor (connection: WebSocketConnection, playerManager: PlayerManager) {
        super(connection, playerManager);
    }

    public handlePlayerInputs(m: ClientMitgliedAction, clientId: string): void {
        if (m.game != Games.Generic) {
            throw Error("Wrong Game");
        }

        switch (m.action) {
            case GenericMitgliedActions.BUZZER_PRESSED:
                if (this.buzzerPressed.has(clientId)) {
                    return;
                }

                let dateNow = Date.now();
                this.buzzerPressed.set(clientId, dateNow);

                this.sendMessage({
                    type: ServerEvents.UPDATED_GAME_VALUES,
                    data: {
                        game: Games.Generic,
                        action: GenericActions.PRESSED_BUZZER,
                        playerId: clientId,
                        time: dateNow
                    }
                });
        }
    }

    public handleGameMasterInputs(m: ClientGameMasterAction, clientId: string): void {
        if (m.game != Games.Generic) {
            throw Error("Wrong Game");
        }

        switch (m.action) {
            case GenericGameMasterActions.GAME_POINTS_CHANGED:
                this.playerManager.setGamePoints(m.playerId, m.points);
                break;

            case GenericGameMasterActions.SHOW_POINTS_CHANGED:
                this.playerManager.setShowPoints(m.playerId, m.points);
                break;

            case GenericGameMasterActions.LOCK_BUZZER:
                this.sendMessage({
                    type: ServerEvents.UPDATED_GAME_VALUES,
                    data: {
                        game: Games.Generic,
                        action: GenericActions.LOCK_BUZZER,
                    }
                })
                break;

            case GenericGameMasterActions.RELEASE_BUZZER:
                this.buzzerPressed.clear();
                
                this.sendMessage({
                    type: ServerEvents.UPDATED_GAME_VALUES,
                    data: {
                        game: Games.Generic,
                        action: GenericActions.RELEASE_BUZZER,
                    }
                })
                break;

            case GenericGameMasterActions.PLAY_SOUND:
                this.sendMessage({
                    type: ServerEvents.UPDATED_GAME_VALUES,
                    data: {
                        game: Games.Generic,
                        action: GenericActions.PLAY_SOUND,
                        sound: m.sound,
                        stopOthers: false
                    }
                });
                break;

            case GenericGameMasterActions.STOP_SOUND:
                this.sendMessage({
                    type: ServerEvents.UPDATED_GAME_VALUES,
                    data: {
                        game: Games.Generic,
                        action: GenericActions.STOP_SOUND,
                        sound: m.sound,
                        stopOthers: false
                    }
                });
                break;

            case GenericGameMasterActions.START_GAMESHOW:
                this.sendMessage({
                    type: ServerEvents.SHOW_STARTED,
                    pointsNeededToWin: m.pointsNeededToWin
                });
                break;
            case GenericGameMasterActions.SET_BROADCASTER_LINK:
                this.sendMessage({
                    type: ServerEvents.UPDATED_GAME_VALUES,
                    data: {
                        game: Games.Generic,
                        action: GenericActions.SET_BROADCASTER_LINK,
                        link: m.link
                    }
                });
                break;
            case GenericGameMasterActions.SET_STREAMER:
                this.sendMessage({
                    type: ServerEvents.UPDATED_GAME_VALUES,
                    data: {
                        game: Games.Generic,
                        action: GenericActions.SET_STREAMER,
                        streamerName: m.streamerName
                    }
                });
                break;
            case GenericGameMasterActions.GIVE_CONTROLS:
                this.givePlayerControl(m.playerId);
                break;
            case GenericGameMasterActions.TAKE_CONTROLS:
                this.takePlayerControl(m.playerId);
                break;
        }
    }

    public startGame(gameInfo: StartGameAction): void {
        throw new Error("Method not implemented.");
    }

    public finishCurrentGameAndAnnounceWinner(): void {
        this.takePlayersControl();

        let winnerId: string = '';
        let highestPoints: number = 0;
        const players = this.playerManager.getPlayers();

        players.forEach(player => {
            let currentPoints = this.playerManager.getGamePoints(player.client.uuid);

            if (currentPoints > highestPoints) {
                winnerId = player.client.uuid;
                highestPoints = currentPoints;
            }
        })

        this.sendMessage({
            type: ServerEvents.MEMBER_WON_GAME,
            playerId: winnerId
        });

        this.sendMessage({
            type: ServerEvents.UPDATED_GAME_VALUES,
            data: {
                game: Games.Generic,
                action: GenericActions.PLAY_SOUND,
                sound: GenericGameMasterAudioType.GAME_FINISHED,
                stopOthers: true
            }
        })

        this.playerManager.clearGame();

        setTimeout(() => {
            this.playerManager.setGamePoints(winnerId, this.playerManager.getGamePoints(winnerId) + 1);
        }, 10_000);
    }

    public givePlayerControl(playerId: string): void {
        this.playerControls.push(playerId);

        this.sendMessage({
            type: ServerEvents.UPDATED_GAME_VALUES,
            data: {
                game: Games.Generic,
                action: GenericActions.GIVE_CONTROLS,
                playerId: playerId,
            }
        })
    }

    public givePlayersControl(): void {
        this.playerControls.push(...this.playerManager.getPlayers().map(x => x.client.uuid))

        this.playerControls.forEach((playerId) => {
            this.sendMessage({
                type: ServerEvents.UPDATED_GAME_VALUES,
                data: {
                    game: Games.Generic,
                    action: GenericActions.GIVE_CONTROLS,
                    playerId: playerId,
                }
            })
        })
    }

    public takePlayerControl(playerId: string): void {
        this.playerControls = this.playerControls.filter(x => x != playerId);

        this.sendMessage({
            type: ServerEvents.UPDATED_GAME_VALUES,
            data: {
                game: Games.Generic,
                action: GenericActions.TAKE_CONTROLS,
                playerId: playerId,
            }
        })
    }

    public takePlayersControl(): void {
        this.playerControls.forEach((playerId) => {
            this.sendMessage({
                type: ServerEvents.UPDATED_GAME_VALUES,
                data: {
                    game: Games.Generic,
                    action: GenericActions.TAKE_CONTROLS,
                    playerId: playerId,
                }
            })
        })

        this.playerControls = [];
    }

    public swapPlayerControls(): void {
        let players = this.playerManager.getPlayers();
        players = players.filter(player => this.playerControls.find(x => x == player.client.uuid) == null)

        this.takePlayersControl();

        players.forEach((player) => {
            this.givePlayerControl(player.client.uuid);
        })        
    }
}