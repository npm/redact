const t = require('tap')
const examples = require('./fixtures/examples')
const { deepMap } = require('../lib/deep-map')
const {
  asterisk,
  redactUrlPassword,
  redactMatchers,
  redactUrlHostnameMatcher,
  redactUrlSearchParamsMatcher,
  redactUrlMatcher,
  redactUrlPasswordMatcher,
  redactUrlReplacement,
} = require('../lib/utils')

t.same(
  redactUrlPassword('hello'),
  'hello'
)

t.same(
  redactUrlPassword(examples.HTTP_URL_CORE.http_com_pass_path_6),
  `http://username:${asterisk()}@example.io/${examples.test6}`
)

t.same(
  redactUrlPassword(examples.HTTP_URL_CORE.http_com_up_same_6),
  `http://${examples.test6}:${asterisk()}@example.io`
)

t.same(redactUrlPassword(1), 1)

t.same(redactMatchers((v) => {
  if (typeof v === 'string') {
    return v
  }
  return v.toString()
})(1), '1')

const sample = { a: { b: { c: 1 } } }
t.same(deepMap(sample), sample)
t.same(deepMap(sample, (v) => v), sample)
t.same(deepMap(sample, (v) => v, ['$']), sample)
t.same(deepMap(sample, (v) => v, ['$'], new Set()), sample)

t.test('deepMap error', async (t) => {
  const error = new Error('test')
  error.custom = 'custom'
  error.code = '1234'
  error.statusCode = 500
  const result = deepMap(error)
  t.same(result.err.errorType, 'Error')
  t.same(result.err.message, 'test')
  t.same(result.err.custom, undefined)
  t.same(result.err.code, '1234')
  t.same(result.err.statusCode, 500)
})

t.test('deepMap error nested', async (t) => {
  const error = new Error('test')
  error.custom = 'custom'
  error.code = '1234'
  error.statusCode = 500
  const result = deepMap({ meow: error })
  t.same(result.meow.errorType, 'Error')
  t.same(result.meow.message, 'test')
  t.same(result.meow.custom, undefined)
  t.same(result.meow.code, '1234')
  t.same(result.meow.statusCode, 500)
})

t.test('deepMap error nested rm key err', async (t) => {
  const error = new Error('test')
  error.custom = 'custom'
  error.code = '1234'
  error.statusCode = 500
  const result = deepMap({ err: error })
  t.same(result.err.errorType, 'Error')
  t.same(result.err.message, 'test')
  t.same(result.err.custom, undefined)
  t.same(result.err.code, '1234')
  t.same(result.err.statusCode, 500)
})

t.test('deepMap error nested rm key error', async (t) => {
  const error = new Error('test')
  error.custom = 'custom'
  error.code = '1234'
  error.statusCode = 500
  const result = deepMap({ error })
  t.same(result.error.errorType, 'Error')
  t.same(result.error.message, 'test')
  t.same(result.error.custom, undefined)
  t.same(result.error.code, '1234')
  t.same(result.error.statusCode, 500)
})

t.test('deepMap error collision', async (t) => {
  const result = deepMap({ error: new Error('test'), err: new Error('test 2') })
  t.same(result.error.errorType, 'Error')
  t.same(result.error.message, 'test')
  t.same(result.error.custom, undefined)

  t.same(result.err.errorType, 'Error')
  t.same(result.err.message, 'test 2')
  t.same(result.err.custom, undefined)
})

t.same(deepMap(Buffer.from('hello')), '[unable to log instanceof buffer]')

t.test('error with buffer', async () => {
  const buffer = Buffer.from('hello')
  const error = new Error('meow')
  error.buffer = buffer
  const result = deepMap(error)
  t.same(result.err.errorType, 'Error')
  t.same(result.err.message, 'meow')
  t.same(result.err.buffer, undefined)
})

t.same(deepMap(new TextEncoder().encode('hello')), '[unable to log instanceof Uint8Array]')

const redactUrl = redactMatchers(
  redactUrlMatcher(
    redactUrlHostnameMatcher({ hostname: 'example.com', replacement: 'example.net' }),
    redactUrlSearchParamsMatcher({ param: 'warthog', replacement: '[REDACTED]' })
  )
)

t.same(
  redactUrl('http://example.com/?warthog=123&giraffe=456'),
  'http://example.net/?warthog=[REDACTED]&giraffe=456'
)

const emptyRedactUrl = redactMatchers(
  redactUrlMatcher(
    redactUrlHostnameMatcher(),
    redactUrlSearchParamsMatcher()
  )
)

t.same(
  emptyRedactUrl('http://example.com/?warthog=123&giraffe=456'),
  'http://example.com/?warthog=123&giraffe=456'
)

/**
 * This test is to show that only redactMatchers with a nested redactUrlMatcher
 * will capture multiple URLs in a string and none of the other permutations do.
 * All other permutations break when the entered string isn't exactly a URL. The
 * CLI support matching without urls as exact strings without using a regex
 * first to find them within a string.
 */

const a = redactMatchers(redactUrlMatcher(redactUrlPasswordMatcher()))
const b = redactUrlReplacement(redactUrlPasswordMatcher())
const c = redactMatchers(redactUrlPasswordMatcher())
const d = redactUrlPassword

const arg = 'https://user:pass@example.com'
t.same(
  [a(arg), b(arg), c(arg), d(arg)],
  [
    'https://user:********@example.com',
    'https://user:********@example.com',
    'https://user:********@example.com',
    'https://user:********@example.com',
  ]
)

t.same(
  [a(`${arg} ${arg}`), b(`${arg} ${arg}`), c(`${arg} ${arg}`), d(`${arg} ${arg}`)],
  [
    'https://user:********@example.com https://user:********@example.com',
    'https://user:pass@example.com https://user:pass@example.com',
    'https://user:pass@example.com https://user:pass@example.com',
    'https://user:pass@example.com https://user:pass@example.com',
  ]
)
