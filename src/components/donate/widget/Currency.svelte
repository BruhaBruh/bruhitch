<script lang="ts">
  import config from '$lib/stores/donate/config';
  import type { Currency } from '$types/donate';
  import CurrencySymbol from './CurrencySymbol.svelte';

  export let currency: Currency;
  export let amount: number;

  let amountText = amount.toString();

  $: {
    const pieces: string[] = [];

    let piece = '';
    amount
      .toFixed(0)
      .toString()
      .split('')
      .reverse()
      .forEach((v) => {
        piece += v;
        if (piece.length === 3) {
          pieces.push(piece.split('').reverse().join(''));
          piece = '';
        }
      });
    if (piece) pieces.push(piece.split('').reverse().join(''));

    amountText = pieces.reverse().join(' ');
  }
</script>

<div
  class="flex items-center justify-center"
  style={`background-color: rgba(17, 17, 17, 0.75); border-radius: ${
    $config.fontSize / 2
  }px; padding: ${$config.fontSize / 2}px; font-size: ${$config.fontSize * 1.5}px; margin-left: ${
    $config.fontSize / 2
  }px; height: ${$config.fontSize * 3}px`}
>
  <p
    class="whitespace-nowrap"
    style={`margin-right: ${$config.fontSize / 4}px; line-height: ${$config.fontSize * 1.5}px;`}
  >
    {amountText}
  </p>
  <CurrencySymbol {currency} />
</div>
