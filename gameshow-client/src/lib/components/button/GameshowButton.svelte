<script lang="ts">
	let className: string = '';
	let disabledBool: boolean = false;

	export { className as class };
	export { disabledBool as disabled };
</script>

<button
	disabled={disabledBool}
	class="{className} text-white border hover:bg-blue-950 focus:bg-blue-900 disabled:bg-slate-900 rounded-xl p-1 px-2"
	on:click
>
	<slot />
</button>
