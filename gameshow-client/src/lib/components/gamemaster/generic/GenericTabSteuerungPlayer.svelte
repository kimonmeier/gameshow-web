<script lang="ts">
	import GameshowButton from '$lib/components/button/GameshowButton.svelte';
	import type { PlayerModel } from '$lib/models/Player';
	import App from '$lib/services/GameManager';
	import { controls } from '$lib/stores/gamemaster/PlayerStore';
	import { ClientEvents } from 'gameshow-lib/enums/ClientEvents';
	import { Games } from 'gameshow-lib/enums/Games';
	import { GenericGameMasterActions } from 'gameshow-lib/message/generell/ClientMessageDetail';

	export let player: PlayerModel;

	function lockControls() {
		App.getInstance().sendMessage({
			type: ClientEvents.GAME_MASTER_ACTION,
			data: {
				game: Games.Generic,
				action: GenericGameMasterActions.TAKE_CONTROLS,
				playerId: player.id
			}
		});
	}

	function releaseControls() {
		App.getInstance().sendMessage({
			type: ClientEvents.GAME_MASTER_ACTION,
			data: {
				game: Games.Generic,
				action: GenericGameMasterActions.GIVE_CONTROLS,
				playerId: player.id
			}
		});
	}

	$: hasControl = $controls.find((x) => x == player.id) != null;
</script>

<div class="flex flex-row">
	<div class="font-bold flex-grow">
		{player.name}
	</div>
	<GameshowButton disabled={!hasControl} on:click={lockControls}>Sperren</GameshowButton>
	<GameshowButton disabled={hasControl} on:click={releaseControls}>Freigeben</GameshowButton>
</div>
