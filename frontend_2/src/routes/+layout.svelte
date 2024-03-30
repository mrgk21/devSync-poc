<script lang="ts">
	import { socketConnected } from '$lib/stores';
	import '../app.css';
</script>

<div class="bg-orange-200 flex flex-col gap-2 p-5">
	<p>
		{#if $socketConnected !== null}
			{#if $socketConnected}
				<span class="text-green-500">Connected!</span>
			{:else}
				<span class="text-red-500">Disconnected!</span>
			{/if}
		{:else}
			<span class="text-orange-500">Connecting...</span>
		{/if}
	</p>
</div>
<slot />
