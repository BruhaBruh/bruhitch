<script lang="ts">
  import type { HorizontalAlignment } from '$types/alignment';
  import type { SelectItem } from '@components/ui/Select';
  import Select from '@components/ui/Select.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';

  export let horizontal: HorizontalAlignment;

  const horizontalAlignTypes: SelectItem[] = [
    {
      value: 'left',
      label: $LL.controls.alignment.left()
    },
    {
      value: 'center',
      label: $LL.controls.alignment.center()
    },
    {
      value: 'right',
      label: $LL.controls.alignment.right()
    }
  ];
</script>

<TextField {...$$restProps} title={$LL.controls.alignment.horizontal()}>
  <Select
    on:selectitem={(e) => (horizontal = e.detail)}
    selected={[horizontal]}
    values={horizontalAlignTypes}
  />
</TextField>
