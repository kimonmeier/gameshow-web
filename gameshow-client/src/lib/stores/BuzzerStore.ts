import type { BuzzerInfo } from "$lib/models/Buzzer";
import { get, writable, type Readable } from "svelte/store";
import { buzzerLastSecondSound, buzzerSecondsSound, buzzerSound, buzzerSoundPlayed } from "./AudioStore";

interface BuzzerStore extends Readable<BuzzerInfo[]> {
    clearBuzzing: () => void,
    playerBuzzed: (playerId: string, time: number) => void;
}

function createBuzzerStore(): BuzzerStore {
    const { subscribe, set } = writable<BuzzerInfo[]>([]);

    const createTimeInterval = () => {
        buzzerTimeRemaining.set(5);

        const intervallId = setInterval(() => {
            const remainingTime = get(buzzerTimeRemaining);
            if (remainingTime == null) {
                return;
            }
            get(buzzerSecondsSound).stop();
            get(buzzerLastSecondSound).stop();
    
            if (remainingTime >= 2) {
                get(buzzerSecondsSound).play();
            } else if (remainingTime == 1) {
                get(buzzerLastSecondSound).play();
            }

            if (remainingTime == 0) {
                clearInterval(intervallId);
                buzzerTimeRemaining.set(null);
                return;
            }

            buzzerTimeRemaining.set(remainingTime - 1);
        }, 1000)
    }

    return {
        subscribe,
        clearBuzzing: () => {
            buzzerSoundPlayed.set(false);
            set([])
        },
        playerBuzzed: (playerId: string, time: number) => { 
            let array = get({subscribe});
            array.push({ playerId, buzzerTime: time, isLocked: false })

            set(array.sort(z => z.buzzerTime))

            if (get(buzzerSoundPlayed)) {
                return;
            }
            buzzerSoundPlayed.set(true)
            get(buzzerSound).play();

            createTimeInterval();
        },
    }
}

export const buzzers = createBuzzerStore();
export const isBuzzerLocked = writable<boolean>(false);
export const buzzerTimeRemaining = writable<number | null>(null);