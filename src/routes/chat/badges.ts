import {
  fetchChannelBadges,
  fetchGlobalBadges,
  getAccessToken,
  getBroadcasterId,
  mergeBadges
} from '$lib/api/twitch';
import type { TwitchBadge } from '$types/chat/badge';
import type { RequestHandler } from '@sveltejs/kit';

const fetchAllBadges = async (
  broadcasterId: string,
  clientId: string,
  accessToken: string
): Promise<TwitchBadge[]> => {
  const globalBadges = await fetchGlobalBadges(clientId, accessToken);

  const chatBadges = await fetchChannelBadges(broadcasterId, clientId, accessToken);

  return mergeBadges(globalBadges, chatBadges);
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

  const accessToken = await getAccessToken(clientId, secretKey);

  const broadcasterId = await getBroadcasterId(channel, clientId, accessToken);

  if (!broadcasterId) return { status: 500, body: { message: 'Error when get broadcaster id' } };

  const badges = await fetchAllBadges(broadcasterId, clientId, accessToken);

  return {
    body: {
      badges,
      broadcasterId
    }
  };
};
