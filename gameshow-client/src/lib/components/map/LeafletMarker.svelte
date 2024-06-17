<script lang="ts">
	import { getLeafletContext } from '$lib/stores/kartenkunde/LeafletStore';
	import type { DivIcon, Icon, LatLngExpression } from 'leaflet';
	import L from 'leaflet';

	export let location: LatLngExpression;
	export let icon: Icon | DivIcon | undefined;

	let map = getLeafletContext();

	L.marker(
		location,
		icon == undefined
			? undefined
			: {
					icon: icon
			  }
	).addTo(map);
</script>
