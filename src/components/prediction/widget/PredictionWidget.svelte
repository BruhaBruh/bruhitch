<script lang="ts">
  import config from '$lib/stores/prediction/config';
  import Prediction from './Prediction.svelte';
</script>

<div
  class={[
    'max-h-full h-screen flex',
    $config.vertical === 'top' ? 'items-start' : '',
    $config.vertical === 'center' ? 'items-center' : '',
    $config.vertical === 'bottom' ? 'items-end' : ''
  ]
    .filter(Boolean)
    .join(' ')}
  style={[$config.disablePadding ? '' : `padding: ${$config.fontSize}px`]
    .filter(Boolean)
    .join('; ')}
>
  <Prediction />
</div>
