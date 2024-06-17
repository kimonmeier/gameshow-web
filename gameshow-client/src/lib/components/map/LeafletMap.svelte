<script lang="ts">
	import { leafletMarkers, setLeafletContext } from '$lib/stores/kartenkunde/LeafletStore';
	import L, { type LatLngExpression } from 'leaflet';
	import { createEventDispatcher, onMount } from 'svelte';
	import LeafletMarker from './LeafletMarker.svelte';

	const dispatch = createEventDispatcher<{ click: { location: LatLngExpression } }>();

	export let center: LatLngExpression;
	export let zoom: number;

	let mapContainer: HTMLElement;
	let map = L.map(L.DomUtil.create('div'), {
		center,
		zoom,
		zoomControl: false,
		attributionControl: false
	});
	setLeafletContext(map);

	L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg', {
		minZoom: 1,
		maxZoom: 16,
		attribution:
			'&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	map.touchZoom.disable();
	map.doubleClickZoom.disable();
	map.scrollWheelZoom.disable();
	map.boxZoom.disable();
	map.keyboard.disable();
	map.dragging.disable();

	onMount(() => {
		mapContainer.appendChild(map.getContainer());
		map.getContainer().style.width = '100%';
		map.getContainer().style.height = '100%';
		map.invalidateSize();
	});

	map.addEventListener('click', (e) => {
		dispatch('click', { location: e.latlng });
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
		integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
		crossorigin=""
	/>
</svelte:head>
<div class="h-screen w-screen" bind:this={mapContainer}>
	{#each $leafletMarkers as marker (marker.id)}
		<LeafletMarker icon={marker.icon} location={marker.location} />
	{/each}
</div>
