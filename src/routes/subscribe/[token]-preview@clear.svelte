<script lang="ts" context="module">
  import config from '$lib/stores/subscribe/config';
  import PreviewSubscribe from '@components/subscribe/PreviewSubscribe.svelte';
  import type { Load } from '@sveltejs/kit';
  import './subscribe.css';

  export const prerender = true;

  type LoadParams = {
    token: string;
  };

  export const load: Load<LoadParams> = async ({ params, fetch }) => {
    const { token } = params;

    if (!token) {
      return {
        status: 403,
        error: new Error('token is not defined')
      };
    }

    const settings = await fetch('/api/v1/subscribe/settings?token=' + token)
      .then(async (r) => ({ status: r.status, data: await r.json() }))
      .catch(console.error);

    if (settings && settings.status === 200) {
      config.loadSettings(settings.data);
    }

    return {};
  };
</script>

<script lang="ts">
</script>

<PreviewSubscribe withWrapper={false} />
