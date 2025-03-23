<script lang="ts">
    import { type Content, isFilled} from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';
    import Github from '$lib/components/Socials/Github.svelte';
	import LinkedIn from '$lib/components/Socials/LinkedIn.svelte';
	import Twitter from '$lib/components/Socials/Twitter.svelte';
	import Bounded from './Bounded.svelte';

    export let settings: Content.SettingsDocument;
</script>


<Bounded as='footer' class="text-slate-600">
    <div class="container mx-auto flex mt-20 flex-col items-center justify-between gap-6 py-8 sm:flex-row">
        <div class="name flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row sm:justify-self-start">
            <a href='/' class="text-xl font-extrabold tracking-tighter text-slate-100 transition-color duration-150 hover:text-yellow-400">
                {settings.data.name}
            </a>
            <span class="hidden text-5xl font-extralight leading-[0] text-slate-400 sm:inline">/</span>
            <p class="text-sm text-slate-300">
                © {new Date().getFullYear()} {settings.data.name}
            </p>
            
        </div>
        <nav class="navigation">
            <ul class="flex items-center gap-1">
                {#each settings.data.nav_item as {link,label},index}
                <li>
                    <PrismicLink field={link} class="block px-3 py-1 text-base font-bold text-slate-100 transition-colors duration-150 hover:text-yellow-400">{label}</PrismicLink>
                </li>
                {#if index < settings.data.nav_item.length - 1}
                    <span class="text-4xl font-thin leading-[0] text-slate-400">/</span>
                {/if}
                {/each}
            </ul>
        </nav>
        <div class="socials inline-flex justify-center sm:justify-end">
            <a 
                href="https://github.com/armaandeol" 
                target="_blank" 
                rel="noopener noreferrer"
                class="p-2 text-2xl text-slate-300 transform transition-all duration-150 hover:scale-125 hover:text-yellow-400"
                aria-label={settings.data.name + ' on Github'}
            >
                <Github />
            </a>
            
            {#if isFilled.link(settings.data.linkdin_link)}
                <PrismicLink
                    field={settings.data.linkdin_link}
                    class="p-2 text-2xl text-slate-300 transform transition-all duration-150 hover:scale-125 hover:text-yellow-400"
                    aria-label={settings.data.name + ' on Linkedin'}
                >
                    <LinkedIn />
                </PrismicLink>
            {/if}
			{#if isFilled.link(settings.data.twitter_link)}
				<PrismicLink
					field={settings.data.twitter_link}
					class="p-2 text-2xl text-slate-300 transform transition-all duration-150 hover:scale-125 hover:text-yellow-400"
					aria-label={settings.data.name + ' on Twitter'}
				>
					<Twitter />
				</PrismicLink>
			{/if}
		</div>
    </div>
</Bounded>