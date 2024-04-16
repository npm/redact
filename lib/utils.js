/* eslint-disable max-len */
const { URL } = require('url')

/** this forces a minimum asterisk for security purposes */
const asterisk = (length = 0) => {
  if (length < 8) {
    return '*'.repeat(8)
  }
  return '*'.repeat(length)
}

const redactInPlacePrefix = (split) => value => {
  const parts = value.split(split)
  const prefix = parts.shift()
  const suffix = parts.pop()
  const join = value.slice(prefix.length, -suffix.length)
  return `${prefix}${join}${asterisk(suffix.length)}`
}

const redactInPlaceSplit = (split, redaction) => value => {
  const parts = value.split(split)
  const redactedParts = parts.map(part => redaction || asterisk(part.length))
  return redactedParts.join(split)
}

const createRedact = (matchers, message) => {
  if (message === '') {
    return ''
  }
  if (typeof message !== 'string') {
    throw new Error('redaction expects a string')
  }
  matchers.forEach(matcher => {
    message = message.replace(matcher.pattern, matcher.replacement)
  })
  return message
}

const redactUrlPassword = (value, replacement = asterisk()) => {
  try {
    // If a value is a valid URL, redact only the password. This does not use
    // url.toString() because we don't want to normalize the url in any other
    // way, only to redact the password.
    const url = new URL(value)
    if (url.password) {
      const pattern = new RegExp(`(^${url.protocol}//)${url.username}:${url.password}`)
      return value.replace(pattern, `$1${url.username}:${replacement}`)
    }
    return value
  } catch {
    return value
  }
}

class Redact {
  constructor (matchers) {
    this.matchers = matchers
  }

  /**
 * Redacts sensitive information from the given message, designed for servers.
 * Throws if not string
 * @param {string} message The message to redact.
 * @returns {string}
 */
  strict (message) {
    return createRedact(this.matchers, message)
  }

  /**
   * Redacts sensitive information from the given message, designed for servers.
   * Converts non-string to json.
   * @param {any} message The message to redact.
   * @returns {string}
   */
  safe (message) {
    if (!message) {
      return ''
    }
    return this.strict(JSON.stringify(message))
  }

  /**
   * Redacts sensitive information from the given message, designed for servers.
   * Attempts to return the same type that was passed in.
   * @param {any} message The message to redact.
   * @returns {any}
   */
  preserveType (message) {
    if (typeof message === 'string') {
      return this.strict(message)
    }
    if (typeof message === 'object' || Array.isArray(message)) {
      return JSON.parse(this.preserveType(JSON.stringify(message)))
    }
    return message
  }
}

module.exports = {
  Redact,
  asterisk,
  redactUrlPassword,
  redactInPlacePrefix,
  redactInPlaceSplit,
  createRedact,
}
