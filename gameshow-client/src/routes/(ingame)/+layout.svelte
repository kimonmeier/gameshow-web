<script lang="ts">
	import { goto } from '$app/navigation';
	import PlayerCard from '$lib/components/players/PlayerCard.svelte';
	import { isLoggedIn } from '$lib/stores/CredentialStore';
	import { currentPlayer, enemyPlayer } from '$lib/stores/gamemaster/PlayerStore';
	import { onMount } from 'svelte';
	import App from '$services/GameManager';

	onMount(() => {
		if (!App.getInstance().isConnected) {
			goto('/');
			return;
		}

		if (!$isLoggedIn) {
			goto('/');
			return;
		}
	});
</script>

<div
	class="grid grid-cols-5 grid-rows-6 bg-gradient-to-tr from-purple-950 via-purple-900 to-pink-900 h-full w-full"
>
	<div class="bg-black col-span-5 row-span-4">
		<slot name="currentGame" />
	</div>
	<PlayerCard player={$currentPlayer} isRightSide={false} />
	<div class="row-span-2">
		<slot name="playerControls" />
	</div>
	<PlayerCard player={$enemyPlayer} isRightSide={true} />
</div>
