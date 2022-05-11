<script lang="ts">
  import config from '$lib/stores/subscribe/config';
  import Checkbox from '@components/ui/Checkbox.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<TextField {...$$restProps} title={$LL.subscribeAlerts.controls.isGradientRecipient()}>
  <label for="gradient-recipient" class="cursor-pointer flex items-center space-x-1 select-none">
    <Checkbox
      on:change={(e) => config.setIsGradientRecipient(e.detail)}
      group={$config.isGradientRecipient ? ['true'] : []}
      value={'true'}
      id="gradient-recipient"
    />
    <Typography variant="b1">
      {$LL.subscribeAlerts.controls.isGradientRecipient()}
    </Typography>
  </label>
</TextField>
