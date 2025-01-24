const t = require('tap')
const { redact } = require('../lib/server')
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
