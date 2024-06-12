<script lang="ts">
	import type { PlayerModel } from '$models/Player';
	import PlayerCardEntry from './PlayerCardEntry.svelte';

	export let isRightSide: boolean;
	export let player: PlayerModel | undefined;
</script>


<div class="col-span-2 row-span-2 p-2">
	{#if player}
		<PlayerCardEntry {player} {isRightSide} />
	{/if}
</div>
