/* eslint-disable max-len */

const { runSuite } = require('./fixtures/runner')
const cli = require('../lib/index')
const examples = require('./fixtures/examples')
const matchers = require('../lib/matchers')
const server = require('../lib/server')

const allExamples = [
  ...Object.entries(examples.NPM_SECRET).map(([key, value]) => ({ example: { key, value }, type: matchers.NPM_SECRET.type })),
  ...Object.entries(examples.JSON_WEB_TOKEN).map(([key, value]) => ({ example: { key, value }, type: matchers.JSON_WEB_TOKEN.type })),
  ...Object.entries(examples.AUTH_HEADER_CORE).map(([key, value]) => ({ example: { key, value }, type: matchers.AUTH_HEADER.type })),
  ...Object.entries(examples.AUTH_HEADER_JWT).map(([key, value]) => ({ example: { key, value }, type: matchers.AUTH_HEADER.type })),
  ...Object.entries(examples.AUTH_HEADER_NPM).map(([key, value]) => ({ example: { key, value }, type: matchers.AUTH_HEADER.type })),
  ...Object.entries(examples.HTTP_URL_CORE).map(([key, value]) => ({ example: { key, value }, type: matchers.HTTP_URL.type })),
  ...Object.entries(examples.HTTP_URL_NPM).map(([key, value]) => ({ example: { key, value }, type: matchers.HTTP_URL.type })),
  ...Object.entries(examples.UUID).map(([key, value]) => ({ example: { key, value }, type: matchers.UUID.type })),
]

runSuite({ file: 'matchers.json' }, allExamples, ({ value, type }) => {
  const matcher = matchers[type]
  return value.replace(matcher.pattern, matcher.replacement)
})
runSuite({ file: 'cli-redact.json' }, allExamples, ({ value }) => cli.redact(value))
runSuite({ file: 'cli-redact-log.json' }, allExamples, ({ value }) => cli.redactLog(value))
runSuite({ file: 'server-redact.json' }, allExamples, ({ value }) => server.redact(value))
