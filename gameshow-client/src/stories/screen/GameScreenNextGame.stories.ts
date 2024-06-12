import type { Meta, StoryObj } from '@storybook/svelte';
import GameScreenNextGame from '$lib/components/screen/GameScreenNextGame.svelte';
import { currentGameState, type MockedGameStateStore } from '$lib/stores/GameStore';
import { ScreenTypes } from 'gameshow-lib/enums/ScreenTypes';

import '../../app.css';

const meta: Meta<GameScreenNextGame> = {
    component: GameScreenNextGame,
    args: {
        info: {
            type: ScreenTypes.NEXT_GAME,
            gameName: 'Memory',
            gameNumber: 2
        }
    },
    beforeEach: () => {
        (currentGameState as MockedGameStateStore).set({
            type: ScreenTypes.NEXT_GAME,
            gameName: 'Memory',
            gameNumber: 2
        })
    }
}

export default meta;

type Story = StoryObj<GameScreenNextGame>;

export const Default: Story = {
    
}