import { handleErrorWithSentry } from '@sentry/sveltekit';
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
	dsn: import.meta.env.VITE_SENTRY_DSN,
	environment: import.meta.env.MODE, // 'development' or 'production'
	release: import.meta.env.VITE_APP_VERSION || 'unknown',
	denyUrls: [
		new RegExp("extensions/", "i"), 
		new RegExp("^chrome://", "i"),
		new RegExp("^moz-extension://", "i"),
		new RegExp("^safari-extension://", "i")
	],
	beforeSend(event) {
		// Only send errors in production
		if (import.meta.env.MODE === 'development') {
			console.log('Sentry event (dev mode):', event);
			return null;
		}
		return event;
	},
	tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 0
});

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
