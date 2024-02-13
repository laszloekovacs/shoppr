import { createContext, Provider } from 'react'

export const UploadContext = createContext({
	upload: () => {
		console.log('sending')
	},
})

const UploadProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<p>upload context</p>
			<UploadContext.Provider value={{ upload: () => {} }}>
				{children}
			</UploadContext.Provider>
		</>
	)
}

export default UploadProvider
