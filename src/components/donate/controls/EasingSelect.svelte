<script lang="ts">
  import config from '$lib/stores/donate/config';
  import { AnimationEasing } from '$types/animation';
  import type { SelectItem } from '@components/ui/Select';
  import Select from '@components/ui/Select.svelte';

  let easing: SelectItem[] = Object.values(AnimationEasing).map((v) => ({ value: v, label: v }));
</script>

<Select
  on:selectitem={(e) => config.setAnimationEasing(e.detail)}
  selected={[$config.animationEasing]}
  values={easing}
  class="flex-1"
/>
