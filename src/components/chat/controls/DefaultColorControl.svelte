<script lang="ts">
  import { isColor } from '$lib/color';
  import config from '$lib/stores/chat/config';
  import ColorPicker from '@components/ui/ColorPicker.svelte';
  import HuePicker from '@components/ui/HuePicker.svelte';
  import Input from '@components/ui/Input.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';
  import * as chroma from 'chroma-js';

  let hue = chroma.hex($config.defaultColor).hsv()[0];
  let saturation = chroma.hex($config.defaultColor).hsv()[1];
  let value = chroma.hex($config.defaultColor).hsv()[2];

  const handleInput = (e: Event) => {
    const raw = (e.currentTarget as HTMLInputElement).value;
    if (!isColor(raw)) return;
    const color = chroma.hex(raw).hsv();
    hue = color[0];
    saturation = color[1];
    value = color[2];
  };

  config.subscribe((v) => {
    const color = chroma.hex(v.defaultColor).hsv();
    saturation = color[1];
    value = color[2];
  });
</script>

<TextField title={$LL.chat.controls.defaultColor()} class="mb-4">
  <div class="w-2/3 xl:w-1/2">
    <ColorPicker
      bind:hex={$config.defaultColor}
      bind:hue
      bind:saturation
      bind:value
      class="aspect-video w-full mb-2 rounded-default"
    />
    <HuePicker bind:hue variant="horizontal" class="w-full h-5 rounded-default mb-2" />
    <Input value={$config.defaultColor} on:input={handleInput} />
  </div>
</TextField>
