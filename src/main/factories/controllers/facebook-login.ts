import { makeFacebookAuthenticationService } from '@/main/factories/services'
import { FacebookLoginController } from '@/application/controllers'

export const makeFacebookLoginController = (): FacebookLoginController => {
  return new FacebookLoginController(
    makeFacebookAuthenticationService()
  )
}
