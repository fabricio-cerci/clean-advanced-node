import { FacebookApi, AxiosHttpClient } from '@/infra/gateways'
import { env } from '@/main/config/env'

describe('Facebook Api Integration Tests', () => {
  let sut: FacebookApi
  let axiosClient: AxiosHttpClient

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )
  })

  it('should return a Facebook User if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: 'EAAWYJfLgq4wBAKQdKaGGFOZBvy5OZA0SGhSM3vNRhiUMcxamhr7gSr6ZBPYyYNUgxQlNu7a5VUj4vTNPoptkUArC7rIGb7QZColoueRd5JgqAZAvZCdEzjMysY2345XSFiuUNxZCRqjDlU7N6t1WF6C5leF22x5Y5u6UoGkiGZBP8ckLNJKhC4pxQdwzT2bsFBfD7jdYvlqyFQZDZD' })

    expect(fbUser).toEqual({
      facebookId: '104913568855260',
      email: 'fabricio_wxvhugi_teste@tfbnw.net',
      name: 'Fabricio Teste'
    })
  })

  it('should return undefined if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid_token' })

    expect(fbUser).toBeUndefined()
  })
})
