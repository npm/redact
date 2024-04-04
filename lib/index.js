const { URL } = require('url')

const REPLACE = '***'

const HTTP_MATCHER = (value) => {
  try {
    // If a value is a valid URL, redact only the password. This does not use
    // url.toString() because we don't want to normalize the url in any other
    // way, only to redact the password.
    const url = new URL(value)
    if (url.password) {
      return {
        pattern: new RegExp(`(^${url.protocol}//)${url.username}:${url.password}`),
        replacement: `$1${url.username}:${REPLACE}`,
      }
    }
  } catch {
    // Invalid urls do not need this replacement
  }
}

const NPM_SECRET_MATCHER = {
  pattern: /\b(npms?_)[a-zA-Z0-9]{36,48}\b/gi,
  replacement: `$1${REPLACE}`,
}

const UUID_MATCHER = {
  pattern: /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi,
  replacement: REPLACE,
}

const JWT_SECRET_MATCHER = {
  pattern: /\b[\w-]{10,}(?!\.\d+\.)\.[\w-]{3,}\.[\w-]{20,}\b/gi,
  replacement: REPLACE,
}

const BASIC_AUTH_MATCHER = {
  pattern: /\b(Basic\s)[\w+=-]+\b/gi,
  replacement: `$1${REPLACE}`,
}

const BEARER_AUTH_MATCHER = {
  pattern: /\b(Bearer\s)[\w+=-]+\b/gi,
  replacement: `$1${REPLACE}`,
}

const REPLACERS = [
  HTTP_MATCHER,
  NPM_SECRET_MATCHER,
  UUID_MATCHER,
  JWT_SECRET_MATCHER,
  BASIC_AUTH_MATCHER,
  BEARER_AUTH_MATCHER,
]

const redact = (value) => {
  if (typeof value !== 'string' || !value) {
    return value
  }

  for (const getReplacer of REPLACERS) {
    const replacer = typeof getReplacer === 'function' ? getReplacer(value) : getReplacer
    if (replacer) {
      value = value.replace(replacer.pattern, replacer.replacement)
    }
  }

  return value
}

// split on \s|= similar to how nopt parses options
const splitAndRedact = (value) => {
  if (typeof value !== 'string' || !value) {
    return value
  }

  // stateful regex, don't move out of this scope
  const splitChars = /[\s=]/g

  let match = null
  let result = ''
  let index = 0
  while (match = splitChars.exec(value)) {
    result += redact(value.slice(index, match.index)) + match[0]
    index = splitChars.lastIndex
  }

  return result + redact(value.slice(index))
}

// replaces auth info in an array of arguments or in a strings
const redactLog = (arg) => {
  if (typeof arg === 'string') {
    return splitAndRedact(arg)
  } else if (Array.isArray(arg)) {
    return arg.map((a) => splitAndRedact(a))
  }
  return arg
}

module.exports = {
  redact,
  redactLog,
  NPM_SECRET_MATCHER,
  UUID_MATCHER,
  JWT_SECRET_MATCHER,
  BASIC_AUTH_MATCHER,
  BEARER_AUTH_MATCHER,
  HTTP_MATCHER,
}
