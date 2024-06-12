<script lang="ts">
	import type { PlayerBuzzerModel } from './BuzzerOverviewEntry.model';

	export let player: PlayerBuzzerModel;

	$: buzzedTime = new Date(player.timeBuzzedInMs);
	$: differenceDate = new Date(player.differenceInMs);
</script>

<div class="flex flex-row items-center">
	<h2 class="font-bold w-40 text-right px-3">
		{player.playerName}:
	</h2>
	<div class="w-32 text-right">
		{buzzedTime.toLocaleTimeString()} Uhr
	</div>
	<div class="w-32 font-bold text-right">
		+{differenceDate.getMinutes().toString().padStart(2, '0')}:{differenceDate
			.getSeconds()
			.toString()
			.padStart(2, '0')}:{differenceDate.getMilliseconds().toString().padStart(3, '0')}
	</div>
</div>
