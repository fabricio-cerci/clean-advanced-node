export class ConnectionNotFoundedError extends Error {
  constructor () {
    super('No connection was found')
    this.name = 'ConnectionNotFoundedError'
  }
}
