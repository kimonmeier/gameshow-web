<script lang="ts">
	import App from '$services/GameManager';

	function beforeUnload(eventargs: BeforeUnloadEvent) {
		App.getInstance().stopApp();
	}
</script>

<svelte:window on:beforeunload={beforeUnload} />
