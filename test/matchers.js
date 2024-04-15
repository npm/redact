/* eslint-disable max-len */

const matchers = require('../lib/matchers')
const t = require('tap')
const examples = require('./fixtures/examples')
const { asterisk, redactUrlPassword } = require('../lib/utils')

t.same(
  examples.NPM_SECRET.npm_36.replace(matchers.NPM_SECRET.pattern, matchers.NPM_SECRET.replacement),
  matchers.NPM_SECRET.replacement
)

t.same(
  examples.NPM_SECRET.npm_36.replace(matchers.NPM_SECRET.pattern, matchers.NPM_SECRET.dynamic),
  'npm_************************************'
)

t.same(
  examples.NPM_SECRET.npm_48.replace(matchers.NPM_SECRET.pattern, matchers.NPM_SECRET.dynamic),
  'npm_************************************************'
)

t.same(
  examples.NPM_SECRET.npm_48.replace(matchers.NPM_SECRET.pattern, matchers.NPM_SECRET.fixed),
  'npm_********'
)

t.same(
  examples.AUTH_HEADER_CORE.basic_auth_header_10.replace(matchers.AUTH_HEADER.pattern, matchers.AUTH_HEADER.replacement),
  matchers.AUTH_HEADER.replacement
)

t.same(
  examples.AUTH_HEADER_CORE.basic_auth_header_10.replace(matchers.AUTH_HEADER.pattern, matchers.AUTH_HEADER.dynamic),
  'Basic **********'
)

t.same(
  examples.AUTH_HEADER_CORE.basic_auth_header_10.replace(matchers.AUTH_HEADER.pattern, matchers.AUTH_HEADER.fixed),
  'Basic ********'
)

t.same(
  examples.JSON_WEB_TOKEN.jwt_HS256_84.replace(matchers.JSON_WEB_TOKEN.pattern, matchers.JSON_WEB_TOKEN.replacement),
  matchers.JSON_WEB_TOKEN.replacement
)

t.same(
  examples.JSON_WEB_TOKEN.jwt_HS256_84.replace(matchers.JSON_WEB_TOKEN.pattern, matchers.JSON_WEB_TOKEN.dynamic),
  '************************************.********.*******************************************'
)

t.same(
  examples.JSON_WEB_TOKEN.jwt_HS256_84.replace(matchers.JSON_WEB_TOKEN.pattern, matchers.JSON_WEB_TOKEN.fixed),
  '********.********.********'
)

t.same(
  examples.UUID.uuid_v1.replace(matchers.UUID.pattern, matchers.UUID.replacement),
  matchers.UUID.replacement
)

t.same(
  examples.UUID.uuid_v1.replace(matchers.UUID.pattern, matchers.UUID.dynamic),
  '********-********-********-********-************'
)

t.same(
  examples.UUID.uuid_v1.replace(matchers.UUID.pattern, matchers.UUID.fixed),
  '********-********-********-********-********'
)

t.same(
  redactUrlPassword(examples.HTTP_URL_CORE.http_com_pass_path_6),
  `http://username:${asterisk()}@example.io/${examples.test6}`
)

t.same(
  redactUrlPassword(examples.HTTP_URL_CORE.http_com_up_same_6),
  `http://${examples.test6}:${asterisk()}@example.io`
)
