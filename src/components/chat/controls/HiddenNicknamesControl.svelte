<script lang="ts">
  import config from '$lib/stores/chat/config';
  import Button from '@components/ui/Button.svelte';
  import Input from '@components/ui/Input.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
  import { slide } from 'svelte/transition';

  let nickname = '';
  let input: HTMLInputElement;

  const handleAddClick = () => {
    if (!nickname || $config.hiddenNicknames.includes(nickname)) return;
    config.setHidden([...$config.hiddenNicknames, nickname]);
    nickname = '';
    input.focus();
  };

  const removeNickname = (nickname: string) => {
    config.setHidden($config.hiddenNicknames.filter((v) => v !== nickname));
  };
</script>

<div class="mb-4">
  <TextField title={$LL.chat.controls.hiddenNicknames()} class="mb-2">
    <div class="flex space-x-2">
      <Input
        placeholder={$LL.chat.controls.nickname()}
        bind:input
        class="w-full"
        bind:value={nickname}
      />
      <Button color="secondary" on:click={handleAddClick}>{$LL.add()}</Button>
    </div>
  </TextField>
  <ul class="space-y-1">
    {#each $config.hiddenNicknames as nickname (nickname)}
      <li class="flex" transition:slide>
        <Typography variant="b1" class="w-full">{nickname}</Typography>
        <Button color="danger" on:click={() => removeNickname(nickname)}>
          {$LL.remove()}
        </Button>
      </li>
    {/each}
  </ul>
</div>
