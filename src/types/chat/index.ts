import type { ChatUserstate } from 'tmi.js';

export type ChatMessage = {
  id: string;
  time: number;
  state: ChatUserstate;
  message: string;
};
