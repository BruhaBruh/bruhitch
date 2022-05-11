<script lang="ts">
  import config from '$lib/stores/chat/config';
  import type { SelectItem } from '@components/ui/Select';
  import Select from '@components/ui/Select.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';

  const chatTypes: SelectItem[] = [
    {
      value: 'default',
      label: $LL.chat.controls.default()
    },
    {
      value: 'block',
      label: $LL.chat.controls.block()
    },
    {
      value: 'alternative-block',
      label: $LL.chat.controls.alternativeBlock()
    }
  ];
</script>

<TextField {...$$restProps} title={$LL.chat.controls.chatType()}>
  <Select
    on:selectitem={(e) => config.setChatType(e.detail)}
    selected={[$config.chatType]}
    values={chatTypes}
  />
</TextField>
