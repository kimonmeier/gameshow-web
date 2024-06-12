<script lang="ts">
	let className: string = '';
	export let label: string;
	export { className as class };
</script>

<div class="flex flex-row {className} w-full p-1">
	<label class="px-2 min-w-32 text-right w-1/6" for={label}>
		{label}:
	</label>
	<div class="text-black">
		<slot />
	</div>
</div>
