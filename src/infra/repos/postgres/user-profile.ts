import { LoadUserProfile, SaveUserPicture } from '@/domain/contracts/repos'
import { PgUser } from '@/infra/repos/postgres/entities'
import { PgRepository } from '@/infra/repos/postgres'

export class PgUserProfileRepository extends PgRepository implements SaveUserPicture, LoadUserProfile {
  async savePicture ({ id, initials, pictureUrl }: SaveUserPicture.Input): Promise<void> {
    const pgUserRepo = this.getRepository(PgUser)
    await pgUserRepo.update({ id: parseInt(id) }, { pictureUrl, initials })
  }

  async load ({ id }: LoadUserProfile.Input): Promise<LoadUserProfile.Output> {
    const pgUserRepo = this.getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ id: parseInt(id) })
    if (pgUser !== undefined) return { name: pgUser.name ?? undefined }
  }
}
