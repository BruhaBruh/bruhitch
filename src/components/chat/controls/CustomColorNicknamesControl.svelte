<script lang="ts">
  import config from '$lib/stores/chat/config';
  import ColorControl from '@components/controls/ColorControl.svelte';
  import Button from '@components/ui/Button.svelte';
  import type { CheckboxValue } from '@components/ui/Checkbox';
  import Checkbox from '@components/ui/Checkbox.svelte';
  import Input from '@components/ui/Input.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
  import * as chroma from 'chroma-js';
  import CustomColorNicknameItem from './CustomColorNicknameItem.svelte';

  let nickname = '';
  let start = '#2fd523';
  let end = '#17b2de';
  let isGradient: CheckboxValue[] = [];
  let input: HTMLInputElement;

  $: gradient = chroma
    .scale([start, isGradient.length ? end : start])
    .mode('hcl')
    .colors(8, 'hex');

  const handleAddClick = () => {
    if (!nickname || Object.keys($config.nicknameColors).includes(nickname)) return;
    if (isGradient.length !== 0) {
      config.addCustomColor(nickname, undefined, { start, end });
    } else {
      config.addCustomColor(nickname, start);
    }
    nickname = '';
    start = '#2fd523';
    end = '#17b2de';
    input.focus();
  };

  const removeNickname = (nickname: string) => {
    config.removeCustomColor(nickname);
  };
</script>

<div {...$$restProps}>
  <TextField title={$LL.chat.controls.customColorNicknames()} class="mb-2">
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
  <div class="flex items-center space-x-2 mb-2">
    <label for="is-gradient" class="cursor-pointer flex items-center space-x-1 select-none">
      <Checkbox bind:group={isGradient} value={'true'} id="is-gradient" />
      <Typography variant="b1">
        {$LL.chat.controls.isGradient()}
      </Typography>
    </label>
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
  <div class="grid sm:grid-cols-2 gap-2 mb-2">
    <ColorControl title="" color={start} bind:hex={start} />
    {#if isGradient.length !== 0}
      <ColorControl title="" color={end} bind:hex={end} />
    {/if}
  </div>
  <ul class="space-y-1">
    {#each Object.keys($config.nicknameColors) as nickname (nickname)}
      <CustomColorNicknameItem
        {nickname}
        color={$config.nicknameColors[nickname]}
        on:remove={() => removeNickname(nickname)}
      />
    {/each}
  </ul>
</div>
