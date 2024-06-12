<script lang="ts">
	import Tabs from '$components/tabs/Tabs.svelte';
	import App from '$services/GameManager';
	import GenericTab from '$components/gamemaster/tabs/GenericTab.svelte';
	import MemoryTab from '$components/gamemaster/tabs/MemoryTab.svelte';
	import type { TabInfo } from '$components/tabs/Tabs.types';
	import { TabPages } from '$models/gamemaster/TabValue';
	import { isGamemaster } from '$stores/CredentialStore';
	import { onMount } from 'svelte';
	import SoundTab from '$lib/components/gamemaster/tabs/SoundTab.svelte';
	import BuzzerTab from '$lib/components/gamemaster/tabs/BuzzerTab.svelte';

	$isGamemaster = true;

	onMount(() => {
		App.getInstance().startApp();
	});

	const tabs: TabInfo<TabPages>[] = [
		{
			label: 'Generell',
			value: TabPages.Generic,
			component: GenericTab
		},
		{
			label: 'Buzzer',
			value: TabPages.Buzzer,
			component: BuzzerTab
		},
		{
			label: 'Memory',
			value: TabPages.Memory,
			component: MemoryTab
		},
		{
			label: 'Sound',
			value: TabPages.Sound,
			component: SoundTab
		}
	];
	let activeTab: TabPages = TabPages.Generic;
</script>

<div class="h-full">
	<Tabs items={tabs} bind:activeTabValue={activeTab} />
</div>
