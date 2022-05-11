<script lang="ts">
  import { isColor } from '$lib/color';
  import ColorPicker from '@components/ui/ColorPicker.svelte';
  import HuePicker from '@components/ui/HuePicker.svelte';
  import Input from '@components/ui/Input.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import * as chroma from 'chroma-js';

  export let color: string;
  export let title: string;

  let hue = chroma.hex(color).hsv()[0];
  let saturation = chroma.hex(color).hsv()[1];
  let value = chroma.hex(color).hsv()[2];

  const handleInput = (e: Event) => {
    const raw = (e.currentTarget as HTMLInputElement).value;
    if (!isColor(raw)) return;
    const hsv = chroma.hex(raw).hsv();
    hue = hsv[0];
    saturation = hsv[1];
    value = hsv[2];
  };

  $: {
    const hsv = chroma.hex(color).hsv();
    saturation = hsv[1];
    value = hsv[2];
  }
</script>

<TextField {...$$restProps} {title}>
  <div>
    <div class="flex space-x-2 items-stretch mb-2">
      <ColorPicker
        bind:hex={color}
        bind:hue
        bind:saturation
        bind:value
        class="h-32 sm:h-48 md:h-64 lg:h-96 w-full rounded-default"
      />
      <HuePicker bind:hue variant="vertical" class="w-5 rounded-default" />
    </div>
    <Input value={color} on:input={handleInput} type="color" />
  </div>
</TextField>
