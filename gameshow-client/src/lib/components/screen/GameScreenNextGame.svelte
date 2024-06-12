<script lang="ts">
	import type { GameScreenNextGameInfo } from '$lib/models/Game';

	export let info: GameScreenNextGameInfo;
</script>

<div
	class="intro shadow-3xl shadow-purple-300 bg-purple-500 text-center text-6xl p-10 m-auto w-96 text-white font-bold"
>
	<div class="intro-face game-number">
		Spiel {info.gameNumber}
	</div>
	<div class="text-white intro-face game-name">
		{info.gameName}
	</div>
</div>

<style>
	.intro {
		transform-style: preserve-3d;
		animation: introAnim 6s linear 0s 1 normal;
		animation-fill-mode: forwards;
	}

	.intro-face {
		backface-visibility: hidden;
	}

	.game-name {
		transform: rotateY(180deg);
	}

	@keyframes introAnim {
		0% {
			transform: scale(2);
		}

		9% {
			transform: scale(1);
		}

		10% {
			color: white;
		}

		11% {
			color: transparent;
			transform: scale(1);
			transform: rotateY(180deg);
		}

		12% {
			transform: scale(1);
			transform: rotateY(0deg);
		}

		14% {
			transform: scale(1);
			transform: rotateY(180deg);
		}

		16% {
			transform: scale(1);
			transform: rotateY(0deg);
		}

		19% {
			transform: scale(1);
			transform: rotateY(180deg);
		}

		22% {
			transform: scale(1);
			transform: rotateY(0deg);
		}

		26% {
			transform: scale(1);
			transform: rotateY(180deg);
		}

		30% {
			transform: scale(1);
			transform: rotateY(0deg);
		}

		35% {
			transform: scale(1);
			transform: rotateY(180deg);
		}

		40% {
			transform: scale(1);
			transform: rotateY(0deg);
		}

		46% {
			transform: scale(1);
			transform: rotateY(180deg);
		}

		52% {
			transform: scale(1);
			transform: rotateY(0deg);
		}

		59% {
			transform: scale(1);
			transform: rotateY(180deg);
		}

		67% {
			transform: scale(1);
			transform: rotateY(0deg);
		}

		78% {
			transform: scale(1);
			transform: rotateY(180deg);
		}

		89% {
			transform: scale(1);
			transform: rotateY(0deg);
		}

		100% {
			color: transparent;
			transform: scale(1);
			transform: rotateY(180deg);
		}
	}
</style>
