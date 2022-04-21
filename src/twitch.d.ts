import 'tmi.js';

declare global {
  var tmi: any;
}

declare module 'tmi.js' {
  export interface ChatUserstate extends CommonUserstate {
    'message-type'?: 'chat' | 'action' | 'whisper' | undefined;
    username?: string | undefined;
    bits?: string | undefined;
    'custom-reward-id'?: string | undefined;
  }
}
