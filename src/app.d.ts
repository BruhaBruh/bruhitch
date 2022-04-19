/// <reference types="@sveltejs/kit" />

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

declare namespace NodeJS {
  // interface ProcessEnv { }
}
