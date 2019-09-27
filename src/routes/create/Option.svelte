<script>
	export let count
	export let index
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	function delOption(){

	}
</script>

<div style="display:flex;">
	<slot></slot>
	{#if count === 1}
		<ion-icon name="trash" style="font-size:25px; visibility:hidden; padding-left:5px;"> </ion-icon>
	{:else}
		<ion-icon name="trash" style="font-size:25px; color:grey; height:38px; padding-left:5px;" on:click="{() => dispatch('delete', index)}"> </ion-icon>
	{/if}
</div>