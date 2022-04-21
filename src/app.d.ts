/// <reference types="@sveltejs/kit" />

import 'tmi.js';

type Locales = import('@i18n/i18n-types').Locales;

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces

declare namespace App {
  interface Locals {}

  interface Platform {}

  interface Session {
    locale: Locales;
    isDark: boolean;
  }

  interface Stuff {}
}

declare global {
  var tmi: any;
}

declare namespace NodeJS {
  // interface ProcessEnv { }
}

declare module 'tmi.js' {
  export interface ChatUserstate extends CommonUserstate {
    'message-type'?: 'chat' | 'action' | 'whisper' | undefined;
    username?: string | undefined;
    bits?: string | undefined;
    'custom-reward-id'?: string | undefined;
  }
}
