const { serializedError, safeError, safeThrow } = require('../lib/error')
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

t.test('serializedError', async t => {
  await t.test('native error', async t => {
    const exampleError = new Error('hello world')

    t.same(
      serializedError(exampleError),
      {
        errorType: 'Error',
        message: 'hello world',
        stack: exampleError.stack,
      },
      'should serialize error'
    )
  })

  await t.test('attached error', async t => {
    const exampleError = new Error('hello world')
    exampleError.code = 'E12345'
    exampleError.statusCode = 404

    t.same(
      serializedError(exampleError),
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
      serializedError(exampleError),
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
      serializedError(exampleError),
      {
        errorType: 'CustomError',
        message: 'hello world',
        stack: exampleError.stack,
      },
      'should serialize error'
    )
  })

  await t.test('non-error', async t => {
    const exampleError = 'hello world'
    const result = serializedError(exampleError)
    t.same(result.errorType, 'Error', 'should serialize error')
    t.same(result.message, 'attempted to serialize a non-error object', 'should serialize message')
  })

  await t.test('no-message no-stack', async t => {
    const exampleError = new NoMessageNoStackError('hello world')
    t.same(
      serializedError(exampleError),
      {
        errorType: 'NoMessageNoStackError',
      },
      'should serialize error'
    )
  })
})

t.test('safeError', async t => {
  await t.test('native error', async t => {
    const badError = new Error('hello world')
    Object.assign(badError, {
      sensitive: 'sensitive data',
    })
    const goodError = safeError(badError)

    t.same(badError.sensitive, 'sensitive data', 'should have sensitive field')
    t.same(goodError.sensitive, undefined, 'should not have sensitive field')
  })
  await t.test('custom error', async t => {
    const badError = new CustomError('hello world', 'sensitive data')
    const goodError = safeError(badError)

    t.same(badError.sensitive, 'sensitive data', 'should have sensitive field')
    t.same(goodError.sensitive, undefined, 'should not have sensitive field')
  })
})

t.test('safeThrow', async t => {
  const badError = new CustomError('hello world', 'sensitive data')
  t.same(badError.sensitive, 'sensitive data', 'should have sensitive field')
  try {
    await safeThrow(async () => {
      throw badError
    })
    t.fail('should throw')
  } catch (goodError) {
    t.same(goodError.sensitive, undefined, 'should not have sensitive field')
  }
})
