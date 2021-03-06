/// <reference types="@sveltejs/kit" />

type User = import('$types/prisma').User;

type Locales = import('@i18n/i18n-types').Locales;

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
