<script lang="ts">
	import {
		answerRightSound,
		answerWrongSound,
		buzzerLastSecondSound,
		buzzerSecondsSound,
		buzzerSound
	} from '$lib/stores/AudioStore';
	import { Sound } from 'svelte-sound';
	import buzzerSoundFile from '$lib/assets/buzzer.mp3';
	import buzzerSecondsSoundFile from '$lib/assets/buzzerSeconds.wav';
	import buzzerLastSecondsSoundFile from '$lib/assets/buzzerLastSecond.wav';
	import answerRightSoundFile from '$lib/assets/right_answer.wav';
	import answerWrongSoundFile from '$lib/assets/wrong_answer.wav';
	import App from '$lib/services/GameManager';
	import '../app.css';
	import { ClientEvents } from 'gameshow-lib/enums/ClientEvents';
	import { Games } from 'gameshow-lib/enums/Games';
	import { GenericMitgliedActions } from 'gameshow-lib/message/generell/ClientMessageDetail';
	import { isBuzzerLocked } from '$lib/stores/BuzzerStore';
	import { isLoggedIn } from '$lib/stores/CredentialStore';

	$buzzerSound = new Sound(buzzerSoundFile, { volume: 0.4 });
	$buzzerSecondsSound = new Sound(buzzerSecondsSoundFile, { volume: 0.6 });
	$buzzerLastSecondSound = new Sound(buzzerLastSecondsSoundFile, { volume: 0.6 });
	$answerRightSound = new Sound(answerRightSoundFile, { volume: 0.4 });
	$answerWrongSound = new Sound(answerWrongSoundFile, { volume: 0.4 });

	function keyDown(e: KeyboardEvent) {
		if (e.keyCode == 32) {
			if ($isBuzzerLocked) {
				return;
			}

			App.getInstance().sendMessage({
				type: ClientEvents.MITGLIED_ACTION,
				data: {
					game: Games.Generic,
					action: GenericMitgliedActions.BUZZER_PRESSED
				}
			});
		}
	}

	function beforeUnload(eventargs: BeforeUnloadEvent) {
		if ($isLoggedIn) {
			App.getInstance().stopApp();
		}
	}
</script>

<svelte:window on:keydown={keyDown} on:beforeunload={beforeUnload} />

<div class="h-full w-full bg-slate-900 text-white">
	<slot />
</div>
