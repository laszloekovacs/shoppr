import chalk from 'chalk'

export const config: Record<string, string | undefined> = {
  /* auth 0  */
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET!,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID!,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN!,
  AUTH0_REDIRECT_URI: process.env.AUTH0_REDIRECT_URI!,

  /* paypal */
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID!,
}

/**
 * Checks the configuration for any missing environment variables.
 * @return {void} - Does not return a value.
 */
export const checkConfig = () => {
  const missingEnvs: string[] = []

  /* loop trough keys, record missing keys */
  for (let key in config) {
    if (config.hasOwnProperty(key) && config[key] == undefined) {
      missingEnvs.push(key)
    }
  }

  if (missingEnvs.length > 0) {
    console.log(
      `${chalk.red('❌')} Undefined environment variables: ${missingEnvs.join(
        ', '
      )}`
    )
    throw new Error('Missing environment variables')
  }
}

/* check right away */
checkConfig()
