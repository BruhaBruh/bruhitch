<script lang="ts">
  import config from '$lib/stores/donate/config';
  import Checkbox from '@components/ui/Checkbox.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<TextField {...$$restProps} title={$LL.donationAlerts.controls.isGradientCurrency()}>
  <label for="gradient-currency" class="cursor-pointer flex items-center space-x-1 select-none">
    <Checkbox
      on:change={(e) => config.setIsGradientCurrency(e.detail)}
      group={$config.isGradientCurrency ? ['true'] : []}
      value={'true'}
      id="gradient-currency"
    />
    <Typography variant="b1">
      {$LL.donationAlerts.controls.isGradientCurrency()}
    </Typography>
  </label>
</TextField>
