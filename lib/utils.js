const { URL } = require('url')

/** this forces a minimum asterisk for security purposes */
const asterisk = (length = 0) => {
  if (length < 8) {
    return '*'.repeat(8)
  }
  return '*'.repeat(length)
}

const redactUrlPassword = (url, replacement = asterisk()) => {
  try {
    const parsed = new URL(url)
    if (parsed.password) {
      parsed.password = replacement
      return parsed.toString()
    }
    return url
  } catch {
    return url
  }
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

const createRedact = (matchers) => (message) => {
  if (typeof message !== 'string') {
    throw new Error('redaction expects a string')
  }

  matchers.forEach(matcher => {
    message = message.replace(matcher.pattern, matcher.replacement)
  })

  return message
}

module.exports = {
  asterisk,
  redactUrlPassword,
  redactInPlacePrefix,
  redactInPlaceSplit,
  createRedact,
}
