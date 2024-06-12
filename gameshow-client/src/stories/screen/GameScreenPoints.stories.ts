import type { Meta, StoryObj } from '@storybook/svelte';
import '../../app.css';
import GameScreenGameshowPoints from '$lib/components/screen/GameScreenGameshowPoints.svelte';
import { gamePoints, player } from '$lib/stores/gamemaster/PlayerStore';
import { get } from 'svelte/store';
import { gameWinner, maxPointsToWin } from '$lib/stores/GameStore';

function addPlayer() {
    const id = crypto.randomUUID();

    player.addPlayer({
        id,
        name: 'Player',
        link: ''
    })

    gamePoints.addPlayer(id);
}

const meta: Meta<GameScreenGameshowPoints> = {
    component: GameScreenGameshowPoints,
    beforeEach: () => {
        maxPointsToWin.set(3);

        addPlayer();
        addPlayer();
    },
}

export default meta;

type Story = StoryObj<GameScreenGameshowPoints>;

export const Default: Story = {

}

export const WithPoints: Story = {
    beforeEach: () => {
        const playerId = get(player).at(0)!.id;
        gameWinner.set(playerId)
        gamePoints.updatePoints(playerId, 1, null)
    }
}