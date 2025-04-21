const t = require('tap')
const { serializeError } = require('../lib/error')
const { redact, redactError, redactThrow } = require('../lib/server')
const matchers = require('../lib/matchers')
const examples = require('./fixtures/examples')

t.test('redact', async t => {
  await t.test('error has npm secret in message', async t => {
    const error = new Error(`message contains npm secret: ${examples.NPM_SECRET.npm_36}`)
    t.same(error.message, `message contains npm secret: ${examples.NPM_SECRET.npm_36}`)
    const output = redact({ error })
    t.same(output, {
      error: {
        errorType: 'Error',
        message: `message contains npm secret: ${matchers.NPM_SECRET.replacement}`,
        stack: error.stack.replace(examples.NPM_SECRET.npm_36, matchers.NPM_SECRET.replacement),
      },
    })
  })
  await t.test('error has npm secret in statusCode', async t => {
    const x = new Error(`message`)
    const error = Object.assign(x, { statusCode: examples.NPM_SECRET.npm_36 })
    const output = redact({ error })
    t.same(output, {
      error: {
        errorType: 'Error',
        message: `message`,
        stack: error.stack,
        statusCode: matchers.NPM_SECRET.replacement,
      },
    })
  })
})

class CustomError extends Error {
  constructor (message, data) {
    super(message)
    this.sensitive = data
  }
}

t.test('redactError', async t => {
  await t.test('native error', async t => {
    const badError = new Error('hello world')
    Object.assign(badError, {
      sensitive: 'sensitive data',
    })
    const goodError = redactError(badError)

    t.same(badError.sensitive, 'sensitive data', 'should have sensitive field')
    t.same(goodError.sensitive, undefined, 'should not have sensitive field')
  })
  await t.test('custom error', async t => {
    const badError = new CustomError('hello world', 'sensitive data')
    const goodError = redactError(badError)

    t.same(badError.sensitive, 'sensitive data', 'should have sensitive field')
    t.same(goodError.sensitive, undefined, 'should not have sensitive field')
  })

  await t.test('error w/ sensitive status', async t => {
    const badError = new Error('hello world')
    badError.status = examples.NPM_SECRET.npm_36
    const goodError = redactError(badError)
    t.same(badError.status, examples.NPM_SECRET.npm_36, 'should not have sensitive field')
    t.same(goodError.statusCode, matchers.NPM_SECRET.replacement, 'should not have sensitive field')
  })

  await t.test('redacts sensitive error.message', async t => {
    const badError = new Error(`npm token: ${examples.NPM_SECRET.npm_36}`)
    const goodError = redactError(badError)

    t.same(badError.message, `npm token: ${examples.NPM_SECRET.npm_36}`, 'should have message')
    t.same(goodError.message, `npm token: ${matchers.NPM_SECRET.replacement}`, 'should have message')
  })
})

t.test('redactThrow', async t => {
  await t.test('successfully throws error', async t => {
    const badError = new CustomError('hello world', 'sensitive data')
    t.same(badError.sensitive, 'sensitive data', 'should have sensitive field')

    const handler = async () => {
      throw badError
    }
    const safeHandler = redactThrow(handler)

    await t.rejects(safeHandler, { sensitive: undefined }, 'should not have sensitive field')
  })

  await t.test('invalid argument not function', async t => {
    t.throws(() => {
      redactThrow('hello world')
    }, { message: 'redactThrow expects a function' }, 'should throw with correct message')
  })

  await t.test('ensures args are passed down', async t => {
    const handler = async (a, b, c) => {
      if (a !== 1) {
        throw new Error('a is not 1')
      }
      if (b !== 2) {
        throw new Error('b is not 2')
      }
      if (c !== 3) {
        throw new Error('c is not 3')
      }
      return a + b + c
    }
    const safeHandler = redactThrow(handler)
    const result = await safeHandler(1, 2, 3)
    t.same(result, 6, 'should return correct')
  })
})

t.test('serialize a redactError', async t => {
  const badError = new CustomError('hello world', 'sensitive data')
  const goodError = redactError(badError)
  const serialized = serializeError(goodError)
  t.same(serialized.errorType, 'CustomError', 'should serialize error')
  t.same(serialized.message, 'hello world', 'should serialize message')
  t.same(serialized.stack, badError.stack, 'should serialize stack')
  t.same(goodError.stack, badError.stack, 'should serialize stack')
  t.same(serialized.sensitive, undefined, 'should not serialize sensitive data')
})

t.test('readcts header.cookie', async t => {
  const input = {
    headers: {
      cookie: examples.COOKIE,
    },
  }
  const output = redact(input)
  t.same(output, {
    headers: {
      cookie: matchers.DEEP_HEADER_COOKIE.replacement,
    },
  })
})
