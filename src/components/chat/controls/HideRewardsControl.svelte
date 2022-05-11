<script lang="ts">
  import config from '$lib/stores/chat/config';
  import Checkbox from '@components/ui/Checkbox.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<TextField {...$$restProps} title={$LL.chat.controls.hideRewards()}>
  <label for="hide-rewards" class="cursor-pointer flex items-center space-x-1 select-none">
    <Checkbox
      on:change={(e) => config.setHideReward(e.detail)}
      group={$config.hideReward ? ['true'] : []}
      value={'true'}
      id="hide-rewards"
    />
    <Typography variant="b1">
      {$LL.chat.controls.hideRewardsDescription()}
    </Typography>
  </label>
</TextField>
