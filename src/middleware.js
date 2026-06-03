/**
 * Astro Middleware
 * Sets X-Robots-Tag to noindex, nofollow on preview deployments (.pages.dev).
 */
export async function onRequest(context, next) {
	const response = await next();
	const url = new URL(context.request.url);
	
	if (url.hostname.endsWith('.pages.dev')) {
		response.headers.set('X-Robots-Tag', 'noindex, nofollow');
	}
	
	return response;
}
