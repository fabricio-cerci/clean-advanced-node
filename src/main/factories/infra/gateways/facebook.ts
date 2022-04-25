import { makeAxiosHttpClient } from '@/main/factories/infra/gateways'
import { env } from '@/main/config/env'
import { FacebookApi } from '@/infra/gateways'

export const makeFacebookApi = (): FacebookApi => {
  return new FacebookApi(
    makeAxiosHttpClient(),
    env.facebookApi.clientId,
    env.facebookApi.clientSecret
  )
}
