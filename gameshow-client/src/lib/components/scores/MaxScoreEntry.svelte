<script lang="ts">
	import type { GameScreenIngameInfo } from '$lib/models/Game';
	import { currentGameState } from '$lib/stores/GameStore';
	import { gamePoints } from '$lib/stores/gamemaster/PlayerStore';
	import type { GameInfoMaxPoints } from 'gameshow-lib/entities/generic/GameInfo';
	import SinglePointEntry from './SinglePointEntry.svelte';

	export let playerid: string;

	function createArray(maxPoints: number, currentPoints: number): boolean[] {
		const array: boolean[] = [];
		for (let index = 0; index < maxPoints; index++) {
			array.push(currentPoints > index);
		}

		return array;
	}

	$: points = $gamePoints.find((x) => x.playerId == playerid)?.gamePoints ?? 3;
	$: maxPoints =
		(($currentGameState as GameScreenIngameInfo)?.gameInfo as GameInfoMaxPoints)?.maxPoints ?? 0;
	$: pointsToDisplay = createArray(maxPoints, points);
</script>

<div class="w-full flex flex-row items-center">
	{#each pointsToDisplay as point}
		<SinglePointEntry isFilled={point} />
	{/each}
</div>
