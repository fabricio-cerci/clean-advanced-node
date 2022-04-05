import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('Facebook Api Integration Tests', () => {
  it('should return a Facebook User if token is valid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )

    const fbUser = await sut.loadUser({ token: 'EAAWYJfLgq4wBACxYObujahU5w8CCcNbzMbvOIWlIxJhhCfp7RsS3XRwxQGq8tZAxl6TAvgrxqG5a6upxldmTQZAobW6HRXsSUZAI4qP4Ua53Ewmd85OEgQXCyTX9kBrKc0hZCQ6D81WSdyHFSo3QKx9OTXqWldWh8uOZB0UZA0YzS4xqL6hQCboum3Ov5niYqvH0JIQJ57fAZDZD' })

    expect(fbUser).toEqual({
      facebookId: '104913568855260',
      email: 'fabricio_wxvhugi_teste@tfbnw.net',
      name: 'Fabricio Teste'
    })
  })

  it('should return undefined if token is invalid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )

    const fbUser = await sut.loadUser({ token: 'invalid_token' })

    expect(fbUser).toBeUndefined()
  })
})
