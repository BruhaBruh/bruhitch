<script lang="ts">
  import Button from '@components/ui/Button.svelte';
  import Input from '@components/ui/Input.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
  import { slide } from 'svelte/transition';

  export let hiddenNicknames: string[] = [];

  let nickname = '';
  let input: HTMLInputElement;

  const handleAddClick = () => {
    if (!nickname || hiddenNicknames.includes(nickname)) return;
    hiddenNicknames = [...hiddenNicknames, nickname];
    nickname = '';
    input.focus();
  };

  const removeNickname = (nickname: string) => {
    hiddenNicknames = hiddenNicknames.filter((v) => v !== nickname);
  };
</script>

<div {...$$restProps}>
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
    {#each hiddenNicknames as nickname (nickname)}
      <li class="flex" transition:slide>
        <Typography variant="b1" class="w-full">{nickname}</Typography>
        <Button color="danger" on:click={() => removeNickname(nickname)}>
          {$LL.remove()}
        </Button>
      </li>
    {/each}
  </ul>
</div>
