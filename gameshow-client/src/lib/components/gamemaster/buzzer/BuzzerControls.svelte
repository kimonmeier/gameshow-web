<script lang="ts">
	import GroupBox from '$lib/components/groupBox/GroupBox.svelte';
	import { isBuzzerLocked } from '$lib/stores/BuzzerStore';
	import App from '$services/GameManager';
	import { ClientEvents } from 'gameshow-lib/enums/ClientEvents';
	import { Games } from 'gameshow-lib/enums/Games';
	import { GenericGameMasterActions } from 'gameshow-lib/message/generell/ClientMessageDetail';

	function releaseBuzzer() {
		App.getInstance().sendMessage({
			type: ClientEvents.GAME_MASTER_ACTION,
			data: {
				game: Games.Generic,
				action: GenericGameMasterActions.RELEASE_BUZZER
			}
		});
	}

	function lockBuzzer() {
		App.getInstance().sendMessage({
			type: ClientEvents.GAME_MASTER_ACTION,
			data: {
				game: Games.Generic,
				action: GenericGameMasterActions.LOCK_BUZZER
			}
		});
	}
</script>

<GroupBox title="Steuerung">
	<button class="bg-green-600 disabled:bg-green-900 p-2 rounded-3xl" on:click={releaseBuzzer}>
		Buzzer freigeben
	</button>
	<button
		class="bg-indigo-600 disabled:bg-indigo-900 p-2 rounded-3xl"
		disabled={$isBuzzerLocked}
		on:click={lockBuzzer}
	>
		Buzzer sperren
	</button>
</GroupBox>
