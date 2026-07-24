import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for:
  // - paths starting with /api, /trpc, /_next, /_vercel, /image
  // - generic paths containing a dot (e.g., favicon.ico, manifest.json)
  // Explicit content routes below still allow legitimate IDs such as
  // "claude-opus-4.5-thinking".
  matcher: [
    '/((?!api|trpc|_next|_vercel|image|.*\\..*).*)',
    '/(cong-cu|bang-xep-hang|tac-gia)/:id',
    '/en/(tools|rankings|author)/:id',
  ]
};
