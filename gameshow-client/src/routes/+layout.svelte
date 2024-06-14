<script lang="ts">
	import {
		answerRightSound,
		answerWrongSound,
		buzzerLastSecondSound,
		buzzerSecondsSound,
		buzzerSound,
		ingameSound1,
		ingameSound2,
		ingameSound3,
		ingameSound4,
		ingameSound5,
		nextGameSound
	} from '$lib/stores/AudioStore';
	import { Sound } from 'svelte-sound';
	import buzzerSoundFile from '$lib/assets/buzzer.mp3';
	import buzzerSecondsSoundFile from '$lib/assets/buzzerSeconds.wav';
	import buzzerLastSecondsSoundFile from '$lib/assets/buzzerLastSecond.wav';
	import answerRightSoundFile from '$lib/assets/right_answer.wav';
	import answerWrongSoundFile from '$lib/assets/wrong_answer.wav';
	import ingameSoundFile1 from '$lib/assets/ingame_track_1.mp3';
	import ingameSoundFile2 from '$lib/assets/ingame_track_2.mp3';
	import ingameSoundFile3 from '$lib/assets/ingame_track_3.mp3';
	import ingameSoundFile4 from '$lib/assets/ingame_track_4.wav';
	import ingameSoundFile5 from '$lib/assets/ingame_track_5.wav';
	import nextGameSoundFile from '$lib/assets/nextGame.mp3';
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
	$ingameSound1 = new Sound(ingameSoundFile1, { loop: true, volume: 0.5 });
	$ingameSound2 = new Sound(ingameSoundFile2, { loop: true, volume: 0.2 });
	$ingameSound3 = new Sound(ingameSoundFile3, { loop: true, volume: 0.15 });
	$ingameSound4 = new Sound(ingameSoundFile4, { loop: true, volume: 0.15 });
	$ingameSound5 = new Sound(ingameSoundFile5, { loop: true, volume: 0.15 });
	$nextGameSound = new Sound(nextGameSoundFile, { loop: false, volume: 0.6 });

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
