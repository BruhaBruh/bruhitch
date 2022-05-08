<script lang="ts">
  import config from '$lib/stores/prediction/config';
  import prediction from '$lib/stores/prediction/prediction';
  import type { EventSubPredictionEndData, PredictionOutcome } from '$types/eventsub';
  import { slide } from 'svelte/transition';
  import ChannelPointsCell from './ChannelPointsCell.svelte';
  import TitleCell from './TitleCell.svelte';
  import UsersCell from './UsersCell.svelte';

  export let outcome: PredictionOutcome;

  $: isWin =
    $prediction.status === 'end'
      ? outcome.id === ($prediction.data as EventSubPredictionEndData).winning_outcome_id
      : false;
</script>

{#if $prediction.status !== 'end' || isWin}
  <div
    class="flex row"
    style={`margin-top: ${$config.fontSize / 2}px`}
    out:slide={{ duration: 500 }}
  >
    <TitleCell {isWin} title={outcome.title} color={outcome.color} />
    <ChannelPointsCell {isWin} points={outcome.channel_points ?? 0} />
    <UsersCell users={outcome.users ?? 0} />
  </div>
{/if}

<style lang="postcss">
  :global(.row > *) {
    margin-right: 0.25em;
  }

  :global(.row > *:last-child) {
    margin-right: 0;
  }
</style>
