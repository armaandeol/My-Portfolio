<script>
	import ContentBody from '$lib/components/ContentBody.svelte';

	export let data;
</script>

<ContentBody data={data} page={data.page} />