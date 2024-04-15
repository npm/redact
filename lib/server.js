/* eslint-disable max-len */
const matchers = require('./matchers')
const { createRedact } = require('./utils')

/**
 * Redacts sensitive information from the given message, designed for servers.
 * @param {string} message The message to redact.
 * @returns {string}
 */
function redact (message) {
  return createRedact([
    matchers.NPM_SECRET,
    matchers.AUTH_HEADER,
    matchers.JSON_WEB_TOKEN,
    { ...matchers.HTTP_URL, replacement: matchers.HTTP_URL.password },
  ], message)
}

/**
 * Redacts sensitive information from the given message, designed for servers.
 * @param {any} message The message to redact.
 * @returns {string}
 */
function redactSafe (message) {
  return redact(JSON.stringify(message))
}

module.exports = {
  redact,
  redactSafe,
}
