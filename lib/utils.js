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

module.exports = {
  asterisk,
  redactUrlPassword,
  redactInPlacePrefix,
  redactInPlaceSplit,
  createRedact,
}
