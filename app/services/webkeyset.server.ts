import yup from 'yup'

/**
 *
 * see https://auth0.com/blog/navigating-rs256-and-jwks/
 */

export const webKeySetSchema = yup.object({
  keys: yup
    .array(
      yup
        .object({
          alg: yup.string().required(),
          e: yup.string().required(),
          kid: yup.string().required(),
          kty: yup.string().required(),
          n: yup.string().required(),
          use: yup.string().required(),
          x5c: yup.array(yup.string().required()).required(),
          x5t: yup.string().required(),
        })
        .required()
    )
    .required(),
})

export type WebKeySetSchema = yup.InferType<typeof webKeySetSchema>

export const isWebKeySetSchema = (data: any): data is WebKeySetSchema => {
  return webKeySetSchema.isValidSync(data)
}
