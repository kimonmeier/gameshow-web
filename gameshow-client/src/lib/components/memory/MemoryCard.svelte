<script lang="ts">
	import Icon from '@iconify/svelte';
	import App from '$lib/services/GameManager';
	import { Games } from 'gameshow-lib/enums/Games';
	import { ClientEvents } from 'gameshow-lib/enums/ClientEvents';
	import { MemoryClientAction } from 'gameshow-lib/message/memory/ClientMessageDetails';
	import { guessedCards, openCards } from '$lib/stores/memory/GameValue';
	import { memoryIcons } from '$lib/stores/memory/GameStarteValues';
	import { controls } from '$lib/stores/gamemaster/PlayerStore';
	import { currentPlayerId } from '$lib/stores/CredentialStore';

	export let x: number;
	export let y: number;

	function onClicked() {
		if (!hasControl) {
			return;
		}

		if (isOpened || !card) {
			return;
		}

		App.getInstance().sendMessage({
			type: ClientEvents.MITGLIED_ACTION,
			data: {
				game: Games.Memory,
				action: MemoryClientAction.MemoryCardClicked,
				position: { x, y }
			}
		});
	}

	$: card = $memoryIcons.find((card) => card.position.x == x && card.position.y == y);
	$: index = (card != undefined ? $memoryIcons.findIndex((x) => x == card) : 0) + 1;
	$: isOpened =
		$openCards.find((koordinate) => koordinate.x == x && koordinate.y == y) != undefined;
	$: hasControl = $controls.find((x) => x == $currentPlayerId);
	$: isGuessed = $guessedCards.find((x) => x == card?.icon);
</script>

{#if isGuessed}
	<div class="border rounded-md shadow-lg w-[100px] h-[100px]" />
{:else}
	<button
		class="bg-white text-black card
		{isOpened
			? 'card-flipped'
			: ''} text-center flex justify-center items-center border rounded-md shadow-lg w-[100px] h-[100px]"
		on:click={onClicked}
	>
		{#if card}
			<div class="card-face front flex justify-center items-center text-3xl">
				{#if !isOpened}
					{index}
				{/if}
			</div>
			<div class="card-face back text-center">
				{#if isOpened}
					<Icon icon={card.icon} width="100px" />
				{/if}
			</div>
		{:else}
			<Icon icon="mdi:brain" width="100px" />
		{/if}
	</button>
{/if}

<style>
	.card {
		transform-style: preserve-3d;
		transition: transform 2s;
	}

	.card-flipped {
		transform: rotateY(180deg);
	}

	.card-face {
		backface-visibility: hidden;
	}

	.back {
		transform: rotateY(180deg);
	}
</style>
