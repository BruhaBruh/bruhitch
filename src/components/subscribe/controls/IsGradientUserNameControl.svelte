<script lang="ts">
  import config from '$lib/stores/subscribe/config';
  import Checkbox from '@components/ui/Checkbox.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<TextField {...$$restProps} title={$LL.subscribeAlerts.controls.isGradientUsername()}>
  <label for="gradient-username" class="cursor-pointer flex items-center space-x-1 select-none">
    <Checkbox
      on:change={(e) => config.setIsGradientUsername(e.detail)}
      group={$config.isGradientUsername ? ['true'] : []}
      value={'true'}
      id="gradient-username"
    />
    <Typography variant="b1">
      {$LL.subscribeAlerts.controls.isGradientUsername()}
    </Typography>
  </label>
</TextField>
