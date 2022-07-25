import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ request }) => {
  const channel = new URL(request.url).searchParams.get('channel');
  const clientId = process.env.CLIENT_ID ?? '';
  const secretKey = process.env.SECRET_KEY ?? '';

  let res = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `client_id=${clientId}&client_secret=${secretKey}&grant_type=client_credentials`
  });

  const { access_token } = await res.json();

  res = await fetch('https://api.twitch.tv/helix/users?login=' + channel, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Client-Id': clientId
    }
  });

  const { data: userData } = await res.json();
  const broadcasterId = userData[0].id;

  res = await fetch('https://api.twitch.tv/helix/chat/badges/global', {
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Client-Id': clientId
    }
  });

  const { data: globalBadges } = await res.json();

  res = await fetch('https://api.twitch.tv/helix/chat/badges?broadcaster_id=' + broadcasterId, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Client-Id': clientId
    }
  });

  const { data: channelBadges } = await res.json();

  let mergedBadges = globalBadges;

  channelBadges.forEach((badge) => {
    mergedBadges = mergedBadges.map((b) => {
      if (b.set_id == badge.set_id) return badge;
      return b;
    });
  });

  return {
    status: 200,
    body: {
      broadcasterId: broadcasterId,
      badges: mergedBadges
    }
  };
};
