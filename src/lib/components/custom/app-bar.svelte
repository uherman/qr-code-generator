<script lang="ts">
	import Button from '../ui/button/button.svelte';
	import GithubIcon from '@lucide/svelte/icons/github';
</script>

<nav>
	<div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between pb-4">
		<div class="w-full" id="navbar-default">
			<ul class="mt-4 flex flex-row justify-end hover:text-indigo-600">
				<li>
					<Button href="https://github.com/uherman" target="_blank">
						<GithubIcon class="size-4" />
						GitHub</Button
					>
				</li>
			</ul>
		</div>
	</div>
</nav>
