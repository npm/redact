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
  serverRedactSafe: ({ value }) => {
    return server.redactSafe(value)
  },
  serverRedactPreserveType: ({ value }) => {
    return server.redactPreserveType(value)
  },
}

const runner = (testMatchers, testCases, testHandlers) => async (t) => {
  t.snapshotFile = resolve(__dirname, `../tap-snapshots/test/suite/${t.name.toLowerCase().replaceAll(' ', '-')}.js.test.cjs`)

  for (const [matcherName, matcher] of Object.entries(testMatchers)) {
    t.test(matcherName, async t => {
      for (const { key, value, type } of matcher) {
        t.test(key, async t => {
          for (const [testCaseName, testCase] of Object.entries(testCases)) {
            t.test(testCaseName, async t => {
              for (const [handlerName, handler] of Object.entries(testHandlers)) {
                t.test(`${matcherName}/${key}/${testCaseName}/${handlerName}`, async t => {
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

const nonString = Object.entries({
  undefined: undefined,
  null: null,
  number: 1,
  true: true,
  false: false,
  emptyArray: [],
  emptyObject: {},
  arrayNumbers: [1, 2, 3],
  arrayStrings: ['a', 'b', 'c'],
  objectNumbers: { a: 1, b: 2, c: 3 },
  objectStrings: { a: 'a', b: 'b', c: 'c' },
}).map(([key, value]) => ({ key, value, type: 'nonString' }))

const nonStringSensitve = Object.entries({
  arrayNumbers: [1, examples.NPM_SECRET.npm_36, 3],
  arrayStrings: ['a', examples.NPM_SECRET.npm_36, 'c'],
  objectNumbers: { a: 1, b: examples.NPM_SECRET.npm_36, c: 3 },
  objectStrings: { a: 'a', b: examples.NPM_SECRET.npm_36, c: 'c' },
  object: {
    url: examples.HTTP_URL_CORE.https_com_6,
    headers: {
      Authorization: examples.AUTH_HEADER_CORE.bearer_auth_header_6,
      nested: {
        basic: examples.AUTH_HEADER_CORE.basic_auth_header_6,
      },
    },
    values: {
      jwt: examples.JSON_WEB_TOKEN.jwt_HS256_1033,
      npm: examples.NPM_SECRET.npm_48,
    },
  },
}).map(([key, value]) => ({ key, value, type: 'nonStringSensitve' }))

t.test('non string', runner(
  { nonString, nonStringSensitve },
  pick(TEST_CASES, 'just'),
  pick(HANDLERS, 'serverRedactSafe', 'serverRedactPreserveType')
))

// dynamic matchers

t.test('matchers npmSecret', runner(
  pick(TEST_MATCHERS, 'npmSecret'),
  TEST_CASES,
  {
    dynamic: ({ value }) => {
      return value.replace(matchers.NPM_SECRET.pattern, matchers.NPM_SECRET.dynamic)
    },
    fixed: ({ value }) => {
      return value.replace(matchers.NPM_SECRET.pattern, matchers.NPM_SECRET.fixed)
    },
  }
))

t.test('matchers jsonWebToken', runner(
  pick(TEST_MATCHERS, 'jsonWebToken'),
  TEST_CASES,
  {
    dynamic: ({ value }) => {
      return value.replace(matchers.JSON_WEB_TOKEN.pattern, matchers.JSON_WEB_TOKEN.dynamic)
    },
    fixed: ({ value }) => {
      return value.replace(matchers.JSON_WEB_TOKEN.pattern, matchers.JSON_WEB_TOKEN.fixed)
    },
  }
))

t.test('matchers uuid', runner(
  pick(TEST_MATCHERS, 'uuid'),
  TEST_CASES,
  {
    dynamic: ({ value }) => {
      return value.replace(matchers.UUID.pattern, matchers.UUID.dynamic)
    },
    fixed: ({ value }) => {
      return value.replace(matchers.UUID.pattern, matchers.UUID.fixed)
    },
  }
))

t.test('matchers authHeaderCore', runner(
  pick(TEST_MATCHERS, 'authHeaderCore'),
  TEST_CASES,
  {
    dynamic: ({ value }) => {
      return value.replace(matchers.AUTH_HEADER.pattern, matchers.AUTH_HEADER.dynamic)
    },
    fixed: ({ value }) => {
      return value.replace(matchers.AUTH_HEADER.pattern, matchers.AUTH_HEADER.fixed)
    },
  }
))
