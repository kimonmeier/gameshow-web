<script lang="ts">
	import { gamePoints } from "$lib/stores/gamemaster/PlayerStore";

    export let playerid: string;

    $: points = $gamePoints.find(x => x.playerId == playerid)?.gamePoints ?? 0;
</script>

<div class="text-2xl font-bold">
    {points}
</div>