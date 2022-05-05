<script lang="ts">
  import prediction from '$lib/stores/prediction/prediction';
  import { onMount } from 'svelte';
  import PredictionWidget from './widget/PredictionWidget.svelte';

  export let withWrapper = true;

  onMount(() => {
    prediction.setPrediction('begin', {
      id: '0ce11d83-b586-4867-8d93-c7dc779effc6',
      broadcaster_user_id: '635252103',
      broadcaster_user_name: 'BruhaBruh',
      broadcaster_user_login: 'bruhabruh',
      title: 'TEST',
      winning_outcome_id: '3ac77d39-04fc-4a39-a07c-9dfdfb5dbf49',
      outcomes: [
        {
          id: '1b0e8cab-6f76-40fc-890d-cd712051c544',
          title: '1',
          color: 'blue',
          users: 5,
          channel_points: 10000,
          top_predictors: [
            {
              user_id: '492604888',
              user_login: 'hyperspace42_',
              user_name: 'hyperspace42_',
              channel_points_used: 10000,
              channel_points_won: null
            }
          ]
        },
        {
          id: '3ac77d39-04fc-4a39-a07c-9dfdfb5dbf49',
          title: '2',
          color: 'pink',
          users: 10,
          channel_points: 5300,
          top_predictors: [
            {
              user_id: '784600186',
              user_login: 'bbenotik',
              user_name: 'bbenotik',
              channel_points_used: 10,
              channel_points_won: null
            }
          ]
        }
      ],
      started_at: '2022-05-05T18:50:16.140968603Z',
      locks_at: '2022-05-05T18:55:16.140968603Z'
    });
  });
</script>

{#if withWrapper}
  <div
    {...$$restProps}
    class={[
      'preview border border-gray-base h-full sticky top-20 flex items-center justify-center overflow-hidden bg-gray-lightest',
      $$restProps.class
    ]
      .filter(Boolean)
      .join(' ')}
  >
    <div class="h-full w-full flex flex-col items-stretch justify-start overflow-hidden">
      <PredictionWidget />
    </div>
  </div>
{:else}
  <PredictionWidget />
{/if}

<style lang="postcss">
  .preview {
    height: 576px;
  }
</style>
