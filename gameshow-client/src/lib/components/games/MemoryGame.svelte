<script lang="ts">
	import { memoryAnzCol, memoryAnzRows, memoryIcons } from '$lib/stores/memory/GameStarteValues';
	import MemoryCard from '../memory/MemoryCard.svelte';

	function getArrayByNumber(number: number): number[] {
		const array: number[] = [];
		for (let index = 0; index < number; index++) {
			array.push(index);
		}

		return array;
	}

	$: cols = getArrayByNumber($memoryAnzCol);
	$: rows = getArrayByNumber($memoryAnzRows);
</script>

<div
	class="m-auto grid grid-cols-{cols.length} grid-rows-{rows.length} gap-2 p-5 rounded-xl bg-purple-400"
>
	{#each rows as row}
		{#each cols as col}
			<div>
				<MemoryCard x={col} y={row} />
			</div>
		{/each}
	{/each}
</div>
