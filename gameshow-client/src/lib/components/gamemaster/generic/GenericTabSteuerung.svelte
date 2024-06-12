<script lang="ts">
	import GroupBox from '$lib/components/groupBox/GroupBox.svelte';
	import { player } from '$lib/stores/gamemaster/PlayerStore';
	import GenericTabSteuerungPlayer from './GenericTabSteuerungPlayer.svelte';
</script>

<GroupBox title="Steuerung">
	{#each $player as player}
		<GenericTabSteuerungPlayer {player} />
	{/each}
</GroupBox>
