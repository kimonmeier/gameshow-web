<script lang="ts">
	import { ClientEvents } from 'gameshow-lib/enums/ClientEvents';
	import { onMount, tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import App from '$services/GameManager';
	import { isLoggedIn } from '$stores/CredentialStore';
	import ErrorMessage from '$components/alerts/ErrorMessage.svelte';

	let errors: string | undefined;
	let link: string;
	let username: string;
	let isLoading: boolean;

	async function login() {
		if (isLoading) {
			return;
		}

		isLoading = true;

		await tick();

		const connected = await openConnection();

		if (!connected) {
			errors =
				'Beim Verbinden mit dem Server ist ein Fehler aufgetreten, bitte versuche es erneut!';
		} else {
			errors = undefined;
			App.getInstance().sendMessage({
				type: ClientEvents.MEMBER_LOGIN,
				link: link,
				name: username
			});
		}

		isLoading = false;
	}

	async function openConnection(): Promise<boolean> {
		App.getInstance().startApp();
		const connected = await App.getInstance().awaitConnection(10);
		console.log('IsConnected:', connected);

		return App.getInstance().isConnected;
	}

	onMount(() => {
		if ($isLoggedIn) {
			goto('/brainbattle/play');
		}

		if ($page.url.searchParams.has('public')) {
			openConnection().then((isConnected) => {
				if (!isConnected) {
					return;
				}

				$isLoggedIn = true;

				tick().then(() => {
					goto('/brainbattle/public');
				});
			});
		}
	});
</script>

<div class="flex items-center justify-center m-auto h-full w-full">
	<div class="border rounded-xl w-1/3 p-10">
		<h1>Gameshow Login!</h1>
		<div class="mt-5">
			<div class="flex flex-col px-2 py-1">
				<label class="font-bold mb-2" for="usernameInput">Name:</label>
				<input
					class="rounded bg-gray-600"
					id="usernameInput"
					disabled={isLoading}
					bind:value={username}
					type="text"
				/>
			</div>
			<div class="flex flex-col px-2 py-1">
				<label class="font-bold mb-2" for="usernameInput">Webcam Link:</label>
				<input
					class="rounded bg-gray-600"
					id="usernameInput"
					disabled={isLoading}
					bind:value={link}
					type="text"
				/>
			</div>
			<div class="flex flex-col px-2 py-1">
				<button class="rounded p-2 font-bold bg-blue-600" disabled={isLoading} on:click={login}>
					Login
				</button>
			</div>
		</div>
	</div>

	<ErrorMessage message={errors} />
</div>
