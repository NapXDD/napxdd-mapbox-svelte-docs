<script lang="ts">
	import { onMount } from 'svelte';
	import { TableOfContents } from './toc.svelte.js';

	let contentRef: HTMLElement | undefined = $state();
	let { highlighter, theme, data }: { highlighter: any; theme: string | undefined; data: any } =
		$props();

	let toc = $state(TableOfContents.getInstance());

	async function highlightCode() {
		console.log('highlightCode');
		if (!contentRef || !highlighter) return;

		const codeBlocks = contentRef.querySelectorAll('pre code');
		for (const block of codeBlocks) {
			// Skip if already highlighted
			if (block.closest('pre')?.classList.contains('shiki')) continue;

			const code = block.textContent || '';
			const language = block.getAttribute('class')?.replace('language-', '') || 'text';

			const highlightedCode = await highlighter.codeToHtml(code, {
				lang: language,
				theme: theme === 'dark' ? 'github-dark' : 'github-light'
			});

			const wrapper = block.closest('pre');
			const copyBtn = document.createElement('button');
			copyBtn.className =
				'px-3 py-1 ml-4 rounded bg-gray-100 text-gray-800 hover:bg-gray-200 focus:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:bg-gray-700 transition';
			copyBtn.textContent = 'Copy';

			if (wrapper) {
				// Extract the inner content of the highlighted code (inside the pre tag)
				const tempDiv = document.createElement('div');
				tempDiv.innerHTML = highlightedCode;
				const innerContent = tempDiv.querySelector('.shiki')?.innerHTML || '';

				// Keep the original pre tag but update its classes and content
				wrapper.className = 'shiki shiki-wrapper not-prose relative';
				wrapper.style.backgroundColor = theme === 'github-dark' ? '#0d1117' : '#f6f8fa';
				wrapper.innerHTML = innerContent;

				// Use Tailwind CSS classes for absolute positioning and appearance
				copyBtn.className =
					'absolute top-2 right-2 z-10 px-3 py-1 rounded bg-gray-100 text-gray-800 hover:bg-gray-200 focus:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:bg-gray-700 transition';

				wrapper.appendChild(copyBtn);
			}

			copyBtn.addEventListener('click', async (e) => {
				e.preventDefault();
				try {
					await navigator.clipboard.writeText(code);
					copyBtn.textContent = 'Copied!';
					setTimeout(() => (copyBtn.textContent = 'Copy'), 1200);
				} catch (err) {
					copyBtn.textContent = 'Error';
					setTimeout(() => (copyBtn.textContent = 'Copy'), 1200);
				}
			});
		}
	}
	onMount(() => {
		if (contentRef) {
			toc.updateContentRef(contentRef);
			// Small delay to ensure content is fully rendered
			setTimeout(() => {
				highlightCode();
			}, 0);
		}
	});
</script>

<div class="prose prose-slate max-w-none dark:prose-invert" bind:this={contentRef}>
	<data.doc />
</div>
