<script lang="ts">
	import { currentGameState } from '$lib/stores/GameStore';
	import { ScreenTypes } from 'gameshow-lib/enums/ScreenTypes';
	import GameScreenPause from './GameScreenPause.svelte';
	import GameScreenNextGame from './GameScreenNextGame.svelte';
	import type {
		GameScreenInfo,
		GameScreenIngameInfo,
		GameScreenNextGameInfo,
		GameScreenShowPointsInfo
	} from '$lib/models/Game';
	import GameScreenIngame from './GameScreenIngame.svelte';
	import GameScreenGameshowPoints from './GameScreenGameshowPoints.svelte';

	$: screenType = $currentGameState.type;

	function getScreenType(screenType: ScreenTypes.NEXT_GAME): GameScreenNextGameInfo;
	function getScreenType(screenType: ScreenTypes.INGAME): GameScreenIngameInfo;
	function getScreenType(screenType: ScreenTypes): GameScreenInfo {
		return $currentGameState;
	}
</script>

{#if screenType == ScreenTypes.PAUSE}
	<GameScreenPause />
{:else if screenType == ScreenTypes.NEXT_GAME}
	<GameScreenNextGame info={getScreenType(screenType)} />
{:else if screenType == ScreenTypes.INGAME}
	<GameScreenIngame info={getScreenType(screenType)} />
{:else if screenType == ScreenTypes.SHOW_POINTS}
	<GameScreenGameshowPoints />
{/if}
