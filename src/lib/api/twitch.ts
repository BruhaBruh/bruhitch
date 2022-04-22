import type { TwitchBadge } from '$types/chat/badge';

const getHeaders = (clientId: string, accessToken: string): Headers => {
  const headers = new Headers();

  headers.append('Authorization', `Bearer ${accessToken}`);
  headers.append('Client-Id', clientId.toString());

  return headers;
};

export const fetchGlobalBadges = async (
  clientId: string,
  accessToken: string
): Promise<TwitchBadge[]> => {
  const headers = getHeaders(clientId, accessToken);

  const globalBadges: { data: TwitchBadge[] } = await fetch(
    'https://api.twitch.tv/helix/chat/badges/global',
    {
      method: 'GET',
      headers
    }
  )
    .then((res) => res.json())
    .catch(console.error);
  return globalBadges?.data ?? [];
};

export const fetchChannelBadges = async (
  broadcasterId: string | number,
  clientId: string,
  accessToken: string
): Promise<TwitchBadge[]> => {
  const headers = getHeaders(clientId, accessToken);

  const chatBadges: { data: TwitchBadge[] } = await fetch(
    'https://api.twitch.tv/helix/chat/badges?broadcaster_id=' + broadcasterId,
    {
      method: 'GET',
      headers
    }
  )
    .then((res) => res.json())
    .catch(console.error);
  return chatBadges?.data ?? [];
};

export const mergeBadges = (badges: TwitchBadge[], badges2: TwitchBadge[]): TwitchBadge[] => {
  let mergedBadges = badges2;

  badges.forEach((twitchBadge) => {
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

export const getAccessToken = async (clientId: string, secretKey: string): Promise<string> => {
  const data: { access_token: string } = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${secretKey}&grant_type=client_credentials`,
    {
      method: 'POST'
    }
  )
    .then((r) => r.json())
    .catch(console.error);
  return data?.access_token || '';
};

export const getBroadcasterId = async (
  channel: string,
  clientId: string,
  accessToken: string
): Promise<string | undefined> => {
  const headers = getHeaders(clientId, accessToken);

  const broadcaster: {
    data: { id: string }[];
  } = await fetch('https://api.twitch.tv/helix/users?login=' + channel, {
    method: 'GET',
    headers
  }).then((r) => r.json());

  return broadcaster?.data[0]?.id;
};
