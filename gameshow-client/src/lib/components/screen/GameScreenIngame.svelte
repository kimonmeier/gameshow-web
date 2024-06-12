<script lang="ts">
	import type { GameScreenIngameInfo } from '$lib/models/Game';
	import { gamemasterCamLink } from '$lib/stores/GameStore';
	import VodNinjaWrapper from '../Cam/VodNinjaWrapper.svelte';

	export let info: GameScreenIngameInfo;
</script>

<div class="flex flex-col">
	<div class="h-1/6 m-auto">
		<div class="bg-purple-500 mb-2 rounded-xl p-3">
			<VodNinjaWrapper url={$gamemasterCamLink} />
		</div>
	</div>
	<div class="h-5/6">
		<svelte:component this={info.component} />
	</div>
</div>
