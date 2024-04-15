/* eslint-disable max-len */

const test6 = 'abc123'
const test60 = test6.repeat(10)
const test10 = test60.substring(0, 10)
const test36 = test60.substring(0, 36)
const test42 = test60.substring(0, 42)
const test48 = test60.substring(0, 48)

const genNpmSecret = (test, key = test.length) => ({
  [`npm_${key}`]: 'npm_' + test,
  [`npms_${key}`]: 'npms_' + test,
})

const NPM_SECRET = {
  ...genNpmSecret(test36),
  ...genNpmSecret(test42),
  ...genNpmSecret(test48),
}

const addJWT = (prefix, token, key = token.length) => {
  const jwt = {}
  jwt[`jwt_${prefix}_${key}`] = token
  return jwt
}

/**
 * @description This object that contains different types of jwt tokens of various lengths
 * @see https://jwt.io/ to create tokens
 * @see https://www.javainuse.com/bytesize#google_vignette to get payload length in bytes
 * @see https://swapi.dev/ for aribitrary json payload
 * Format for the jwt key is: <JWT_ALGO>_payloadBytes<PAYLOAD_LENGTH_BYTES>
 */
const JSON_WEB_TOKEN = {
  ...addJWT('HS256', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.UnP25ddNPCSH2liwMMda7naPmIY0bOTXKoGWOpysVao'),
  ...addJWT('HS256', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTHVrZSBTa3l3YWxrZXIiLCJoZWlnaHQiOiIxNzIiLCJtYXNzIjoiNzciLCJoYWlyX2NvbG9yIjoiYmxvbmQiLCJza2luX2NvbG9yIjoiZmFpciIsImV5ZV9jb2xvciI6ImJsdWUiLCJiaXJ0aF95ZWFyIjoiMTlCQlkiLCJnZW5kZXIiOiJtYWxlIiwiaG9tZXdvcmxkIjoiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3BsYW5ldHMvMS8iLCJmaWxtcyI6WyJodHRwczovL3N3YXBpLmRldi9hcGkvZmlsbXMvMi8iLCJodHRwczovL3N3YXBpLmRldi9hcGkvZmlsbXMvNi8iLCJodHRwczovL3N3YXBpLmRldi9hcGkvZmlsbXMvMy8iLCJodHRwczovL3N3YXBpLmRldi9hcGkvZmlsbXMvMS8iLCJodHRwczovL3N3YXBpLmRldi9hcGkvZmlsbXMvNy8iXSwic3BlY2llcyI6WyJodHRwczovL3N3YXBpLmRldi9hcGkvc3BlY2llcy8xLyJdLCJ2ZWhpY2xlcyI6WyJodHRwczovL3N3YXBpLmRldi9hcGkvdmVoaWNsZXMvMTQvIiwiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3ZlaGljbGVzLzMwLyJdLCJzdGFyc2hpcHMiOlsiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3N0YXJzaGlwcy8xMi8iLCJodHRwczovL3N3YXBpLmRldi9hcGkvc3RhcnNoaXBzLzIyLyJdLCJjcmVhdGVkIjoiMjAxNC0xMi0wOVQxMzo1MDo1MS42NDQwMDBaIiwiZWRpdGVkIjoiMjAxNC0xMi0yMFQyMToxNzo1Ni44OTEwMDBaIiwidXJsIjoiaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8xLyJ9.fUI9Fnivgo9Xl--PLRzpIeJLRoOUO5iUTXKYUhx0xDw'),
}

const genAuthHeader = (test, key = test.length) => ({
  [`basic_auth_header_${key}`]: `Basic ${test}`,
  [`bearer_auth_header_${key}`]: `Bearer ${test}`,
  [`basic_auth_header_multispace_${key}`]: `Basic      ${test}`,
  [`bearer_auth_header_multispace_${key}`]: `Bearer      ${test}`,
})

const AUTH_HEADER_CORE = {
  ...genAuthHeader(test10),
}

const genHttpUrl = (test, key = test.length) => ({
  [`https_com_${key}`]: `https://username:${test}@example.com/`,
  [`https_com_with_params_${key}`]: `https://username:${test}@example.com/?param1=value1&param2=value2`,
  [`http_com_${key}`]: `http://username:${test}@example.com`,
  [`http_com_with_params_${key}`]: `http://username:${test}@example.com/?param1=value1&param2=value2`,
  [`https_io_${key}`]: `https://username:${test}@example.io/`,
  [`https_io_with_params_${key}`]: `https://username:${test}@example.io/?param1=value1&param2=value2`,
  [`http_io_${key}`]: `http://username:${test}@example.io/`,
  [`http_io_with_params_${key}`]: `http://username:${test}@example.io/?param1=value1&param2=value2`,
  [`http_com_pass_path_${key}`]: `http://username:${test}@example.io/${test}`,
  [`http_com_up_same_${key}`]: `http://${test}:${test}@example.io`,
})

const HTTP_URL_CORE = {
  http_no_auth: 'http://example.com/',
  http_no_auth_no_trailing: 'http://example.com',
  ...genHttpUrl(test6),
}

/** @see https://www.uuidgenerator.net/guid */
const UUID = {
  guid: '274cd57b-6f3d-4831-a03a-6ffbe483dd45',
  uuid_v1: '94f0e0e2-f77e-11ee-a951-0242ac120002',
  uuid_v4: 'e38dbafd-33db-44f5-b446-78991c2d6b9d',
  uuid_v7: '018ec9d8-8754-75bd-8e40-7742db03b3dc',
  uuid_empty: '00000000-0000-0000-0000-000000000000',
}

const AUTH_HEADER_NPM = Object.entries(NPM_SECRET).reduce((acc, [key, value]) => ({ ...acc, ...genAuthHeader(value, key) }), {})
const AUTH_HEADER_JWT = Object.entries(JSON_WEB_TOKEN).reduce((acc, [key, value]) => ({ ...acc, ...genAuthHeader(value, key) }), {})
const HTTP_URL_NPM = Object.entries(NPM_SECRET).reduce((acc, [key, value]) => ({ ...acc, ...genHttpUrl(value, key) }), {})

module.exports = {
  NPM_SECRET,
  JSON_WEB_TOKEN,
  AUTH_HEADER_CORE,
  AUTH_HEADER_NPM,
  AUTH_HEADER_JWT,
  HTTP_URL_CORE,
  HTTP_URL_NPM,
  UUID,
  test6,
}
