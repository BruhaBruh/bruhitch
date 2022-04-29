<script lang="ts">
  import type { UserNicknameColor } from '$types/chat/nickname';
  import Button from '@components/ui/Button.svelte';
  import type { CheckboxValue } from '@components/ui/Checkbox';
  import Checkbox from '@components/ui/Checkbox.svelte';
  import ColorPicker from '@components/ui/ColorPicker.svelte';
  import Input from '@components/ui/Input.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
  import * as chroma from 'chroma-js';
  import CustomColorNicknamesControlItem from './CustomColorNicknamesControlItem.svelte';

  export let userNicknames: UserNicknameColor = {};

  let nickname = '';
  let start = '#000000';
  let end = '#000000';
  let isGradient: CheckboxValue[] = [];
  let input: HTMLInputElement;

  $: gradient = chroma
    .scale([start, isGradient.length ? end : start])
    .mode('hcl')
    .colors(8, 'hex');

  const handleAddClick = () => {
    if (!nickname || Object.keys(userNicknames).includes(nickname)) return;
    if (isGradient.length !== 0) {
      userNicknames[nickname] = { start, end };
    } else {
      userNicknames[nickname] = start;
    }
    nickname = '';
    start = '#000000';
    end = '#000000';
    input.focus();
  };

  const removeNickname = (nickname: string) => {
    delete userNicknames[nickname];
    userNicknames = userNicknames;
  };
</script>

<div {...$$restProps}>
  <TextField title={$LL.chat.customColorNicknames()} class="mb-2">
    <div class="flex space-x-2">
      <Input placeholder={$LL.chat.nickname()} bind:input class="w-full" bind:value={nickname} />
      <Button color="secondary" on:click={handleAddClick}>{$LL.add()}</Button>
    </div>
  </TextField>
  <div class="flex items-center space-x-2 mb-2">
    <label for="is-gradient" class="cursor-pointer flex items-center space-x-1 select-none">
      <Checkbox bind:group={isGradient} value={'true'} id="is-gradient" />
      <Typography variant="b1">
        {$LL.chat.isGradient()}
      </Typography>
    </label>
    <ColorPicker bind:value={start} />
    {#if isGradient.length !== 0}
      <ColorPicker bind:value={end} />
    {/if}
    <Typography variant="b1">
      <span
        style={`background: linear-gradient(to right, ${gradient.join(
          ', '
        )}); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent`}
      >
        {nickname}
      </span>
    </Typography>
  </div>
  <ul class="space-y-1">
    {#each Object.keys(userNicknames) as nickname (nickname)}
      <CustomColorNicknamesControlItem
        {nickname}
        color={userNicknames[nickname]}
        on:remove={() => removeNickname(nickname)}
      />
    {/each}
  </ul>
</div>
