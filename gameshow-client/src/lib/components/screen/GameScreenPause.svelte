<script lang="ts">
	import VodNinjaWrapper from '../Cam/VodNinjaWrapper.svelte';
	import { gameMasterStreamerName, gamemasterCamLink } from '$lib/stores/GameStore';
</script>

<div class="flex flex-col w-full h-full m-auto justify-end items-center">
	<div class="w-full bg-purple-500 p-3 mb-5 rounded-xl">
		<VodNinjaWrapper url={$gamemasterCamLink} />
	</div>
	<div class="bg-purple-500 border border-slate-900 w-full h-3/4">
		<iframe
			src="https://www.giambaj.it/twitch/jchat/v2/?channel={$gameMasterStreamerName}&animate=true&hide_commands=true&size=1&font=1&shadow=1"
			title="Twitch Chat"
		/>
	</div>
</div>
