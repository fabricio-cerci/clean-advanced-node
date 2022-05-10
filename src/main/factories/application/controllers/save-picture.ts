import { Controller, SavePictureController } from '@/application/controllers'
import { makeChangeProfilePicture } from '../../domain/use-cases'
import { makePgTransactionController } from '../decorators'

export const makeSavePictureController = (): Controller => {
  const controller = new SavePictureController(makeChangeProfilePicture())
  return makePgTransactionController(controller)
}
