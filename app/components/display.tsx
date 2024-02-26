import { display } from './components.css'

export const Display = ({ children }: { children: React.ReactNode }) => (
	<h1 className={display}>{children}</h1>
)
