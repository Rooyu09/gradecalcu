export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // If the request is for the .pages.dev preview/deployment domain
  if (url.hostname.endsWith('.pages.dev')) {
    // Dynamically serve a blocking robots.txt specifically for pages.dev
    if (url.pathname === '/robots.txt') {
      return new Response('User-agent: *\nDisallow: /\n', {
        headers: {
          'Content-Type': 'text/plain',
          'X-Robots-Tag': 'noindex, nofollow'
        }
      });
    }

    // Fetch the original response
    const response = await context.next();

    // Clone the response and inject the X-Robots-Tag: noindex, nofollow header
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return newResponse;
  }

  // Allow standard access for custom domains (e.g. gradecalcu.com)
  return await context.next();
}
