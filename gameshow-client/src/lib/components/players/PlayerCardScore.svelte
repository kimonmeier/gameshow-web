<script lang="ts">
	import type { ComponentType } from 'svelte';
	import type { PlayerModel } from '$models/Player';
	import { currentGameState, type GameStateStore } from '$lib/stores/GameStore';
	import { GamePointLayout } from 'gameshow-lib/enums/GamePointLayout';
	import MaxScoreEntry from '../scores/MaxScoreEntry.svelte';
	import CountScoreEntry from '../scores/CountScoreEntry.svelte';
	import type { GameScreenInfo } from '$lib/models/Game';
	import { ScreenTypes } from 'gameshow-lib/enums/ScreenTypes';

	export let player: PlayerModel;

	function getScoreElement(game: GameScreenInfo): ComponentType | null {
		if (game.type != ScreenTypes.INGAME) {
			return null;
		}

		if (!game.gameInfo) {
			return null;
		}

		switch (game.gameInfo.points) {
			case GamePointLayout.POINTS_COUNT:
				return CountScoreEntry;
			case GamePointLayout.POINTS_MAX:
				return MaxScoreEntry;
			case GamePointLayout.NO_POINTS:
			default:
				return null;
		}
	}

	$: currentScoreTye = getScoreElement($currentGameState);
</script>

<div class="py-3 px-5 flex justify-center items-center text-3xl">
	{#if currentScoreTye}
		<svelte:component this={currentScoreTye} playerid={player.id} />
	{:else}
		{player.name}
	{/if}
</div>
