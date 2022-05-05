<script lang="ts">
  import config from '$lib/stores/follow/config';
  import Checkbox from '@components/ui/Checkbox.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<TextField title={$LL.followAlerts.controls.disablePadding()} class="mb-4">
  <label for="disable-padding" class="cursor-pointer flex items-center space-x-1 select-none ">
    <Checkbox
      on:change={(e) => config.setDisablePadding(e.detail)}
      group={$config.disablePadding ? ['true'] : []}
      value={'true'}
      id="disable-padding"
    />
    <Typography variant="b1">
      {$LL.followAlerts.controls.disablePadding()}
    </Typography>
  </label>
</TextField>
