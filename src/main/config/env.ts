export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? 'algum_id',
    clientSecret: process.env.FB_CLIENT_SECRET ?? 'algum_secret'
  },
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? '12h312gyh312gy3sa'
}
