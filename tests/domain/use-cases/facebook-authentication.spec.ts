import { LoadFacebookUserApi } from '@/domain/contracts/apis'
import { TokenGenerator } from '@/domain/contracts/crypto'
import { SaveFacebookAccountRepository, LoadUserAccountRepository } from '@/domain/contracts/repos'
import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/use-cases'
import { AuthenticationError } from '@/domain/entities/errors'
import { AccessToken, FacebookAccount } from '@/domain/entities'

import { mocked } from 'ts-jest/utils'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/domain/entities/facebook-account')

describe('FacebookAuthentication', () => {
  let facebookApi: MockProxy<LoadFacebookUserApi>
  let crypto: MockProxy<TokenGenerator>
  let userAccountRepo: MockProxy<LoadUserAccountRepository & SaveFacebookAccountRepository>
  let sut: FacebookAuthentication
  let token: string

  beforeAll(() => {
    token = 'any_token'
    facebookApi = mock()
    userAccountRepo = mock()
    crypto = mock()
    crypto.generateToken.mockResolvedValue('any_generated_token')
    facebookApi.loadUser.mockResolvedValue({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
    userAccountRepo.load.mockResolvedValue(undefined)
    userAccountRepo.saveWithFacebook.mockResolvedValue({
      id: 'any_account_id'
    })
  })

  beforeEach(() => {
    sut = setupFacebookAuthentication(
      facebookApi,
      userAccountRepo,
      crypto
    )
  })

  test('should call LoadFacebookUserApi with correct params', async () => {
    await sut({ token })

    expect(facebookApi.loadUser).toHaveBeenCalledWith({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  test('should return Authentication Error when LoadFacebookUserApi returns undefined', async () => {
    facebookApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  test('should call LoadUserAccountRepo when LoadFacebookUserApi returns data', async () => {
    await sut({ token })

    expect(userAccountRepo.load).toHaveBeenCalledWith({ email: 'any_fb_email' })
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  test('should call SaveFacebookAccountRepository with FacebookAccount', async () => {
    const FacebookAccountStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
    mocked(FacebookAccount).mockImplementation(FacebookAccountStub)

    await sut({ token })

    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({ any: 'any' })
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  })

  test('should call TokenGenerator with correct params', async () => {
    await sut({ token })

    expect(crypto.generateToken).toHaveBeenCalledWith({
      key: 'any_account_id',
      expirationInMs: AccessToken.expirationInMs
    })
    expect(crypto.generateToken).toHaveBeenCalledTimes(1)
  })

  test('should return an AccessToken on success', async () => {
    const authResult = await sut({ token })

    expect(authResult).toEqual(new AccessToken('any_generated_token'))
  })

  test('should rethrow if LoadFacebookUserApi throws', async () => {
    facebookApi.loadUser.mockRejectedValueOnce(new Error('fb_error'))

    const promise = sut({ token })

    await expect(promise).rejects.toThrow(new Error('fb_error'))
  })

  test('should rethrow if LoadUserAccountRepository throws', async () => {
    userAccountRepo.load.mockRejectedValueOnce(new Error('load_error'))

    const promise = sut({ token })

    await expect(promise).rejects.toThrow(new Error('load_error'))
  })

  test('should rethrow if SaveFacebookAccountRepository throws', async () => {
    userAccountRepo.saveWithFacebook.mockRejectedValueOnce(new Error('save_error'))

    const promise = sut({ token })

    await expect(promise).rejects.toThrow(new Error('save_error'))
  })

  test('should rethrow if TokenGenerator throws', async () => {
    crypto.generateToken.mockRejectedValueOnce(new Error('token_error'))

    const promise = sut({ token })

    await expect(promise).rejects.toThrow(new Error('token_error'))
  })
})
