import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'kesavan.db.elephantsql.com',
  port: 5432,
  username: 'xsqqslza',
  password: 'pCh7roX7Xl8XFXUiOxs-uv5P-OJ2iq8d',
  database: 'xsqqslza',
  entities: ['dist/infra/postgres/entities/index.js']
}
