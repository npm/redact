/* eslint-disable max-len */

const cli = require('../lib/index')
const examples = require('./fixtures/examples')
const redactLog = cli.redactLog
const server = require('../lib/server')
const t = require('tap')
const { redactUrlPassword } = require('../lib/utils')

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

t.same(
  server.redactSafe({
    url: 'https://username:password@example.com',
    headers: {
      Authorization: 'Bearer examplebearer',
      nested: {
        basic: 'Basic exampletoken',
      },
    },
    values: {
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      npm: 'npm_123456789012345678901234567890123456789012345678',
    },
  }),
  JSON.stringify({
    url: 'https://username:********@example.com/',
    headers: {
      Authorization: '[REDACTED_AUTH_HEADER]',
      nested: {
        basic: '[REDACTED_AUTH_HEADER]',
      },
    },
    values: {
      jwt: '[REDACTED_JSON_WEB_TOKEN]',
      npm: '[REDACTED_NPM_SECRET]',
    },
  }),
  'should perform server redact with all types of redactions'
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
