<script lang="ts">
  import config from '$lib/stores/donate/config';
  import type { Currency } from '$types/donate';
  import UserName from '@components/donate/widget/UserName.svelte';
  import CurrencyAmount from './Currency.svelte';
  import IsAudio from './IsAudio.svelte';

  export let username: string | null;
  export let currency: Currency;
  export let amount: number;
  export let isAudio: boolean;
</script>

<div
  class="whitespace-normal font-semibold flex items-center"
  style={`font-size: ${$config.fontSize * 2}px`}
>
  <UserName {username} />
  <CurrencyAmount {amount} {currency} />
  <IsAudio {isAudio} />
</div>
