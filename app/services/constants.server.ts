// mongodb
const { MONGODB_CONNECTION_STRING, MONGODB_DATABASE } = process.env

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
const { AZURE_BLOB_CONNECTION_STRING, AZURE_BLOB_CONTAINER } = process.env

// stripe
const { STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY } = process.env

export const constants = {
	// mongodb
	MONGODB_CONNECTION_STRING,
	MONGODB_DATABASE,

	// auth0
	AUTH0_CLIENT_ID,
	AUTH0_CLIENT_SECRET,
	AUTH0_DOMAIN,
	AUTH0_CALLBACK_URL,
	AUTH0_LOGOUT_URL,
	AUTH0_SECRET,
	AUTH0_BASE_URL,

	// azure
	AZURE_BLOB_CONNECTION_STRING,
	AZURE_BLOB_CONTAINER,

	// stripe
	STRIPE_SECRET_KEY,
	STRIPE_PUBLISHABLE_KEY,
}

for (const [key, value] of Object.entries(constants)) {
	if (!value) {
		throw new Error(`Missing ${key} evnironment variable`)
	}
}
