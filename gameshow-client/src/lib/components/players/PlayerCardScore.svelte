<script lang="ts">
	import type { ComponentType } from "svelte";
	import type { PlayerModel } from "$models/Player";
	import { currentGame } from "$lib/stores/GameStore";
	import { GamePointLayout } from "gameshow-lib/enums/GamePointLayout";
	import MaxScoreEntry from "../scores/MaxScoreEntry.svelte";
	import type { GameInfo } from "gameshow-lib/entities/generic/GameInfo";
	import CountScoreEntry from "../scores/CountScoreEntry.svelte";

    export let player: PlayerModel;

    function getScoreElement(game: GameInfo | undefined): ComponentType | null {
        if (!game) {
            return null;
        }

        switch (game.points) {
            case GamePointLayout.POINTS_COUNT:
                return CountScoreEntry;
            case GamePointLayout.POINTS_MAX:
                return MaxScoreEntry;
            case GamePointLayout.NO_POINTS:
            default:
                return null;
        }
    }

    $: currentScoreTye = getScoreElement($currentGame)
</script>

<div class="py-3 px-5 flex justify-center items-center text-3xl">
    {#if currentScoreTye}
        <svelte:component this="{currentScoreTye}" playerid={player.id} />
    {:else}
        {player.name}
    {/if}
</div>