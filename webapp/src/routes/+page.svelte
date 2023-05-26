<script lang="ts">
	import { FileDropzone, ProgressBar } from '@skeletonlabs/skeleton';
	import { PUBLIC_PROCESS_FILES_SERVER } from '$env/static/public';
	import { goto } from '$app/navigation';

	let files: FileList;
	let processing = false;
	let error = false;

	function onChangeHandler(e: Event): void {
		files = files;
	}

	async function startProcessing(event: Event) {
		processing = true;
		const formEl = event.target as HTMLFormElement;
		const data = new FormData(formEl);
		const response = await fetch(`${PUBLIC_PROCESS_FILES_SERVER}/process`, {
			method: 'POST',
			body: data
		});
		let result = await response.json();
		if (result && result.success) {
			goto('/bot');
		} else {
			error = true;
		}
	}
</script>

<div class="flex justify-center items-center p-4">
	<div class="m-11 card h-full w-3/4">
		<div class="p-4 md:p-10">
			<h1>🤖 DocsBot</h1>
			<h3 class="mt-6">Upload your documents:</h3>
			<form method="POST" on:submit|preventDefault={startProcessing} class="w-full">
				<div class="flex flex-col justify-center items-center">
					<FileDropzone name="documents" multiple bind:files on:change={onChangeHandler} />
					{#if files}
						<ol class="list w-full">
							{#each Array.from(files) as document, i}
								<li>
									<span class="badge-icon p-4 variant-soft-primary">{i + 1}</span>
									<span class="text-xl">{document.name}</span>
								</li>
							{/each}
						</ol>
						<button class="w-2/4 btn variant-filled-secondary btn-lg mt-4" disabled={processing}
							>Build Bot</button
						>
					{/if}
				</div>
			</form>
			{#if processing}
				<div class="p-8">
					<p>Processing...</p>
					<ProgressBar height="h-3" meter="bg-warning-500" />
				</div>
			{/if}
			{#if error}
				<aside class="alert variant-filled-error">
					<!-- Icon -->
					<div>🚨</div>
					<!-- Message -->
					<div class="alert-message">
						<h3>Oh no, there was an error processing the files</h3>
					</div>
				</aside>
			{/if}
		</div>
	</div>
</div>
