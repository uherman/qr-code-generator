<script lang="ts">
	import Button from '../ui/button/button.svelte';
	import GithubIcon from '@lucide/svelte/icons/github';
	import CoffeeIcon from '@lucide/svelte/icons/coffee';
	import LightSwitch from './light-switch.svelte';
</script>

<nav>
	<div class="mx-auto flex flex-wrap items-center justify-between pb-6">
		<div class="w-full" id="navbar-default">
			<ul class="flex flex-row flex-wrap items-center justify-end gap-2 sm:gap-3">
				<li>
					<Button href="https://github.com/uherman/qr-code-generator" target="_blank">
						<GithubIcon class="size-4" />
						GitHub</Button
					>
				</li>
				<li>
					<Button href="https://www.buymeacoffee.com/uherman" target="_blank">
						<CoffeeIcon class="size-4" />
						Buy me a coffee
					</Button>
				</li>
				<li>
					<LightSwitch />
				</li>
			</ul>
		</div>
	</div>
</nav>
