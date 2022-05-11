<script lang="ts">
  import { AnimationEasing } from '$types/animation';
  import type { SelectItem } from '@components/ui/Select';
  import Select from '@components/ui/Select.svelte';

  export let easing: AnimationEasing;

  let easings: SelectItem[] = Object.values(AnimationEasing).map((v) => ({ value: v, label: v }));
</script>

<Select
  on:selectitem={(e) => (easing = e.detail)}
  selected={[easing]}
  values={easings}
  class="flex-1"
/>
