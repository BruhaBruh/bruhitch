<script lang="ts">
  import config from '$lib/stores/prediction/config';
  import prediction from '$lib/stores/prediction/prediction';
  import { cubicOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import Cell from './Cell.svelte';

  export let points: number = 0;
  export let isWin: boolean;

  let currentPoints = tweened(0, {
    duration: 1000,
    easing: cubicOut
  });

  let text = $currentPoints.toString();

  $: currentPoints.set(points);

  $: {
    const pieces: string[] = [];

    let piece = '';
    $currentPoints
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

    text = pieces.reverse().join(' ');
  }

  const addAnotherPoints = () => {
    const newPoints = $prediction.data.outcomes.reduce(
      (prev, current) => prev + (current.channel_points ?? 0),
      0
    );

    currentPoints.set(newPoints);
  };

  $: isWin && addAnotherPoints();
</script>

<Cell>
  <p>{text}</p>
  {#if $config.channelPointImage}
    <img
      width={$config.fontSize * 1.5}
      height={$config.fontSize * 1.5}
      src={$config.channelPointImage}
      alt=""
    />
  {:else}
    <svg
      class="fill-primary-base"
      width={$config.fontSize * 2}
      height={$config.fontSize * 2}
      version="1.1"
      viewBox="0 0 20 20"
      x="0px"
      y="0px"
    >
      <g>
        <path d="M10 6a4 4 0 014 4h-2a2 2 0 00-2-2V6z" />
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0a6 6 0 11-12 0 6 6 0 0112 0z"
          clip-rule="evenodd"
        />
      </g>
    </svg>
  {/if}
</Cell>
