/**
 * @jest-environment node
 */
import { SecretClient } from '@azure/keyvault-secrets'
import { DefaultAzureCredential } from '@azure/identity'
import 'dotenv/config'

describe('azure default credentials', () => {
    /**
     *
     */
    it('creates a default credential', () => {
        const credentials = new DefaultAzureCredential()

        expect(credentials).toBeTruthy()
        expect(credentials instanceof DefaultAzureCredential).toBe(true)
        //expect(cred).toMatchFileSnapshot('../__snapshots__/azure-cred.json')
    })

    /**
     *
     */
    it('can get a key from keyvault', async () => {
        const credentials = new DefaultAzureCredential()

        const client = new SecretClient(
            process.env.AZURE_KEYVAULT_URI!,
            credentials,
        )

        const mongo_uri = await client.getSecret('mongoConnectionString')

        expect(mongo_uri).toBeTruthy()
        expect(mongo_uri.value).toBeTruthy()
    })
})
