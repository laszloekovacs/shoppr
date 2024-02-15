import { createContext, Provider } from 'react'

export const UploadContext = createContext({
	upload: () => {
		console.log('sending')
	},
})

const UploadProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			style={{
				border: '3px solid rgba(126,80,0,0.2)',
			}}
		>
			<UploadContext.Provider value={{ upload: () => console.log() }}>
				{children}
			</UploadContext.Provider>
		</div>
	)
}

export default UploadProvider
