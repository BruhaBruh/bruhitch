<script lang="ts">
  import { Animation } from '$types/animation';
  import type { SelectItem } from '@components/ui/Select';
  import Select from '@components/ui/Select.svelte';

  export let animation: Animation;

  let animations: SelectItem[] = [
    { value: Animation.Slide, label: 'Slide' },
    { value: Animation.Scale, label: 'Scale' },
    { value: Animation.Fade, label: 'Fade' },
    { value: Animation.Nothing, label: 'Nothing' }
  ];
</script>

<Select
  on:selectitem={(e) => (animation = e.detail)}
  selected={[animation]}
  values={animations}
  class="flex-1"
/>
