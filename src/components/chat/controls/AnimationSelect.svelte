<script lang="ts">
  import config from '$lib/stores/chat/config';
  import { Animation } from '$types/animation';
  import type { SelectItem } from '@components/ui/Select';
  import Select from '@components/ui/Select.svelte';

  let animations: SelectItem[] = [
    { value: Animation.Slide, label: 'Slide' },
    { value: Animation.Scale, label: 'Scale' },
    { value: Animation.Fade, label: 'Fade' },
    { value: Animation.Nothing, label: 'Nothing' }
  ];
</script>

<Select
  on:selectitem={(e) => config.setAnimation(e.detail)}
  selected={[$config.animation]}
  values={animations}
  class="flex-1"
/>
