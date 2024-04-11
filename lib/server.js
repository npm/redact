/* eslint-disable max-len */
const matchers = require('./matchers')
const { createRedact } = require('./utils')

const redact = createRedact([
  matchers.NPM_SECRET,
  matchers.AUTH_HEADER,
  matchers.JSON_WEB_TOKEN,
  { ...matchers.HTTP_URL, replacement: matchers.HTTP_URL.password },
])

function redactSafe (message) {
  return redact(JSON.stringify(message))
}

module.exports = {
  redact,
  redactSafe,
}
