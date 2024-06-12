import MemoryCard from "$lib/components/memory/MemoryCard.svelte";
import type { Meta, StoryObj } from '@storybook/svelte';

import '../../app.css';

const meta: Meta<MemoryCard> = {
    component: MemoryCard,
}

export default meta;

type Story = StoryObj<MemoryCard>;

export const Default: Story = {
    
}