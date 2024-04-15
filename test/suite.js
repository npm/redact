/* eslint-disable max-len */

const t = require('tap')
const { resolve } = require('path')
const examples = require('./fixtures/examples')
const matchers = require('../lib/matchers')
const cli = require('..')
const server = require('../lib/server')

const pick = (obj, ...keys) => {
  const res = {}
  for (const key of keys) {
    res[key] = obj[key]
  }
  return res
}

/** these are example strings to redact */
const TEST_MATCHERS = {
  npmSecret: Object.entries(examples.NPM_SECRET).map(([key, value]) => ({ key, value, type: matchers.NPM_SECRET.type })),
  jsonWebToken: Object.entries(examples.JSON_WEB_TOKEN).map(([key, value]) => ({ key, value, type: matchers.JSON_WEB_TOKEN.type })),
  authHeaderCore: Object.entries(examples.AUTH_HEADER_CORE).map(([key, value]) => ({ key, value, type: matchers.AUTH_HEADER.type })),
  authHeaderJwt: Object.entries(examples.AUTH_HEADER_JWT).map(([key, value]) => ({ key, value, type: matchers.AUTH_HEADER.type })),
  authHeaderNpm: Object.entries(examples.AUTH_HEADER_NPM).map(([key, value]) => ({ key, value, type: matchers.AUTH_HEADER.type })),
  httpUrlCore: Object.entries(examples.HTTP_URL_CORE).map(([key, value]) => ({ key, value, type: matchers.HTTP_URL.type })),
  httpUrlNpm: Object.entries(examples.HTTP_URL_NPM).map(([key, value]) => ({ key, value, type: matchers.HTTP_URL.type })),
  uuid: Object.entries(examples.UUID).map(([key, value]) => ({ key, value, type: matchers.UUID.type })),
}

/** this is a common set of cases to put the examples in */
const TEST_CASES = {
  just: value => value,
  two: value => `${value} ${value}`,
  quotes: value => `"${value}"`,
  prefixedEqual: value => `=${value}`,
}

/** these are functions to test the examples */
const HANDLERS = {
  matchers: ({ value, type }) => {
    const matcher = matchers[type]
    return value.replace(matcher.pattern, matcher.replacement)
  },
  cliRedact: ({ value }) => {
    return cli.redact(value)
  },
  cliRedactLog: ({ value }) => {
    return cli.redactLog(value)
  },
  serverRedact: ({ value }) => {
    return server.redact(value)
  },
}

const runner = (testMatchers, testCases, testHandlers) => async (t) => {
  t.snapshotFile = resolve(__dirname, `../tap-snapshots/test/suite/${t.name.replaceAll(' ', '-')}.js.test.cjs`)

  for (const [matcherName, matcher] of Object.entries(testMatchers)) {
    t.test(matcherName, async t => {
      for (const { key, value, type } of matcher) {
        t.test(key, async t => {
          for (const [testCaseName, testCase] of Object.entries(testCases)) {
            t.test(testCaseName, async t => {
              for (const [handlerName, handler] of Object.entries(testHandlers)) {
                t.test(handlerName, async t => {
                  t.matchSnapshot(handler({ type, value: testCase(value) }))
                })
              }
            })
          }
        })
      }
    })
  }
}

t.test('cli redact log', runner(
  TEST_MATCHERS,
  TEST_CASES,
  pick(HANDLERS, 'cliRedactLog')
))

t.test('cli redact', runner(
  TEST_MATCHERS,
  TEST_CASES,
  pick(HANDLERS, 'cliRedact')
))

t.test('matchers', runner(
  TEST_MATCHERS,
  TEST_CASES,
  pick(HANDLERS, 'matchers')
))

t.test('server redact', runner(
  TEST_MATCHERS,
  TEST_CASES,
  pick(HANDLERS, 'serverRedact')
))
