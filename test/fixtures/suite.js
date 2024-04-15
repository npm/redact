/* eslint-disable max-len */
const fixtureExamples = require('./examples')
const cli = require('../..')
const server = require('../../lib/server')
const matchers = require('../../lib/matchers')

/** these are example strings to redact */
const examples = {
  npmSecret: Object.entries(fixtureExamples.NPM_SECRET).map(([key, value]) => ({ example: { key, value }, type: matchers.NPM_SECRET.type })),
  jsonWebToken: Object.entries(fixtureExamples.JSON_WEB_TOKEN).map(([key, value]) => ({ example: { key, value }, type: matchers.JSON_WEB_TOKEN.type })),
  authHeaderCore: Object.entries(fixtureExamples.AUTH_HEADER_CORE).map(([key, value]) => ({ example: { key, value }, type: matchers.AUTH_HEADER.type })),
  authHeaderJwt: Object.entries(fixtureExamples.AUTH_HEADER_JWT).map(([key, value]) => ({ example: { key, value }, type: matchers.AUTH_HEADER.type })),
  authHeaderNpm: Object.entries(fixtureExamples.AUTH_HEADER_NPM).map(([key, value]) => ({ example: { key, value }, type: matchers.AUTH_HEADER.type })),
  httpUrlCore: Object.entries(fixtureExamples.HTTP_URL_CORE).map(([key, value]) => ({ example: { key, value }, type: matchers.HTTP_URL.type })),
  httpUrlNpm: Object.entries(fixtureExamples.HTTP_URL_NPM).map(([key, value]) => ({ example: { key, value }, type: matchers.HTTP_URL.type })),
  uuid: Object.entries(fixtureExamples.UUID).map(([key, value]) => ({ example: { key, value }, type: matchers.UUID.type })),
}

/** this is a common set of cases to put the examples in */
const testCases = {
  just: value => value,
  two: value => `${value} ${value}`,
  quotes: value => `"${value}"`,
  prefixedEqual: value => `=${value}`,
}

/** these are functions to test the examples */
const handlers = {
  matchers: ({ value, type }) => {
    const matcher = matchers[type]
    return value.replace(matcher.pattern, matcher.replacement)
  },
  cliRedact: ({ value }) => {
    return cli.redactLog(value)
  },
  cliRedactLog: ({ value }) => {
    return cli.redactLog(value)
  },
  serverRedact: ({ value }) => {
    return server.redact(value)
  },
}

module.exports = {
  examples,
  testCases,
  handlers,
}
