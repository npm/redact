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

  await t.test('attached error (status not statusCode)', async t => {
    const exampleError = new Error('hello world')
    exampleError.code = 'E12345'
    exampleError.status = 404

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

  await t.test('undefined', async t => {
    const results = serializedError(undefined)
    t.same(results.errorType, 'Error', 'should serialize error')
    t.same(results.message, 'attempted to serialize a non-error, undefined undefined', 'should serialize message')
  })

  await t.test('date', async t => {
    const results = serializedError(new Date())
    t.same(results.errorType, 'Error', 'should serialize error')
    t.same(results.message, 'attempted to serialize a non-error, object Date', 'should serialize message')
  })

  await t.test('string', async t => {
    const results = serializedError('hello world')
    t.same(results.errorType, 'Error', 'should serialize error')
    t.same(results.message, 'attempted to serialize a non-error, string String, "hello world"', 'should serialize message')
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
  await t.test('successfully throws error', async t => {
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
  t.test('invalid argument not function', async t => {
    try {
      await safeThrow('hello world')
      t.fail('should throw')
    } catch (error) {
      t.same(error.message, 'safeThrow expects a function', 'should throw with correct message')
    }
  })
})

t.test('serialize a safeError', async t => {
  const badError = new CustomError('hello world', 'sensitive data')
  const goodError = safeError(badError)
  const serialized = serializedError(goodError)
  t.same(serialized.errorType, 'CustomError', 'should serialize error')
  t.same(serialized.message, 'hello world', 'should serialize message')
  t.same(serialized.stack, goodError.stack, 'should serialize stack')
  t.same(serialized.sensitive, undefined, 'should not serialize sensitive data')
})
