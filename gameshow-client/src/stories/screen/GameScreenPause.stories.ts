import type { Meta, StoryObj } from '@storybook/svelte';
import GameScreenPause from '$lib/components/screen/GameScreenPause.svelte';
import '../../app.css';

const meta: Meta<GameScreenPause> = {
    component: GameScreenPause,
    beforeEach: () => {
    }
}

export default meta;

type Story = StoryObj<GameScreenPause>;

export const Default: Story = {
    
}