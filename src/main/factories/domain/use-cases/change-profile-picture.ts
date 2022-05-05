import { setupChangeProfilePicture, ChangeProfilePicture } from '@/domain/use-cases'
import { makeAwsS3FileStorage, makeUniqueId } from '../../infra/gateways'
import { makePgUserProfileRepo } from '../../infra/repos'

export const makeChangeProfilePicture = (): ChangeProfilePicture => {
  return setupChangeProfilePicture(
    makeAwsS3FileStorage(),
    makeUniqueId(),
    makePgUserProfileRepo()
  )
}
