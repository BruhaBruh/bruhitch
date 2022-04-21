import type { BTTVEmote, FFZEmote, STVEmote } from '$types/chat/emote';
import emotes from '../stores/chat/emotes';

const fetchAllEmotes = async (channel: string, broadcasterId: string) => {
  const stvGlobalEmotes: STVEmote[] = await fetch('https://api.7tv.app/v2/emotes/global', {
    method: 'GET'
  })
    .then((res) => res.json())
    .catch(console.error);
  emotes.addStv(stvGlobalEmotes);

  try {
    const stvChatEmotes: STVEmote[] = await fetch(
      'https://api.7tv.app/v2/users/' + channel + '/emotes',
      {
        method: 'GET'
      }
    )
      .then((res) => res.json())
      .catch(console.error);

    emotes.addStv(stvChatEmotes);
  } catch (e) {}

  const bttvGlobalEmotes: BTTVEmote[] = await fetch(
    'https://api.betterttv.net/3/cached/emotes/global',
    {
      method: 'GET'
    }
  )
    .then((res) => res.json())
    .catch(console.error);
  emotes.addBttv(bttvGlobalEmotes);

  try {
    const bttvChatEmotes: {
      id: string;
      bots: any[];
      avatar: string;
      channelEmotes: BTTVEmote[];
      sharedEmotes: BTTVEmote[];
    } = await fetch('https://api.betterttv.net/3/cached/users/twitch/' + broadcasterId, {
      method: 'GET'
    })
      .then((res) => res.json())
      .catch(console.error);

    emotes.addBttv(bttvChatEmotes.sharedEmotes);
    emotes.addBttv(bttvChatEmotes.channelEmotes);
  } catch (e) {}

  try {
    const ffzChatEmotes: {
      sets: {
        [key: string]: {
          emoticons: FFZEmote[];
        };
      };
    } = await fetch('https://api.frankerfacez.com/v1/room/id/' + broadcasterId, {
      method: 'GET'
    })
      .then((res) => res.json())
      .catch(console.error);

    emotes.addFfz(ffzChatEmotes.sets[Object.keys(ffzChatEmotes.sets)[0]].emoticons);
  } catch (e) {}
};

export default fetchAllEmotes;
