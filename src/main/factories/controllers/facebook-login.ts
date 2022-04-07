import { makeFacebookAuthentication } from '@/main/factories/use-cases'
import { FacebookLoginController } from '@/application/controllers'

export const makeFacebookLoginController = (): FacebookLoginController => {
  return new FacebookLoginController(
    makeFacebookAuthentication()
  )
}
