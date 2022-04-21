<script lang="ts">
  import badges from '$lib/stores/chat/badges';
  import config from '$lib/stores/chat/config';
  import type { Badges } from 'tmi.js';

  export let userBadges: Badges;

  let badgeImages: string[] = [];

  const updateBadgeImages = () => {
    badgeImages = Object.keys(userBadges)
      .map((badge) => {
        const versions = $badges.find((b) => b.set_id === badge)?.versions;
        return versions?.find((v) => v.id === userBadges[badge])?.image_url_4x;
      })
      .filter(Boolean);
  };

  $: userBadges && updateBadgeImages();
</script>

{#if badgeImages.length !== 0}
  <span class="badges">
    {#each badgeImages as image (image)}
      <span
        class="badge"
        style={[`--margin-right: ${$config.fontSize / 2}px`].filter(Boolean).join('; ')}
      >
        <img class="badge-image" src={image} alt="" />
      </span>
    {/each}
  </span>
{/if}

<style>
  .badges {
    max-height: 1.1875em;
    display: inline-flex;
    position: relative;
    top: 0.2em;
  }

  :global(.badges > .badge) {
    display: inline-block;
    margin-right: var(--margin-right);
    width: min-content;
    height: 100%;
  }

  .badge-image {
    height: 1.1875em;
    width: 1.1875em;
    min-height: 1.1875em;
    min-width: 1.1875em;
  }
</style>
