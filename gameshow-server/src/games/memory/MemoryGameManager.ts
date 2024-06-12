import { Card, MemoryIcon } from "gameshow-lib/entities/memory/Card";
import { Games } from "gameshow-lib/enums/Games";
import ArrayHelper from "gameshow-lib/utils/ArrayUtils";
import { ServerEvents } from "gameshow-lib/enums/ServerEvents";
import { ClientGameMasterAction, ClientMitgliedAction } from "gameshow-lib/message/ClientMessage";
import { MemoryClientAction, MemoryGameMasterAction, MemoryGamePhase, StartMemoryAction } from "gameshow-lib/message/memory/ClientMessageDetails";
import { BasicGameManager } from "../BaiscGameManager";
import { Koordinate } from "gameshow-lib/entities/memory/Koordinate";
import { AvailableIcons } from "../../Const";
import { GenericGameManger } from "games/generic/GenericGameManager";
import WebSocketConnection from "connection/WebSocketConnection";
import PlayerManager from "core/PlayerManager";
import { GenericActions, GenericGameMasterAudioType } from "gameshow-lib/message/generell/ServerMessageDetail";
import { MemoryGameActions } from "gameshow-lib/message/memory/ServerMessageDetails";

export class MemoryGameManager extends BasicGameManager {
    public readonly game: Games = Games.Memory;
    private readonly genericGameManager: GenericGameManger;
    private roundsToPlay: number = 0;
    private cards: Card[] = [];
    private guessedCards: Card[] = [];
    private openCard?: Card;
    private gameInfo!: StartMemoryAction;

    public constructor(genericGameManager: GenericGameManger, connection: WebSocketConnection, playerManager: PlayerManager) {
        super(connection, playerManager);
        this.genericGameManager = genericGameManager;
    }

    public handlePlayerInputs(m: ClientMitgliedAction, clientId: string): void {
        if (m.game != Games.Memory) {
            throw new Error("Unkown game");
        }

        switch (m.action) {
            case MemoryClientAction.MemoryCardClicked:
                this.handlePlayerClick(clientId, m.position);
                break;
        }
    }

    public handleGameMasterInputs(m: ClientGameMasterAction, clientId: string): void {
        if (m.game != Games.Memory) {
            throw new Error("Unkown game");
        }

        switch (m.action) {
            case MemoryGameMasterAction.NEXT_PHASE:
                if (m.phase == MemoryGamePhase.PICKING) {
                    this.cards = [];
                    this.calculateCards();

                    this.sendMessage({
                        type: ServerEvents.UPDATED_GAME_VALUES,
                        data: {
                            game: Games.Memory,
                            action: MemoryGameActions.NEW_CARDS,
                            cards: this.cards
                        }
                    });
                }

                this.sendMessage({
                    type: ServerEvents.UPDATED_GAME_VALUES,
                    data: {
                        game: Games.Memory,
                        action: MemoryGameActions.PHASE_CHANGED,
                        phase: m.phase
                    }
                });
                break;
        }
    }

    public startGame(gameInfo: StartMemoryAction): void {
        this.gameInfo = gameInfo;
        this.roundsToPlay = gameInfo.rounds;
        this.calculateCards();

        this.sendMessage({
            type: ServerEvents.GAME_STARTED,
            data: {
                game: Games.Memory,
                cards: this.cards,
            },
        });

        this.sendMessage({
            type: ServerEvents.UPDATED_GAME_VALUES,
            data: {
                game: Games.Memory,
                action: MemoryGameActions.PHASE_CHANGED,
                phase: MemoryGamePhase.PAUSE
            }
        });
    }

    private handlePlayerClick(uuid: string, position: Koordinate): void {
        if (!this.openCard) {
            this.openCard = this.cards.find(x => x.position == position);

            this.sendMessage({
                type: ServerEvents.UPDATED_GAME_VALUES,
                data: {
                    game: Games.Memory,
                    action: MemoryGameActions.OPEN_CARD,
                    position: position,
                }
            });

            return;
        }

        const newlyOpenedCard = this.cards.find(x => x.position == position)!;

        if (this.openCard.icon != newlyOpenedCard.icon) {
            this.sendMessage({
                type: ServerEvents.UPDATED_GAME_VALUES,
                data: {
                    game: Games.Memory,
                    action: MemoryGameActions.CLOSE_CARD,
                    position: this.openCard.position,
                }
            })

            this.sendMessage({
                type: ServerEvents.UPDATED_GAME_VALUES,
                data: {
                    game: Games.Memory,
                    action: MemoryGameActions.CLOSE_CARD,
                    position: newlyOpenedCard.position,
                }
            })

            this.openCard = undefined;

            this.genericGameManager.swapPlayerControls();
            return;
        }

        this.sendMessage({
            type: ServerEvents.UPDATED_GAME_VALUES,
            data: {
                game: Games.Memory,
                action: MemoryGameActions.CARDS_GUESSED,
                icon: this.openCard.icon
            }
        });

        this.sendMessage({
            type: ServerEvents.UPDATED_GAME_VALUES,
            data: {
                game: Games.Generic,
                action: GenericActions.PLAY_SOUND,
                sound: GenericGameMasterAudioType.SUCCESS_SOUND
            }
        })

        this.guessedCards.push(this.openCard, newlyOpenedCard);

        this.playerManager.setGamePoints(uuid, this.playerManager.getGamePoints(uuid) + 1);

        if (this.guessedCards.length != this.cards.length) {
            return;         
        }
            
        console.log("This round is over!");  
        this.roundsToPlay -= 1;

        if (this.roundsToPlay == -1) {
            this.genericGameManager.finishCurrentGameAndAnnounceWinner();
            return;
        }
        
        setTimeout(() => {
            this.sendMessage({
                type: ServerEvents.UPDATED_GAME_VALUES,
                data: {
                    game: Games.Memory,
                    action: MemoryGameActions.PHASE_CHANGED,
                    phase: MemoryGamePhase.PAUSE
                }
            });
        }, 10_000);
    }

    private calculateCards(): void {
        this.guessedCards = [];
        let unUsedIcon = ArrayHelper.shuffleArray(AvailableIcons);
        let iconsUsedOnce: MemoryIcon[] = [];

        for (let indexX = 0; indexX < this.gameInfo.gridLayout.anzCol; indexX++) {
            for (let indexY = 0; indexY < this.gameInfo.gridLayout.anzRows; indexY++) {
                let currentIcon: MemoryIcon;
                if (unUsedIcon.length > 1 && Math.random() > 0.5) {
                    currentIcon = unUsedIcon.at(Math.round(Math.random() * unUsedIcon.length)) ?? '' as MemoryIcon;

                    unUsedIcon = unUsedIcon.filter(x => x != currentIcon);
                    iconsUsedOnce.push(currentIcon);

                } else {
                    currentIcon = iconsUsedOnce.at(Math.round(Math.random() * iconsUsedOnce.length)) ?? '' as MemoryIcon;
                    iconsUsedOnce = iconsUsedOnce.filter(x => x != currentIcon);
                }

                this.cards.push({
                    icon: currentIcon,
                    position: {
                        x: indexX,
                        y: indexY
                    }
                });
            }
        }
    }
}