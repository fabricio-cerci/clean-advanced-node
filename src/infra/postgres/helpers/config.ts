import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'kesavan.db.elephantsql.com',
  port: 5432,
  username: 'xsqqslza',
  password: 'alguma_senha',
  database: 'xsqqslza',
  entities: ['dist/infra/postgres/entities/index.js']
}
