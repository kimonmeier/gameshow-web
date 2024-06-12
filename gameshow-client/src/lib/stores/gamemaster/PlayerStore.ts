import type { PlayerModel } from "$models/Player";
import type { PointsModel } from "$models/Points";
import { writable, type Readable } from "svelte/store";

interface PlayerStore extends Readable<PlayerModel[]> {
    addPlayer: (player: PlayerModel) => void;
    removePlayer: (playerId: string) => void;
    reset: () => void;
}

interface PointStore extends Readable<PointsModel[]> {
    addPlayer: (playerId: string) => void;
    removePlayer: (playerId: string) => void;
    reset: () => void;
    updatePoints: (playerId: string, showPoints: number | null, gamePoints: number | null) => void;
}

function createPlayerStore(): PlayerStore {
    const { subscribe, set, update } = writable<PlayerModel[]>([]);

    return {
        subscribe,
        addPlayer: (player: PlayerModel) => {
            update(x => { x.push(player); return x; });
            gamePoints.addPlayer(player.id);
        },
        removePlayer: (playerId: string) => {
            update(x => x.filter(x => x.id != playerId));
            gamePoints.removePlayer(playerId);
        },
        reset: () => set([])
    };
}

function createPointStore(): PointStore {
    const { subscribe, set, update } = writable<PointsModel[]>([]);

    return {
        subscribe,
        addPlayer: (playerId: string) => {
            update(x => {
                x.push({
                    playerId,
                    gamePoints: 0,
                    showPoints: 0,
                    subGamePoints: 0
                });

                return x;
            });
        },
        removePlayer: (playerId: string) => update(x => x.filter(x => x.playerId != playerId)),
        reset: () => set([]),
        updatePoints: (playerId: string, showPoints: number | null, gamePoints: number | null) => {
            update(x => {
                const currentEntry = x.find(x => x.playerId == playerId)!;

                if (showPoints) {
                    currentEntry.showPoints = showPoints;
                }

                if (gamePoints) {
                    currentEntry.gamePoints = gamePoints;
                }

                return x;
            });
        }
    };
}

export const player = createPlayerStore();
export const gamePoints = createPointStore();

export const currentPlayer = writable<PlayerModel>();
export const enemyPlayer = writable<PlayerModel | undefined>();