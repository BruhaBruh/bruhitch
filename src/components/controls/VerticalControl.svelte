<script lang="ts">
  import type { VerticalAlignment } from '$types/alignment';
  import type { SelectItem } from '@components/ui/Select';
  import Select from '@components/ui/Select.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';

  export let vertical: VerticalAlignment;

  const verticalAlignTypes: SelectItem[] = [
    {
      value: 'top',
      label: $LL.controls.alignment.top()
    },
    {
      value: 'center',
      label: $LL.controls.alignment.center()
    },
    {
      value: 'bottom',
      label: $LL.controls.alignment.bottom()
    }
  ];
</script>

<TextField title={$LL.controls.alignment.vertical()} class="mb-4">
  <Select
    on:selectitem={(e) => (vertical = e.detail)}
    selected={[vertical]}
    values={verticalAlignTypes}
  />
</TextField>
