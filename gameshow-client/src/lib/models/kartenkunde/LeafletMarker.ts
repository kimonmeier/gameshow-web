import type { DivIcon, Icon, LatLngExpression } from "leaflet";

export interface LeafletMarker {
    id: string
    icon?: DivIcon | Icon,
    location: LatLngExpression
}