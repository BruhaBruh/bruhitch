<script lang="ts" context="module">
  import config from '$lib/stores/donate/config';
  import donate from '$lib/stores/donate/donate';
  import type { DonationAlert, User } from '$types/donate';
  import DonateWidget from '@components/donate/widget/DonateWidget.svelte';
  import type { Load } from '@sveltejs/kit';
  import * as Centrifuge from 'centrifuge';
  import { onMount } from 'svelte';
  import './donate.css';

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

    const settings = await fetch('/api/v1/donationalerts/settings?token=' + token)
      .then(async (r) => ({ status: r.status, data: await r.json() }))
      .catch(console.error);

    if (settings && settings.status === 200) {
      config.loadSettings(settings.data);
    }

    const data: { accessToken: string | null } = await fetch(
      '/api/v1/donationalerts/token?token=' + token
    ).then((r) => r.json());

    let user: { data: User } = { data: null };
    if (data.accessToken) {
      user = await fetch('/api/v1/donationalerts/user?access_token=' + data.accessToken).then((r) =>
        r.json()
      );
    }

    return {
      props: {
        accessToken: data.accessToken,
        user: user.data
      }
    };
  };
</script>

<script lang="ts">
  export let accessToken: string | null;
  export let user: User | null;
  let centrifuge: Centrifuge;

  onMount(async () => {
    const url = 'wss://centrifugo.donationalerts.com/connection/websocket';
    const options: Centrifuge.Options = {
      debug: true,
      subscribeEndpoint: '/api/v1/donationalerts/subscribe',
      subscribeHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    };
    //#region  WARNING! DO NOT EDIT
    if (Centrifuge['default']) {
      centrifuge = new (Centrifuge as any).default(url, options);
    } else {
      centrifuge = new Centrifuge(url, options);
    }
    //#endregion

    centrifuge.setToken(user.socket_connection_token);

    centrifuge.on('connect', async function (context) {
      centrifuge.subscribe('$alerts:donation_' + user.id, (e: { data: DonationAlert }) => {
        console.log(e.data);
        donate.add(e.data);
      });
    });

    centrifuge.connect();
  });
</script>

<DonateWidget />
