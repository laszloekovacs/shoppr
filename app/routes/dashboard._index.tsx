import { Link } from '@remix-run/react'

export const handle = {
	breadcrumb: () => <Link to="/dashboard">Some Route</Link>,
}

const DashboardIndexPage = () => {
	return <div>DashboardIndexPage</div>
}

export default DashboardIndexPage
