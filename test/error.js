const { serializeError } = require('../lib/error')
const t = require('tap')

class CustomError extends Error {
  constructor (message, data) {
    super(message)
    this.sensitive = data
  }
}

class NoMessageNoStackError extends Error {
  constructor (message) {
    super(message)
    delete this.message
    delete this.stack
  }
}

t.test('serializeError', async t => {
  await t.test('native error', async t => {
    const exampleError = new Error('hello world')

    t.same(
      serializeError(exampleError),
      {
        errorType: 'Error',
        message: 'hello world',
        stack: exampleError.stack,
      },
      'should serialize error'
    )
  })

  await t.test('attached error (status not statusCode)', async t => {
    const exampleError = new Error('hello world')
    exampleError.code = 'E12345'
    exampleError.status = 404

    t.same(
      serializeError(exampleError),
      {
        errorType: 'Error',
        message: 'hello world',
        stack: exampleError.stack,
        code: 'E12345',
        statusCode: 404,
      },
      'should serialize error with code / statusCode'
    )
  })

  await t.test('attached error', async t => {
    const exampleError = new Error('hello world')
    exampleError.code = 'E12345'
    exampleError.statusCode = 404

    t.same(
      serializeError(exampleError),
      {
        errorType: 'Error',
        message: 'hello world',
        stack: exampleError.stack,
        code: 'E12345',
        statusCode: 404,
      },
      'should serialize error with code / statusCode'
    )
  })

  await t.test('assigned error', async t => {
    const exampleError = new Error('hello world')
    Object.assign(exampleError, {
      code: 'E12345',
      statusCode: 404,
    })

    t.same(
      serializeError(exampleError),
      {
        errorType: 'Error',
        message: 'hello world',
        stack: exampleError.stack,
        code: 'E12345',
        statusCode: 404,
      },
      'should serialize error with code / statusCode'
    )
  })

  await t.test('custom error', async t => {
    const exampleError = new CustomError('hello world', 'sensitive data')
    t.same(
      serializeError(exampleError),
      {
        errorType: 'CustomError',
        message: 'hello world',
        stack: exampleError.stack,
      },
      'should serialize error'
    )
  })

  await t.test('no-message no-stack', async t => {
    const exampleError = new NoMessageNoStackError('hello world')
    t.same(
      serializeError(exampleError),
      {
        errorType: 'NoMessageNoStackError',
      },
      'should serialize error'
    )
  })

  await t.test('undefined', async t => {
    const results = serializeError(undefined)
    t.same(results.errorType, 'Error', 'should serialize error')
    t.same(results.message, 'attempted to serialize a non-error, undefined undefined', 'should serialize message')
  })

  await t.test('date', async t => {
    const results = serializeError(new Date())
    t.same(results.errorType, 'Error', 'should serialize error')
    t.same(results.message, 'attempted to serialize a non-error, object Date', 'should serialize message')
  })

  await t.test('string', async t => {
    const results = serializeError('hello world')
    t.same(results.errorType, 'Error', 'should serialize error')
    t.same(results.message, 'attempted to serialize a non-error, string String, "hello world"', 'should serialize message')
  })
})
