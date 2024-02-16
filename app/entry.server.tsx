import type { AppLoadContext, EntryContext } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import { renderToString } from 'react-dom/server'

import { CacheProvider } from '@emotion/react'
import createEmotionServer from '@emotion/server/create-instance'
import createEmotionCache from '~/services/emotion/createEmotionCache'
import ServerStyleContext from '~/services/emotion/server.context'

export default function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext,
	loadContext: AppLoadContext
) {
	const cache = createEmotionCache()
	const { extractCriticalToChunks } = createEmotionServer(cache)

	const html = renderToString(
		<ServerStyleContext.Provider value={null}>
			<CacheProvider value={cache}>
				<RemixServer context={remixContext} url={request.url} />
			</CacheProvider>
		</ServerStyleContext.Provider>
	)

	const chunks = extractCriticalToChunks(html)

	const markup = renderToString(
		<ServerStyleContext.Provider value={chunks.styles}>
			<CacheProvider value={cache}>
				<RemixServer context={remixContext} url={request.url} />
			</CacheProvider>
		</ServerStyleContext.Provider>
	)

	responseHeaders.set('Content-Type', 'text/html')

	return new Response(`<!DOCTYPE html>${markup}`, {
		status: responseStatusCode,
		headers: responseHeaders,
	})
}
