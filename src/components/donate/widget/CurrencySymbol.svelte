<script lang="ts">
  import { generateGradient, generateLightenColor } from '$lib/color';
  import getCurrencySymbol from '$lib/getCurrencySymbol';
  import config from '$lib/stores/donate/config';
  import type { Currency } from '$types/donate';

  export let currency: Currency;

  const startColor = $config.currencyColor;
  const endColor = $config.isGradientCurrency
    ? generateLightenColor($config.currencyColor)
    : $config.currencyColor;

  const gradient = generateGradient(startColor, endColor);
</script>

<p
  style={`background: linear-gradient(to right, ${gradient.join(
    ', '
  )}); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent`}
>
  {getCurrencySymbol(currency)}
</p>
