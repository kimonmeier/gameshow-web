<script lang="ts">
	import type { PlayerModel } from '$lib/models/Player';
	import { gameWinner, maxPointsToWin } from '$lib/stores/GameStore';
	import { gamePoints } from '$lib/stores/gamemaster/PlayerStore';

	export let player: PlayerModel;

	$: gameshowPoints = $gamePoints.find((x) => x.playerId == player.id)?.showPoints ?? 0;
	$: cssVarStyles = `--pre-width:${((gameshowPoints - 1) / $maxPointsToWin) * 100}%;--width:${
		(gameshowPoints / $maxPointsToWin) * 100
	}%`;
	$: isWinner = $gameWinner == player.id;
	$: console.log(gameshowPoints);
</script>

<div class="flex flex-row">
	<div class="rounded-full font-bold bg-purple-500 p-10 text-white">
		{player.name}
	</div>
	<div
		class="rounded-full flex-grow from-blue-100 to-violet-300 bg-gradient-to-r shadow-2xl shadow-purple-500 mx-2 overflow-hidden"
	>
		<div
			class="from-blue-400 to-violet-950 bg-gradient-to-r w-0 h-full rounded-r-full {isWinner
				? 'winnerAnimation'
				: 'looser'}"
			style={cssVarStyles}
		/>
	</div>
</div>

<style>
	.winnerAnimation {
		width: var(--pre-width);
		animation: scoreAnimation 1s linear 1s 1 forwards;
	}

	.looser {
		width: var(--width);
	}

	@keyframes scoreAnimation {
		0% {
			width: var(--pre-width);
		}

		100% {
			width: var(--width);
		}
	}
</style>
