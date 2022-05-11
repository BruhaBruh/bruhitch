<script lang="ts">
  import Checkbox from '@components/ui/Checkbox.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';

  export let disablePadding: boolean;
</script>

<TextField title={$LL.controls.disablePadding()} class="mb-4">
  <label for="disable-padding" class="cursor-pointer flex items-center space-x-1 select-none ">
    <Checkbox
      on:change={(e) => (disablePadding = e.detail)}
      group={disablePadding ? ['true'] : []}
      value={'true'}
      id="disable-padding"
    />
    <Typography variant="b1">
      {$LL.controls.disablePadding()}
    </Typography>
  </label>
</TextField>
