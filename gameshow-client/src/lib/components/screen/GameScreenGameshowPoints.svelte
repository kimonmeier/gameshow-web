<script lang="ts">
	import { player } from '$lib/stores/gamemaster/PlayerStore';
	import GameScreenPlayerPoints from './GameScreenPlayerPoints.svelte';
</script>

<div class="flex flex-col w-full">
	<GameScreenPlayerPoints player={$player[0]} />
	<br />
	<GameScreenPlayerPoints player={$player[1]} />
</div>
