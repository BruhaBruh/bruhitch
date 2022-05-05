<script lang="ts">
  import config from '$lib/stores/follow/config';
  import Checkbox from '@components/ui/Checkbox.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<TextField title={$LL.followAlerts.controls.isGradientNickname()} class="mb-4">
  <label for="gradient-nickname" class="cursor-pointer flex items-center space-x-1 select-none ">
    <Checkbox
      on:change={(e) => config.setIsGradientNickname(e.detail)}
      group={$config.isGradientNickname ? ['true'] : []}
      value={'true'}
      id="gradient-nickname"
    />
    <Typography variant="b1">
      {$LL.followAlerts.controls.isGradientNickname()}
    </Typography>
  </label>
</TextField>
