/* eslint-disable max-len */
const matchers = require('./matchers')
const { Redact } = require('./utils')

const redact = new Redact([
  matchers.NPM_SECRET,
  matchers.AUTH_HEADER,
  matchers.JSON_WEB_TOKEN,
  { ...matchers.HTTP_URL, replacement: matchers.HTTP_URL.password },
])

module.exports = {
  redact: redact.strict.bind(redact),
  redactSafe: redact.safe.bind(redact),
  redactPreserveType: redact.preserveType.bind(redact),
}
