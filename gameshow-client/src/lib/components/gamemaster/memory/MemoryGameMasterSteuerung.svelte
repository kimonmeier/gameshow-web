<script lang="ts">
	import GroupBox from '$components/groupBox/GroupBox.svelte';
	import GameshowButton from '$lib/components/button/GameshowButton.svelte';
	import App from '$lib/services/GameManager';
	import { ClientEvents } from 'gameshow-lib/enums/ClientEvents';
	import { Games } from 'gameshow-lib/enums/Games';
	import {
		MemoryGameMasterAction,
		MemoryGamePhase
	} from 'gameshow-lib/message/memory/ClientMessageDetails';

	function changePhase() {
		App.getInstance().sendMessage({
			type: ClientEvents.GAME_MASTER_ACTION,
			data: {
				game: Games.Memory,
				action: MemoryGameMasterAction.NEXT_PHASE,
				phase: MemoryGamePhase.PICKING
			}
		});
	}
</script>

<GroupBox title="Steuerung">
	<GameshowButton on:click={changePhase}>Nächste Phase</GameshowButton>
</GroupBox>
