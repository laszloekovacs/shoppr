import React, { ChangeEventHandler } from 'react'
import { AnonymousCredential, BlobServiceClient } from '@azure/storage-blob'
import { json, useLoaderData } from '@remix-run/react'
import {
	DefaultAzureCredential,
	InteractiveBrowserCredential,
} from '@azure/identity'

export async function loader() {
	// get the env from remix
	const data = {
		blobConnectionString: process.env.BLOB_CONNECTION_STRING as string,
		blobContainerName: process.env.BLOB_CONTAINER as string,
	}

	return json({ data })
}

const UploaderPage = () => {
	const [files, setFiles] = React.useState<File[]>([])
	const [isPending, setIsPending] = React.useState(false)
	const [error, setError] = React.useState<string | null>(null)
	const { data } = useLoaderData<typeof loader>()
	const [bytes, setBytes] = React.useState(0)
	const imgRef = React.useRef<HTMLInputElement>(null)
	const [list, setList] = React.useState<any[]>([])

	const handleChange = (event: any) => {
		console.log(event)
		// @ts-ignore
		setFiles([...event.target.files])
	}

	const uploadFiles = async () => {
		setIsPending(true)
		setError(null)
		setBytes(0)

		const blobServiceClient = new BlobServiceClient(data.blobConnectionString)

		const containerClient = blobServiceClient.getContainerClient('memes')
		/*
		const t = []
		for await (const item of containerClient.listBlobsFlat()) {
			t.push(item)
		}
		setList(t)
*/
		for (const file of files) {
			const blockBlobClient = containerClient.getBlockBlobClient(file.name)
			await blockBlobClient.uploadData(file, {
				blobHTTPHeaders: {
					blobContentType: file.type,
				},
				onProgress: (ev) => {
					setBytes(ev.loadedBytes)
				},
			})
		}

		try {
		} catch (error: unknown) {
			setError((error as Error).message)
		} finally {
			setIsPending(false)
			setFiles([])
			imgRef.current && (imgRef.current.value = '')
		}
	}

	return (
		<div>
			<p>Uploaded {bytes} bytes</p>
			<input
				ref={imgRef}
				type="file"
				multiple
				onChange={handleChange}
				disabled={isPending}
				accept="image/*"
			/>
			<button onClick={uploadFiles} disabled={isPending}>
				{isPending ? 'Uploading...' : 'Upload Files'}
			</button>
			{error && <p style={{ color: 'red' }}>Error: {error}</p>}

			{files.length > 0 && <pre>{JSON.stringify(files[0].type, null, 2)}</pre>}

			<p>blobs</p>
		</div>
	)
}

export default UploaderPage
