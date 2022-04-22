<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ session }) => {
    return {
      status: 307,
      redirect: `/${session.locale}/wip`
    };
  };
</script>

<script lang="ts">
</script>

<div />
