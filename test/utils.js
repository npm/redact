/* eslint-disable max-len */

const t = require('tap')
const { asterisk, redactUrlPassword } = require('../lib/utils')
const examples = require('./fixtures/examples')
const { deepMap } = require('../lib/deep-map')

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

const sample = { a: { b: { c: 1 } } }
t.same(deepMap(sample), sample)
t.same(deepMap(sample, (v) => v), sample)
t.same(deepMap(sample, (v) => v, '$'), sample)
t.same(deepMap(sample, (v) => v, '$', new Set()), sample)