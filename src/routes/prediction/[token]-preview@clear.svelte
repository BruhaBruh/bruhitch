<script lang="ts" context="module">
  import config from '$lib/stores/prediction/config';
  import PreviewPrediction from '@components/prediction/PreviewPrediction.svelte';
  import type { Load } from '@sveltejs/kit';
  import './prediction.css';

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

    const settings = await fetch('/api/v1/prediction/settings?token=' + token)
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

<PreviewPrediction withWrapper={false} />
