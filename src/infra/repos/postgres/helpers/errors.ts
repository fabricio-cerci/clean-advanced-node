export class ConnectionNotFoundedError extends Error {
  constructor () {
    super('No connection was found')
    this.name = 'ConnectionNotFoundedError'
  }
}

export class TransactionNotFoundedError extends Error {
  constructor () {
    super('No transaction was found')
    this.name = 'TransactionNotFoundedError'
  }
}
