<script lang="ts">
	import FormField from "$components/formular/FormField.svelte";
	import GroupBox from "$components/groupBox/GroupBox.svelte";
	import { memoryAnzCol, memoryAnzRounds, memoryAnzRows } from "$stores/memory/GameStarteValues";

</script>

<GroupBox title="Einstellungen" class="flex flex-col">
    <FormField label="Anzahl Spalten">
        <input
            bind:value={$memoryAnzCol}
            type="number"
            class="flex-grow text-right text-black"
        />
    </FormField>
    <FormField label="Anzahl Reihen">
        <input
            bind:value={$memoryAnzRows}
            type="number"
            class="flex-grow text-right text-black"
        />
    </FormField>
    <FormField label="Anzahl Runden">
        <input
            bind:value={$memoryAnzRounds}
            type="number"
            class="flex-grow text-right text-black"
        />
    </FormField>
</GroupBox>