<script lang="ts">
	import Button from '../ui/button/button.svelte';
	import GithubIcon from '@lucide/svelte/icons/github';
	import LightSwitch from './light-switch.svelte';
</script>

<nav>
	<div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between pb-4">
		<div class="w-full" id="navbar-default">
			<ul class="mt-4 flex flex-row justify-end gap-4">
				<li>
					<Button href="https://github.com/uherman/qr-code-generator" target="_blank">
						<GithubIcon class="size-4" />
						GitHub</Button
					>
				</li>
				<li>
					<LightSwitch />
				</li>
			</ul>
		</div>
	</div>
</nav>
