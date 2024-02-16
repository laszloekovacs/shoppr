import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'

import { withEmotionCache } from '@emotion/react'
import { useContext, useEffect, useRef } from 'react'
import ServerStyleContext from './services/emotion/server.context'
import ClientStyleContext from './services/emotion/client.context'

/* might need to move these */
import UploadProvider from './components/upload-provider'
import GlobalStyles from './services/emotion/global-styles'

interface DocumentProps {
	children: React.ReactNode
	title?: string
}

const Document = withEmotionCache(
	({ children, title }: DocumentProps, emotionCache) => {
		const serverStyleData = useContext(ServerStyleContext)
		const clientStyleData = useContext(ClientStyleContext)
		const reinjectStylesRef = useRef(true)

		useEffect(() => {
			if (!reinjectStylesRef.current) {
				return
			}

			emotionCache.sheet.container = document.head

			const tags = emotionCache.sheet.tags
			emotionCache.sheet.flush()
			tags.forEach((tag) => {
				;(emotionCache.sheet as any)._insertTag(tag)
			})

			clientStyleData.reset()

			reinjectStylesRef.current = false
		}, [clientStyleData, emotionCache.sheet])

		return (
			<html lang="en">
				<head>
					{title ? <title>{title}</title> : null}
					<Meta />
					<Links />
					{serverStyleData?.map(({ key, ids, css }) => (
						<style
							key={key}
							data-emotion={`${key} ${ids.join(' ')}`}
							// eslint-disable-next-line react/no-danger
							dangerouslySetInnerHTML={{ __html: css }}
						/>
					))}
				</head>
				<body>
					{children}
					<ScrollRestoration />
					<Scripts />
					<LiveReload />
				</body>
			</html>
		)
	}
)

export default function Root() {
	return (
		<Document>
			<Outlet />
		</Document>
	)
}
