/* eslint-disable max-len */

const t = require('tap')
const { resolve } = require('path')
const examples = require('./fixtures/examples')
const matchers = require('../lib/matchers')
const cli = require('..')
const { redactDynamicReplacement, redactFixedReplacement } = require('../lib/utils')
const { redact } = require('../lib/server')
const { examplesNonStringSensitive, examplesNonString } = require('./fixtures/complex')

const pick = (obj, ...keys) => {
  const res = {}
  for (const key of keys) {
    if (!obj[key]) {
      throw new Error(`missing key: ${key}`)
    }
    res[key] = obj[key]
  }
  return res
}

/** these are example strings to redact */
const TEST_MATCHERS = {
  npmSecret: Object.entries(examples.NPM_SECRET).map(([key, value]) => ({ key, value })),
  jsonWebToken: Object.entries(examples.JSON_WEB_TOKEN).map(([key, value]) => ({ key, value })),
  authHeaderCore: Object.entries(examples.AUTH_HEADER_CORE).map(([key, value]) => ({ key, value })),
  authHeaderJwt: Object.entries(examples.AUTH_HEADER_JWT).map(([key, value]) => ({ key, value })),
  authHeaderNpm: Object.entries(examples.AUTH_HEADER_NPM).map(([key, value]) => ({ key, value })),
  httpUrlCore: Object.entries(examples.HTTP_URL_CORE).map(([key, value]) => ({ key, value })),
  httpUrlNpm: Object.entries(examples.HTTP_URL_NPM).map(([key, value]) => ({ key, value })),
  uuid: Object.entries(examples.UUID).map(([key, value]) => ({ key, value })),
  nonString: Object.entries(examplesNonString).map(([key, value]) => ({ key, value })),
  nonStringSensitve: Object.entries(examplesNonStringSensitive).map(([key, value]) => ({ key, value })),
}

const STRING_TEST_MATCHRS = pick(
  TEST_MATCHERS,
  'npmSecret', 'jsonWebToken', 'authHeaderCore', 'authHeaderJwt', 'authHeaderNpm', 'httpUrlCore', 'httpUrlNpm', 'uuid')
const OBJECT_TEST_MATCHERS = pick(TEST_MATCHERS, 'nonString', 'nonStringSensitve')

/** this is a common set of cases to put the examples in */
const TEST_CASES = {
  just: value => value,
  two: value => `${value} ${value}`,
  quotes: value => `"${value}"`,
  prefixedEqual: value => `=${value}`,
}

const matcherHandlers = (key, type) => ({
  [`${key}Replacement`]: ({ value }) => {
    return value.replace(matchers[type].pattern, matchers[type].replacement)
  },
  [`${key}Dynamic`]: ({ value }) => {
    return value.replace(matchers[type].pattern, redactDynamicReplacement())
  },
  [`${key}Fixed`]: ({ value }) => {
    return value.replace(matchers[type].pattern, redactFixedReplacement())
  },
})

const pickMatcherHandlers = (key) => {
  return pick(HANDLERS, `${key}Replacement`, `${key}Dynamic`, `${key}Fixed`)
}

/** these are functions to test the examples */
const HANDLERS = {
  cliRedact: ({ value }) => {
    return cli.redact(value)
  },
  cliRedactLog: ({ value }) => {
    return cli.redactLog(value)
  },
  serverRedact: ({ value }) => {
    return redact(value)
  },
  ...matcherHandlers('npmSecret', 'NPM_SECRET'),
  ...matcherHandlers('jsonWebToken', 'JSON_WEB_TOKEN'),
  ...matcherHandlers('uuid', 'UUID'),
  ...matcherHandlers('authHeader', 'AUTH_HEADER'),
  ...matcherHandlers('http', 'URL_MATCHER'),
}

const runner = (testMatchers, testCases, testHandlers) => async (t) => {
  t.snapshotFile = resolve(__dirname, `../tap-snapshots/test/suite/${t.name.toLowerCase().replaceAll(' ', '-')}.test.cjs`)
  for (const [matcherName, options] of Object.entries(testMatchers)) {
    t.test(matcherName, async t => {
      for (const { key, value } of options) {
        t.test(key, async t => {
          for (const [testCaseName, testCase] of Object.entries(testCases)) {
            t.test(testCaseName, async t => {
              for (const [handlerName, handler] of Object.entries(testHandlers)) {
                t.test(`${matcherName}/${key}/${testCaseName}/${handlerName}`, async t => {
                  t.matchSnapshot(handler({ value: testCase(value) }))
                })
              }
            })
          }
        })
      }
    })
  }
}

t.test('cli redact log', runner(STRING_TEST_MATCHRS, TEST_CASES, pick(HANDLERS, 'cliRedactLog')))
t.test('cli redact', runner(STRING_TEST_MATCHRS, TEST_CASES, pick(HANDLERS, 'cliRedact')))
t.test('server redact', runner(STRING_TEST_MATCHRS, TEST_CASES, pick(HANDLERS, 'serverRedact')))
t.test('server redact nonstring', runner(OBJECT_TEST_MATCHERS, pick(TEST_CASES, 'just'), pick(HANDLERS, 'serverRedact')))
t.test('matcher npm', runner(pick(STRING_TEST_MATCHRS, 'npmSecret'), TEST_CASES, pickMatcherHandlers('npmSecret')))
t.test('matcher jwt', runner(pick(STRING_TEST_MATCHRS, 'jsonWebToken'), TEST_CASES, pickMatcherHandlers('jsonWebToken')))
t.test('matcher uuid', runner(pick(STRING_TEST_MATCHRS, 'uuid'), TEST_CASES, pickMatcherHandlers('uuid')))
t.test('matcher auth', runner(pick(STRING_TEST_MATCHRS, 'authHeaderCore'), TEST_CASES, pickMatcherHandlers('authHeader')))
t.test('matcher url', runner(pick(STRING_TEST_MATCHRS, 'httpUrlCore'), TEST_CASES, pickMatcherHandlers('http')))
