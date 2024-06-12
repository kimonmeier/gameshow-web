<script lang="ts">
	import Select from '$components/formular/Select.svelte';
	import { getOptionsByEnum } from '$components/formular/Select.utils';
	import GroupBox from '$components/groupBox/GroupBox.svelte';
	import { gameshowStarted } from '$stores/GameStore';
	import { gamePoints, player } from '$stores/gamemaster/PlayerStore';
	import { ClientEvents } from 'gameshow-lib/enums/ClientEvents';
	import { Games } from 'gameshow-lib/enums/Games';
	import { ScreenTypes } from 'gameshow-lib/enums/ScreenTypes.js';
	import { GenericGameMasterActions } from 'gameshow-lib/message/generell/ClientMessageDetail';
	import App from '$services/GameManager';
	import GameshowButton from '$lib/components/button/GameshowButton.svelte';
	import FormField from '$lib/components/formular/FormField.svelte';
	import GenericTabSteuerung from '../generic/GenericTabSteuerung.svelte';

	let selectedGame: Games = Games.Generic;
	let pointsToWin: number;
	let streamerName: string;
	let broadcasterUrl: string;

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
				action: isShowPoints
					? GenericGameMasterActions.SHOW_POINTS_CHANGED
					: GenericGameMasterActions.GAME_POINTS_CHANGED,
				playerId: playerId,
				points: (isShowPoints ? gamePointsInfo.showPoints : gamePointsInfo.gamePoints) + change
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
				action: GenericGameMasterActions.START_GAMESHOW,
				pointsNeededToWin: pointsToWin
			}
		});
	}

	function startGame() {
		App.getInstance().startGame(selectedGame);
	}

	function updateStreamerName() {
		App.getInstance().sendMessage({
			type: ClientEvents.GAME_MASTER_ACTION,
			data: {
				game: Games.Generic,
				action: GenericGameMasterActions.SET_STREAMER,
				streamerName
			}
		});
	}

	function updateCamUrl() {
		App.getInstance().sendMessage({
			type: ClientEvents.GAME_MASTER_ACTION,
			data: {
				game: Games.Generic,
				action: GenericGameMasterActions.SET_BROADCASTER_LINK,
				link: broadcasterUrl
			}
		});
	}

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
						<button
							class="flex items-center justify-center w-10 h-8 bg-red-400 rounded-l-2xl font-bold text-lg"
							on:click={() => removePlayerShowPoints(currentPlayer.id)}>-</button
						>
						<div class="flex-grow flex items-center justify-center h-8 text-center bg-slate-500">
							Show: {$gamePoints.find((x) => x.playerId == currentPlayer.id)?.showPoints}
						</div>
						<button
							class="flex items-center justify-center w-10 h-8 bg-green-400 rounded-r-2xl font-bold text-lg"
							on:click={() => addPlayerShowPoints(currentPlayer.id)}>+</button
						>
					</div>
					<div class="flex flex-row p-2 items-center justify-center">
						<button
							class="flex items-center justify-center w-10 h-8 bg-red-400 rounded-l-2xl font-bold text-lg"
							on:click={() => removePlayerGamePoints(currentPlayer.id)}>-</button
						>
						<div class="flex-grow flex items-center justify-center h-8 text-center bg-slate-500">
							Game: {$gamePoints.find((x) => x.playerId == currentPlayer.id)?.gamePoints}
						</div>
						<button
							class="flex items-center justify-center w-10 h-8 bg-green-400 rounded-r-2xl font-bold text-lg"
							on:click={() => addPlayerGamePoints(currentPlayer.id)}>+</button
						>
					</div>
				</div>
			</GroupBox>
		{/each}
	</GroupBox>
	<GenericTabSteuerung />
	<GroupBox title="Informationen">
		<FormField label="Twitch Name">
			<input type="text" bind:value={streamerName} on:blur={updateStreamerName} />
		</FormField>
		<FormField label="Moderator Cam">
			<input type="url" placeholder="" bind:value={broadcasterUrl} on:blur={updateCamUrl} />
		</FormField>
	</GroupBox>
	<GroupBox title="Phase">
		<FormField label="Show Starten">
			<GameshowButton on:click={startShow} disabled={$gameshowStarted}>Start Show</GameshowButton>
		</FormField>
		<FormField label="Punkte um zu gewinnen">
			<input type="number" bind:value={pointsToWin} />
		</FormField>
	</GroupBox>
	<GroupBox title="Game">
		<FormField label="Spiel">
			<Select bind:value={selectedGame} options={getOptionsByEnum(gamesMapping)} />
		</FormField>
		<div class="mt-2 flex">
			<GameshowButton on:click={startGame}>Spiel starten</GameshowButton>
		</div>
	</GroupBox>
</div>
