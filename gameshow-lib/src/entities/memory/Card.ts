import { Koordinate } from "./Koordinate";

declare const MemoryIcon: unique symbol;
export type MemoryIcon = string & { _opaque: typeof MemoryIcon; }[];

export interface Card {
    icon: MemoryIcon;
    position: Koordinate;
}