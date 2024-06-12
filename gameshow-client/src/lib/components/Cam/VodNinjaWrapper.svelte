<script lang="ts">
	import Icon from '@iconify/svelte';

	export let url: string | null;
</script>

{#if url}
	<iframe
		allow="autoplay;fullscreen;"
		class="rounded-t-3xl aspect-video"
		src="{url}&cleanoutput&transparent&as&videobitrate=6000"
		title="Kamera"
	/>
{:else}
	<div class="rounded-t-3xl aspect-video">
		<Icon icon="mdi:camera-off" height="80px" />
	</div>
{/if}
