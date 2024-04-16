/* eslint-disable max-len */

const server = require('../lib/server')
const t = require('tap')

t.throws(() => {
  server.redact(123)
})

t.throws(() => {
  server.redact({})
})

t.same(
  server.redact(''),
  ''
)
