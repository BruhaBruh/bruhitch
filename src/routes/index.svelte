<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async () => {
    return {
      status: 308,
      redirect: `/en`
    };
  };
</script>

<script lang="ts">
</script>
