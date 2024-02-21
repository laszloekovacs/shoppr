// mongodb
const { MONGODB_CONNECTION_STRING, MONGODB_DATABASE } = process.env

// stripe
const { STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY } = process.env

// auth0
const {
	AUTH0_CLIENT_ID,
	AUTH0_CLIENT_SECRET,
	AUTH0_DOMAIN,
	AUTH0_CALLBACK_URL,
	AUTH0_LOGOUT_URL,
	AUTH0_SECRET,
	AUTH0_BASE_URL,
} = process.env

// azure
const { AZURE_BLOB_STORAGE } = process.env

export const constants = {
	mongodb: {
		connectionString: MONGODB_CONNECTION_STRING as string,
		database: MONGODB_DATABASE as string,
	},
	stripe: {
		secretKey: STRIPE_SECRET_KEY as string,
		publishableKey: STRIPE_PUBLISHABLE_KEY as string,
	},
	auth0: {
		clientId: AUTH0_CLIENT_ID as string,
		clientSecret: AUTH0_CLIENT_SECRET as string,
		domain: AUTH0_DOMAIN as string,
		callbackUrl: AUTH0_CALLBACK_URL as string,
		logoutUrl: AUTH0_LOGOUT_URL as string,
		secret: AUTH0_SECRET as string,
		baseUrl: AUTH0_BASE_URL as string,
	},
	azure: {
		blobStorage: AZURE_BLOB_STORAGE as string,
	},
}

for (const [key, value] of Object.entries(constants)) {
	if (!value) {
		throw new Error(`Missing ${key}`)
	}
}
