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
t.same(deepMap(sample, (v) => v, '$'), sample)
t.same(deepMap(sample, (v) => v, '$', new Set()), sample)

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
