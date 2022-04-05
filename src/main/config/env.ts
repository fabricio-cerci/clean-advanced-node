export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '1574663639575436',
    clientSecret: process.env.FB_CLIENT_SECRET ?? 'a01598a10ee17777b6d467a20a453c4e'
  },
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? '12h312gyh312gy3sa'
}
