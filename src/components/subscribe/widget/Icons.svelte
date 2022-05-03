<script lang="ts">
  import config from '$lib/stores/subscribe/config';
  import Icon from '@components/ui/Icon.svelte';

  export let tier: 'Prime' | '1000' | '2000' | '3000' | string;
  export let months: number = undefined;
  export let streak: number = undefined;
  export let isGift: boolean = false;
  export let toRight: boolean = false;
</script>

<div {...$$restProps} class={['flex', $$restProps.class].filter(Boolean).join(' ')}>
  <div
    class="flex items-center justify-center"
    style={`background-color: rgba(17, 17, 17, 0.75); border-radius: ${
      $config.fontSize / 2
    }px; padding: ${$config.fontSize / 2}px; font-size: ${$config.fontSize * 0.75}px; margin-${
      toRight ? 'right' : 'left'
    }: ${$config.fontSize / 2}px;`}
  >
    <div style={`margin-right: ${$config.fontSize / 4}px; line-height: ${$config.fontSize}px;`}>
      {tier === 'Prime' ? 'P' : tier[0]}
    </div>
    <Icon icon="star" size={$config.fontSize} class="fill-warning-base" />
  </div>
  {#if months}
    <div
      class="flex items-center justify-center"
      style={`background-color: rgba(17, 17, 17, 0.75); border-radius: ${
        $config.fontSize / 2
      }px; padding: ${$config.fontSize / 2}px; font-size: ${$config.fontSize * 0.75}px; margin-${
        toRight ? 'right' : 'left'
      }: ${$config.fontSize / 2}px;`}
    >
      <div style={`margin-right: ${$config.fontSize / 4}px; line-height: ${$config.fontSize}px;`}>
        {months}
      </div>
      <Icon icon="calendar" size={$config.fontSize} class="fill-primary-base" />
    </div>
  {/if}
  {#if streak}
    <div
      class="flex items-center justify-center"
      style={`background-color: rgba(17, 17, 17, 0.75); border-radius: ${
        $config.fontSize / 2
      }px; padding: ${$config.fontSize / 2}px; font-size: ${$config.fontSize * 0.75}px; margin-${
        toRight ? 'right' : 'left'
      }: ${$config.fontSize / 2}px;`}
    >
      <div style={`margin-right: ${$config.fontSize / 4}px; line-height: ${$config.fontSize}px;`}>
        {streak}
      </div>
      <Icon icon="fire" size={$config.fontSize} class="fill-danger-base" />
    </div>
  {/if}
  {#if isGift}
    <div
      class="flex items-center justify-center aspect-square"
      style={`background-color: rgba(17, 17, 17, 0.75); border-radius: ${
        $config.fontSize / 2
      }px; padding: ${$config.fontSize / 2}px; font-size: ${$config.fontSize * 0.75}px; margin-${
        toRight ? 'right' : 'left'
      }: ${$config.fontSize / 2}px;`}
    >
      <Icon icon="gift" size={$config.fontSize} class="fill-[#C05DEF]" />
    </div>
  {/if}
</div>
