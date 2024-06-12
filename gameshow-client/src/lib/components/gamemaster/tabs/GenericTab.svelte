<script lang="ts">
	import Select from '$components/formular/Select.svelte';
	import { getOptionsByEnum } from '$components/formular/Select.utils';
	import GroupBox from '$components/groupBox/GroupBox.svelte';
	import { currentScreen, gameshowStarted } from '$stores/GameStore';
	import { gamePoints, player } from '$stores/gamemaster/PlayerStore';
	import { ClientEvents } from 'gameshow-lib/enums/ClientEvents';
	import { Games } from 'gameshow-lib/enums/Games';
	import { ScreenTypes } from 'gameshow-lib/enums/ScreenTypes.js';
	import { GenericGameMasterActions } from 'gameshow-lib/message/generell/ClientMessageDetail';
	import App from "$services/GameManager";
	import GameshowButton from '$lib/components/button/GameshowButton.svelte';

	let selectedGame: Games = Games.Generic;

	function addPlayerShowPoints(playerId: string) {
		updatePoints(playerId, true, +1);
	}

	function removePlayerShowPoints(playerId: string) {
		updatePoints(playerId, true, -1);
	}

	function addPlayerGamePoints(playerId: string) {
		updatePoints(playerId, false, +1);
	}

	function removePlayerGamePoints(playerId: string) {
		updatePoints(playerId, false, -1);
	}

	function updatePoints(playerId: string, isShowPoints: boolean, change: number) {
		const gamePointsInfo = $gamePoints.find((x) => x.playerId == playerId)!;
		App.getInstance().sendMessage({
			type: ClientEvents.GAME_MASTER_ACTION,
			data: {
				game: Games.Generic,
				action: isShowPoints ? GenericGameMasterActions.SHOW_POINTS_CHANGED : GenericGameMasterActions.GAME_POINTS_CHANGED,
				playerId: playerId,
				points: (isShowPoints ? gamePointsInfo.showPoints : gamePointsInfo.gamePoints)  + change
			}
		});
	}

	function changeScreenType() {
		if ($currentScreen == ScreenTypes.WINNER_SCREEN || $currentScreen == ScreenTypes.NEXT_GAME) {
			console.log("These screen types are not supported!");
			return;
		}

		App.getInstance().sendMessage({
			type: ClientEvents.GAME_MASTER_ACTION,
			data: {
				game: Games.Generic,
				action: GenericGameMasterActions.SHOW_SCREEN,
				screenType: $currentScreen
			}
		});
	}

	function startShow() {
		if ($gameshowStarted) {
			return;
		}

		App.getInstance().sendMessage({
			type: ClientEvents.GAME_MASTER_ACTION,
			data: {
				game: Games.Generic,
				action: GenericGameMasterActions.START_GAMESHOW
			}
		})
	}

	function startGame() {
		App.getInstance().startGame(selectedGame);
	}

	const screenTypesMapping: Record<ScreenTypes, string> = {
		[ScreenTypes.GAMESHOW_POINTS]: 'Gameshow Punkte',
		[ScreenTypes.NEXT_GAME]: 'Nächstes Spiel',
		[ScreenTypes.PAUSE]: 'Pause',
		[ScreenTypes.WINNER_SCREEN]: 'Gewinner'
	};

	const gamesMapping: Record<Games, string> = {
		[Games.Generic]: 'Start',
		[Games.Memory]: 'Memory'
	};
</script>

<div class="flex flex-col">
	<GroupBox title="Punkte">
		{#each $player as currentPlayer, _ (currentPlayer.id)}
			<GroupBox title="Spieler {_}" class="mx-4 flex-grow">
				<div>Name: {currentPlayer.name}</div>
				<div class="grid grid-cols-2">
					<div class="flex flex-row p-2 items-center justify-center">
						<button class="flex items-center justify-center w-10 h-8 bg-red-400 rounded-l-2xl font-bold text-lg" on:click={() => removePlayerShowPoints(currentPlayer.id)}>-</button>
						<div class="flex-grow flex items-center justify-center h-8 text-center bg-slate-500">
							Show: {$gamePoints.find((x) => x.playerId == currentPlayer.id)?.showPoints}
						</div>
						<button class="flex items-center justify-center w-10 h-8 bg-green-400 rounded-r-2xl font-bold text-lg" on:click={() => addPlayerShowPoints(currentPlayer.id)}>+</button>
					</div>
					<div class="flex flex-row p-2 items-center justify-center">
						<button class="flex items-center justify-center w-10 h-8 bg-red-400 rounded-l-2xl font-bold text-lg" on:click={() => removePlayerGamePoints(currentPlayer.id)}>-</button>
						<div class="flex-grow flex items-center justify-center h-8 text-center bg-slate-500">
							Game: {$gamePoints.find((x) => x.playerId == currentPlayer.id)?.gamePoints}
						</div>
						<button class="flex items-center justify-center w-10 h-8 bg-green-400 rounded-r-2xl font-bold text-lg" on:click={() => addPlayerGamePoints(currentPlayer.id)}>+</button>
					</div>
				</div>
			</GroupBox>
		{/each}
	</GroupBox>
	<GroupBox title="Phase">
		<GameshowButton on:click={startShow} disabled={$gameshowStarted}>Start Show</GameshowButton>
		<Select
			bind:value={$currentScreen}
			options={getOptionsByEnum(screenTypesMapping)}
		/>
		<div class="mt-2 flex">
			<GameshowButton on:click={changeScreenType}>Change Screen</GameshowButton>
		</div>
	</GroupBox>
	<GroupBox title="Game">
		<Select bind:value={selectedGame} options={getOptionsByEnum(gamesMapping)} />
		<div class="mt-2 flex">
			<GameshowButton on:click={startGame}>Change Game</GameshowButton>
		</div>
	</GroupBox>
</div>
