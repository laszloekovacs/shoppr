import { renderToString } from 'react-dom/server'

import { EntryContext } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import { renderStylesToString } from '@emotion/server'

export default function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext
) {
	const markup = renderToString(
		<RemixServer context={remixContext} url={request.url} />
	)

	const html = renderStylesToString(markup)

	responseHeaders.set('Content-Type', 'text/html')
	return new Response('<!DOCTYPE html>' + html, {
		status: responseStatusCode,
		headers: responseHeaders,
	})
}
