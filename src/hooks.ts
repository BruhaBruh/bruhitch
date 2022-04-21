import type { ExternalFetch, GetSession, Handle, HandleError } from '@sveltejs/kit';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
import { detectLocale } from './i18n/i18n-util';

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  // read language slug
  const [, lang] = event.url.pathname.split('/');

  // replace html lang attribute with correct language
  const body = await response.text();
  return new Response(body.replace('<html lang="en">', `<html lang="${lang}">`), response);
};

export const handleError: HandleError = async ({ error, event }) => {};

export const getSession: GetSession = async ({ request }) => {
  const headers = getHeaders(request);
  const acceptLanguageDetector = initAcceptLanguageHeaderDetector({ headers });
  const locale = detectLocale(acceptLanguageDetector);

  const cookies = cookieParse(request.headers.get('cookie'));

  return {
    locale,
    isDark: !!cookies.dark
  };
};

export const externalFetch: ExternalFetch = async (request) => {
  return fetch(request);
};

const getHeaders = (request: Request) => {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => (headers[key] = value));

  return headers;
};

export type Cookies = {
  [key: string]: string;
};

const cookieParse = (cookie: string | null): Cookies => {
  let cookies: Cookies = {};
  if (cookie) {
    cookie.split(';').forEach((v) => {
      const [key, value] = v.trim().split('=');
      cookies[key] = value;
    });
  }
  return cookies;
};
