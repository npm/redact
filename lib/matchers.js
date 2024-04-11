/* eslint-disable max-len */

const { redactUrlPassword, redactInPlacePrefix, asterisk, redactInPlaceSplit } = require('./utils')

/**
 * Here we list out all the matchers, each matcher has serveral replacement strategies
 * you can overwrite the default like this { ...AUTH_HEADER, replacement: AUTH_HEADER.dynamic }
 *
 * The default replacement should alwyas be a string
 *
 * -- types --
 * dynamic: means that the redaction will use the original length and replace it with asterisks
 * fixed: means that the redaction will have a fixed length of asterisks
 * replacement: is the default, it's a string that will replace the original value
 */

const NPM_SECRET = {
  pattern: /\b(npms?_)[a-zA-Z0-9]{36,48}\b/gi,
  replacement: `[REDACTED_NPM_SECRET]`,
  dynamic: redactInPlacePrefix('_'),
  fixed: `$1${asterisk()}`,
  type: 'NPM_SECRET',
}

const AUTH_HEADER = {
  pattern: /\b(Basic\s+|Bearer\s+)[\w+=\-.]+\b/gi,
  replacement: `[REDACTED_AUTH_HEADER]`,
  dynamic: redactInPlacePrefix(/\s+/),
  fixed: `$1${asterisk()}`,
  type: 'AUTH_HEADER',
}

const JSON_WEB_TOKEN = {
  // pattern: /\b[\w-]{10,}(?!\.\d+\.)\.[\w-]{3,}\.[\w-]{20,}\b/gi,
  pattern: /\b[A-Za-z0-9-_]{10,}(?!\.\d+\.)\.[A-Za-z0-9-_]{3,}\.[A-Za-z0-9-_]{20,}\b/gi,
  replacement: `[REDACTED_JSON_WEB_TOKEN]`,
  dynamic: redactInPlaceSplit('.'),
  fixed: redactInPlaceSplit('.', asterisk()),
  type: 'JSON_WEB_TOKEN',
}

const UUID = {
  pattern: /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi,
  replacement: `[REDACTED_UUID]`,
  dynamic: redactInPlaceSplit('-'),
  fixed: redactInPlaceSplit('-', asterisk()),
  type: 'UUID',
}

const HTTP_URL = {
  pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi,
  replacement: `[REDACTED_URL]`,
  password: (value) => redactUrlPassword(value),
  type: 'HTTP_URL',
}

module.exports = {
  NPM_SECRET,
  JSON_WEB_TOKEN,
  AUTH_HEADER,
  HTTP_URL,
  UUID,
}
