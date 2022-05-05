<script lang="ts">
  import config from '$lib/stores/chat/config';
  import Checkbox from '@components/ui/Checkbox.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<TextField title={$LL.chat.controls.gradientOnlyToCustomNicknames()} class="mb-4">
  <label for="gradient-only" class="cursor-pointer flex items-center space-x-1 select-none ">
    <Checkbox
      on:change={(e) => config.setGradientOnlyCustom(e.detail)}
      group={$config.gradientOnlyCustom ? ['true'] : []}
      value={'true'}
      id="gradient-only"
    />
    <Typography variant="b1">
      {$LL.chat.controls.gradientOnlyToCustomNicknames()}
    </Typography>
  </label>
</TextField>
