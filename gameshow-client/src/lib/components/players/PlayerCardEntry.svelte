<script lang="ts">
	import { buzzerTimeRemaining, buzzers } from "$lib/stores/BuzzerStore";
	import type { PlayerModel } from "$models/Player";
	import PlayerCardScore from "./PlayerCardScore.svelte";

    export let isRightSide: boolean;
    export let player: PlayerModel;

    $: isPressed = $buzzers.at(0)?.playerId == player.id;
</script>

<div class="w-full flex {isRightSide ? "flex-row-reverse" : "flex-row"} justify-end items-center">
    <div class="w-4/6 {$buzzerTimeRemaining != null && isPressed ? "pulseBuzzer" : ""} aspect-video bg-purple-600 rounded-t-3xl rounded-b-lg border border-t-8 border-x-4 border-purple-600 flex flex-col">
        <iframe allow="autoplay;fullscreen;" class="rounded-t-3xl aspect-video" src="{player.link}&cleanoutput&transparent&as&videobitrate=6000" title="Kamera: {player.name}"/>
        <PlayerCardScore {player} />
    </div>
    {#if $buzzerTimeRemaining != null && isPressed}
        <div class="text-3xl font-bold py-3 px-10 bg-purple-600 rounded-3xl mt-72 mx-16">
            {$buzzerTimeRemaining}
        </div>
    {:else}
        <div class="text-3xl font-bold py-3 px-10 bg-transparent text-transparent rounded-3xl mt-72 mx-16">
            Buzzer
        </div>
    {/if}
</div>


<style>
    @keyframes pulse-animation {
        0% {
            box-shadow: 0 0 50px 15px rgba(255, 0, 0, 0.2);
        }
        50% {
            box-shadow: 0 0 50px 20px rgba(255, 0, 0, 0.6);
        }
        100% {
            box-shadow: 0 0 50px 15px rgba(255, 0, 0, 0.2);
        }
    }

    .pulseBuzzer {
        animation: pulse-animation 5s infinite;
    }

</style>