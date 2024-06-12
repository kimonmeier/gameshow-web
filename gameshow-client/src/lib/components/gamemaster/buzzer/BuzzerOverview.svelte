<script lang="ts">
	import GroupBox from '$lib/components/groupBox/GroupBox.svelte';
	import { player } from '$lib/stores/gamemaster/PlayerStore';
	import { buzzers } from '$stores/BuzzerStore';
	import type { PlayerBuzzerModel } from './BuzzerOverviewEntry.model';
	import BuzzerOverviewEntry from './BuzzerOverviewEntry.svelte';

	$: buzzerEntries = $buzzers.map<PlayerBuzzerModel>((x, i) => ({
		playerName: $player.find((z) => z.id == x.playerId)!.name,
		timeBuzzedInMs: x.buzzerTime!,
		differenceInMs: i == 0 ? 0 : x.buzzerTime! - $buzzers[i - 1].buzzerTime!
	}));
</script>

<GroupBox title="Leaderboard" class="flex flex-col">
	{#if buzzerEntries.length == 0}
		<h3 class="text-center">Keine Spieler gefunden!</h3>
	{:else}
		{#each buzzerEntries as entry (entry.playerName)}
			<BuzzerOverviewEntry player={entry} />
		{/each}
	{/if}
</GroupBox>
