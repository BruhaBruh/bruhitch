import type { TwitchBadge } from '$types/chat/badge';
import type { RequestHandler } from '@sveltejs/kit';

const fetchAllBadges = async (headers: Headers, broadcasterId: string): Promise<TwitchBadge[]> => {
  const globalBadges: { data: TwitchBadge[] } = await fetch(
    'https://api.twitch.tv/helix/chat/badges/global',
    {
      method: 'GET',
      headers
    }
  )
    .then((res) => res.json())
    .catch(console.error);

  const chatBadges: { data: TwitchBadge[] } = await fetch(
    'https://api.twitch.tv/helix/chat/badges?broadcaster_id=' + broadcasterId,
    {
      method: 'GET',
      headers
    }
  )
    .then((res) => res.json())
    .catch(console.error);

  let mergedBadges = chatBadges.data;

  globalBadges.data.forEach((twitchBadge) => {
    const sameBadge = mergedBadges.find((m) => m.set_id === twitchBadge.set_id);
    if (!sameBadge) return mergedBadges.push(twitchBadge);
    const resultVersions = [
      ...sameBadge.versions,
      ...twitchBadge.versions.filter((tb) => !sameBadge.versions.map((v) => v.id).includes(tb.id))
    ];
    mergedBadges = [
      ...mergedBadges.filter((b) => b.set_id !== sameBadge.set_id),
      { set_id: sameBadge.set_id, versions: resultVersions }
    ];
  });

  return mergedBadges;
};

export const get: RequestHandler = async ({ request }) => {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const secretKey = process.env.TWITCH_SECRET_KEY;

  const channel = new URL(request.url).searchParams.get('channel');
  if (!channel)
    return {
      status: 403,
      body: {
        message: 'channel is not defined'
      }
    };

  const data: { access_token: string } = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${secretKey}&grant_type=client_credentials`,
    {
      method: 'POST'
    }
  ).then((r) => r.json());

  const headers = new Headers();

  headers.append('Authorization', `Bearer ${data.access_token}`);
  headers.append('Client-Id', clientId.toString());

  const broadcaster: {
    data: { id: string }[];
  } = await fetch('https://api.twitch.tv/helix/users?login=' + channel, {
    method: 'GET',
    headers
  }).then((r) => r.json());

  if (!broadcaster.data[0])
    return { status: 500, body: { message: 'Error when get broadcaster id' } };

  const badges = await fetchAllBadges(headers, broadcaster.data[0].id);

  return {
    body: {
      badges,
      broadcasterId: broadcaster.data[0].id
    }
  };
};
