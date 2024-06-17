import type { LeafletMarker } from "$lib/models/kartenkunde/LeafletMarker";
import { DivIcon, Icon, Map, type LatLngExpression } from "leaflet";
import { getContext, hasContext, setContext } from "svelte";
import { writable, type Readable } from "svelte/store";

const leafletMapKey = "leafletMapInstance";

export interface LeafletMarkerStore extends Readable<LeafletMarker[]> {
    addMarkerWithIcon: (icon: Icon | DivIcon, location: LatLngExpression) => string;
    addMarker: (location: LatLngExpression) => string;
    removeMarker: (id: string) => void;
    clearMarker: () => void;
}

function createLeafletMarkerStore(): LeafletMarkerStore {
    const { set, update, subscribe } = writable<LeafletMarker[]>([]);

    return {
        subscribe,
        addMarkerWithIcon: (icon: Icon | DivIcon, location: LatLngExpression) => {
            const id = crypto.randomUUID();

            update((x) => {
                x.push({
                    id, 
                    icon,
                    location
                })

                return x;
            })

            return id;
        },
        addMarker: (location: LatLngExpression) => {
            const id = crypto.randomUUID();

            update((x) => {
                x.push({
                    id, 
                    location
                })

                return x;
            })

            return id;
        },
        removeMarker: (id: string) => update(x => x.filter(z => z.id != id)),
        clearMarker: () => set([])
    }
}

export const leafletMarkers = createLeafletMarkerStore();

export function getLeafletContext(): Map {
    if (!hasLeafletContext()) {
        throw new Error("No Context found");
    }

    return getContext<Map>(leafletMapKey)
}

export function hasLeafletContext(): boolean {
    return hasContext(leafletMapKey);
}

export function setLeafletContext(map: Map): void {
    setContext(leafletMapKey, map);
}

