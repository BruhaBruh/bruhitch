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
      label: $LL.followAlerts.controls.left()
    },
    {
      value: 'center',
      label: $LL.followAlerts.controls.center()
    },
    {
      value: 'right',
      label: $LL.followAlerts.controls.right()
    }
  ];
</script>

<TextField title={$LL.controls.alignment.horizontal()} class="mb-4">
  <Select
    on:selectitem={(e) => (horizontal = e.detail)}
    selected={[horizontal]}
    values={horizontalAlignTypes}
  />
</TextField>
