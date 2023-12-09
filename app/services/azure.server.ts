import { DefaultAzureCredential } from '@azure/identity'
import { SecretClient } from '@azure/keyvault-secrets'

export const initKeyvault = () => {
	const credentials = new DefaultAzureCredential()

	if (!credentials) {
		throw new Error('wrong azure credentials')
	}

	const client = new SecretClient(process.env.AZURE_KEYVAULT_URI!, credentials)

	if (!client) {
		throw new Error(
			'Error initializing keyvault for url: ' + process.env.AZURE_KEYVAULT_URI,
		)
	}

	return client
}

/* init at module parsing */
const client = initKeyvault()

export const getKeyFromKeyVault = (key: string) => {
	const secret = client.getSecret(key)

	if (!secret) {
		throw new Error('Error getting secret from keyvault')
	} else {
		console.log('🔐 retrieved secret from keyvault: ' + key)
	}

	return secret
}
