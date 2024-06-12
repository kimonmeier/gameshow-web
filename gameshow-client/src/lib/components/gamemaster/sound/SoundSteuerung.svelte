<script lang="ts">
	import { GenericGameMasterAudioType } from 'gameshow-lib/message/generell/ServerMessageDetail';
	import FormField from '$lib/components/formular/FormField.svelte';
	import GroupBox from '$lib/components/groupBox/GroupBox.svelte';
	import App from '$lib/services/GameManager';
	import { ClientEvents } from 'gameshow-lib/enums/ClientEvents';
	import { Games } from 'gameshow-lib/enums/Games';
	import { GenericGameMasterActions } from 'gameshow-lib/message/generell/ClientMessageDetail';
	import GameshowButton from '$lib/components/button/GameshowButton.svelte';

	interface SoundItem {
		type: GenericGameMasterAudioType;
		name: string;
	}

	const sounds: SoundItem[] = [
		{
			type: GenericGameMasterAudioType.SUCCESS_SOUND,
			name: 'Richtige Antwort'
		},
		{
			type: GenericGameMasterAudioType.WRONG_SOUND,
			name: 'Falsche Antwort'
		},
		{
			type: GenericGameMasterAudioType.GAME_MUSIC,
			name: 'Game Musik'
		}
	];

	function playSound(type: GenericGameMasterAudioType) {
		App.getInstance().sendMessage({
			type: ClientEvents.GAME_MASTER_ACTION,
			data: {
				game: Games.Generic,
				action: GenericGameMasterActions.PLAY_SOUND,
				sound: type
			}
		});
	}

	function stopSound(type: GenericGameMasterAudioType) {
		App.getInstance().sendMessage({
			type: ClientEvents.GAME_MASTER_ACTION,
			data: {
				game: Games.Generic,
				action: GenericGameMasterActions.STOP_SOUND,
				sound: type
			}
		});
	}
</script>

<GroupBox title="Steuerung">
	{#each sounds as item}
		<FormField label={item.name}>
			<GameshowButton class="bg-green-600" on:click={() => playSound(item.type)}>
				Play
			</GameshowButton>
			<GameshowButton class="bg-red-600" on:click={() => stopSound(item.type)}>Stop</GameshowButton>
		</FormField>
	{/each}
</GroupBox>
