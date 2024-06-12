<script lang="ts" context="module">
	export type Option<T> = {
		label: string;
		value: T;
	};
</script>

<script lang="ts">
	type T = $$Generic;
	export let id = '';
	export let options: Option<T>[] = [];
	export let value: T | null = null;
	export let disabled = false;

	$: cursorForm = disabled ? '' : 'cursor-pointer';
</script>

<div class="w-full">
	<select
		bind:value
		class="bg-slate-600 focus:bg-slate-500 focus:border-b-blue-700 text-white min-h-7.5 w-full opacity-100 {cursorForm} border border-gray-500 border-1 rounded-none px-2 text-sm font-medium leading-tight md:ml-0 md:rounded-sm"
		{disabled}
		{id}
		on:change
		on:blur
	>
		{#if options?.length > 0}
			{#each options as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		{/if}
	</select>
</div>
