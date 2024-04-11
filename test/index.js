/* eslint-disable max-len */

const { runSuite } = require('./fixtures/runner')
const cli = require('../lib/index')
const examples = require('./fixtures/examples')
const matchers = require('../lib/matchers')
const redactLog = cli.redactLog
const server = require('../lib/server')
const t = require('tap')
const { redactUrlPassword } = require('../lib/utils')

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
runSuite({ file: 'server-replace.json' }, allExamples, ({ value }) => server.redact(value))

t.same(
  redactUrlPassword('hello'),
  'hello'
)

t.throws(() => {
  server.redact(123)
})

t.throws(() => {
  server.redact({})
})

t.same(
  server.redactSafe({ url: examples.HTTP_URL_CORE.http_com_6 }),
  JSON.stringify({ url: 'http://username:********@example.com/' })
)

t.equal(
  redactLog(),
  undefined,
  'should return undefined item'
)

t.equal(
  redactLog(null),
  null,
  'should return null'
)

t.equal(
  redactLog(1234),
  1234,
  'should return numbers'
)

t.equal(
  redactLog('  ==  = = '),
  '  ==  = = ',
  'should return same string with only separators'
)

t.equal(
  redactLog(''),
  '',
  'should return empty string'
)

t.equal(
  redactLog('https://user:pass@registry.npmjs.org/'),
  'https://user:***@registry.npmjs.org/',
  'should replace single item'
)

t.equal(
  redactLog(`https://registry.npmjs.org/path/npm_${'a'.repeat('36')}`),
  'https://registry.npmjs.org/path/npm_***',
  'should replace single item token'
)

t.equal(
  redactLog(`https://registry.npmjs.org/path/ac21ea09-80e1-4f87-a48f-c683c561b287/more/paths`),
  'https://registry.npmjs.org/path/***/more/paths',
  'should redact guid'
)

t.equal(
  redactLog('https://example.npmjs.org'),
  'https://example.npmjs.org',
  'should not replace single item with no password'
)

t.equal(
  redactLog('foo bar https://example.npmjs.org lorem ipsum'),
  'foo bar https://example.npmjs.org lorem ipsum',
  'should not replace single item with no password with multiple items'
)

t.equal(
  redactLog('https://user:pass@registry.npmjs.org/ http://a:b@reg.github.com'),
  'https://user:***@registry.npmjs.org/ http://a:***@reg.github.com/',
  'should replace multiple items on a string'
)

t.equal(
  redactLog('Something https://user:pass@registry.npmjs.org/ foo bar'),
  'Something https://user:***@registry.npmjs.org/ foo bar',
  'should replace single item within a phrase'
)

t.equal(
  redactLog('Something --x=https://user:pass@registry.npmjs.org/ foo bar'),
  'Something --x=https://user:***@registry.npmjs.org/ foo bar',
  'should replace single item within a phrase separated by ='
)

t.same(
  redactLog([
    'Something https://user:pass@registry.npmjs.org/ foo bar',
    'http://foo:bar@registry.npmjs.org',
    'http://example.npmjs.org',
  ]),
  [
    'Something https://user:***@registry.npmjs.org/ foo bar',
    'http://foo:***@registry.npmjs.org/',
    'http://example.npmjs.org',
  ],
  'should replace items in an array'
)

t.same(
  redactLog([
    'Something --x=https://user:pass@registry.npmjs.org/ foo bar',
    '--url=http://foo:bar@registry.npmjs.org',
    '--url=http://example.npmjs.org',
  ]),
  [
    'Something --x=https://user:***@registry.npmjs.org/ foo bar',
    '--url=http://foo:***@registry.npmjs.org/',
    '--url=http://example.npmjs.org',
  ],
  'should replace items in an array with equals'
)

t.same(
  redactLog([
    'Something https://user:pass@registry.npmjs.org/ foo bar',
    null,
    [],
  ]),
  [
    'Something https://user:***@registry.npmjs.org/ foo bar',
    null,
    [],
  ],
  'should ignore invalid items of array'
)
