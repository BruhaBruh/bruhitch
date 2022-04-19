import type { RequestHandler } from '@sveltejs/kit';

export type ThemeChangeData = {
  isDark: boolean;
};

export const post: RequestHandler = async ({ request }) => {
  const data: ThemeChangeData = await request.json();

  const headers = new Headers();
  headers.append(
    'Set-Cookie',
    `dark=1; Path=/; HttpOnly; Expires=${
      data.isDark ? new Date(2147483647 * 1000).toUTCString() : new Date().toUTCString()
    }`
  );

  return {
    status: 200,
    headers: headers
  };
};
