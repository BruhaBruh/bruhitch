import type { PrivateMessageTags } from 'twitch-js';
import type { ChatTwitchBadge } from './badge';

export type UserState = PrivateMessageTags & { id: string };

export type ChatMessage = {
  id: string;
  time: number;
  user: UserState;
  message: string;
  badgeNames: ChatTwitchBadge[];
};

export type NewMessageResponse = {
  _raw: string;
  timestamp: string;
  command: string;
  event: string;
  channel: string;
  username: string;
  isSelf: boolean;
  message: string;
  tags: UserState;
};
