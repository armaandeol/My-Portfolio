<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import type { Content } from '@prismicio/client';
	import { onMount } from 'svelte';

	export let slice: Content.ContactSlice;
	
	let email = '';
	let message = '';
	let isSubmitting = false;
	let status = '';
	let formEl: HTMLFormElement;

	// Handle form submission
	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		isSubmitting = true;
		status = '';
		
		const formData = new FormData(formEl);
		
		try {
			const response = await fetch('https://formspree.io/f/maneodga', {
				method: 'POST',
				body: formData,
				headers: {
					'Accept': 'application/json'
				}
			});
			
			if (response.ok) {
				status = 'success';
				formEl.reset();
				email = '';
				message = '';
			} else {
				const data = await response.json();
				if (data && data.errors) {
					status = 'error';
					console.error(data.errors.map((error: any) => error.message).join(', '));
				} else {
					status = 'error';
				}
			}
		} catch (error) {
			status = 'error';
			console.error('Form submission error:', error);
		} finally {
			isSubmitting = false;
		}
	};
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<Bounded>
		<div class="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
			<h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-8">
				{slice.primary.heading}
			</h2>
			
			<form 
				bind:this={formEl}
				action="https://formspree.io/f/maneodga"
				method="POST"
				on:submit={handleSubmit}
				class="space-y-8"
			>
				<div>
					<label for="email" class="block text-sm font-medium text-slate-300 mb-2">
						{slice.primary.email}
					</label>
					<input
						type="email"
						name="email"
						id="email"
						bind:value={email}
						required
						class="w-full rounded-md border border-slate-700 bg-slate-800 text-slate-100 shadow-sm focus:border-yellow-400 focus:ring-yellow-400 px-4 py-2"
						placeholder="your.email@example.com"
					/>
				</div>
				
				<div>
					<label for="message" class="block text-sm font-medium text-slate-300 mb-2">
						{slice.primary.message}
					</label>
					<textarea
						id="message"
						name="message"
						rows="5"
						bind:value={message}
						required
						class="w-full rounded-md border border-slate-700 bg-slate-800 text-slate-100 shadow-sm focus:border-yellow-400 focus:ring-yellow-400 px-4 py-2"
						placeholder="Your message here..."
					></textarea>
				</div>
				
				<div>
					<button
						type="submit"
						disabled={isSubmitting}
						class="rounded-md bg-yellow-400 px-6 py-3 text-base font-semibold text-slate-900 shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 transition-colors duration-200 disabled:opacity-70"
					>
						{isSubmitting ? 'Sending...' : 'Send Message'}
					</button>
				</div>
				
				{#if status === 'success'}
					<div class="text-green-400 font-medium p-4 bg-green-900/20 rounded-md">
						Thanks for your message! I'll get back to you soon.
					</div>
				{:else if status === 'error'}
					<div class="text-red-400 font-medium p-4 bg-red-900/20 rounded-md">
						Oops! There was a problem submitting your form. Please try again. or mail me directly at armaan.deol@proton.me
					</div>
				{/if}
			</form>
		</div>
	</Bounded>
</section>