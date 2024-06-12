import type { Meta, StoryObj } from '@storybook/svelte';

import '../../app.css';
import MemoryGame from '$lib/components/games/MemoryGame.svelte';
import { memoryIcons } from '$lib/stores/memory/GameStarteValues';
import type { Koordinate } from 'gameshow-lib/entities/memory/Koordinate';
import type { MemoryIcon } from 'gameshow-lib/entities/memory/Card';

const meta: Meta<MemoryGame> = {
    component: MemoryGame,
    beforeEach: () => {
        const map: Map<Koordinate, MemoryIcon> = new Map();
        map.set({ x: 0, y: 0 }, 'mdi:antenna' as MemoryIcon)
        map.set({ x: 1, y: 0 }, 'mdi:antenna' as MemoryIcon)
        map.set({ x: 2, y: 0 }, 'mdi:antenna' as MemoryIcon)
        map.set({ x: 3, y: 0 }, 'mdi:antenna' as MemoryIcon)
        map.set({ x: 0, y: 1 }, 'mdi:antenna' as MemoryIcon)
        map.set({ x: 1, y: 1 }, 'mdi:antenna' as MemoryIcon)
        map.set({ x: 2, y: 1 }, 'mdi:antenna' as MemoryIcon)
        map.set({ x: 3, y: 1 }, 'mdi:antenna' as MemoryIcon)

        memoryIcons.set(map)
    }
}

export default meta;

type Story = StoryObj<MemoryGame>;

export const Default: Story = {}