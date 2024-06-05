function filterError (input) {
  return {
    errorType: input.name,
    message: input.message,
    stack: input.stack,
    ...(input.code ? { code: input.code } : {}),
    ...(input.statusCode ? { statusCode: input.statusCode } : {}),
  }
}

const deepMap = (
  input,
  handler = v => v,
  path = ['$'],
  seen = new Set([input]),
  parent = undefined
) => {
  const recursive = (i, p) => deepMap(handler(i, p), handler, p, seen, input)

  const isRoot = Array.isArray(parent) || parent === undefined
  // this is in an effort to maintain bole's error logging behavior
  if (isRoot && input instanceof Error) {
    return recursive({ err: filterError(input) }, [...path, 'err'])
  }
  if (input instanceof Error) {
    return recursive(filterError(input), path)
  }
  if (input instanceof Buffer) {
    return `[unable to log instanceof buffer]`
  }
  if (input instanceof Uint8Array) {
    return `[unable to log instanceof Uint8Array]`
  }
  if (typeof input === 'function') {
    return `[unable to log function]`
  }

  if (Array.isArray(input)) {
    const result = []
    for (let i = 0; i < input.length; i++) {
      const element = input[i]
      const elementPath = [...path, i]
      if (element instanceof Object) {
        if (!seen.has(element)) { // avoid getting stuck in circular reference
          seen.add(element)
          result.push(recursive(element, elementPath))
        }
      } else {
        result.push(handler(element, elementPath))
      }
    }
    return result
  }

  if (input === null) {
    return null
  } else if (typeof input === 'object') {
    const result = {}

    for (const propertyName of Object.getOwnPropertyNames(input)) {
    // skip logging internal properties
      if (propertyName.startsWith('_')) {
        continue
      }

      try {
        const property = input[propertyName]
        const propertyPath = [...path, propertyName]
        if (property instanceof Object) {
          if (!seen.has(property)) { // avoid getting stuck in circular reference
            seen.add(property)
            result[propertyName] = recursive(property, propertyPath)
          }
        } else {
          result[propertyName] = handler(property, propertyPath)
        }
      } catch (err) {
      // a getter may throw an error
        result[propertyName] = `[error getting value: ${err.message}]`
      }
    }
    return result
  }

  return handler(input, path)
}

module.exports = { deepMap }
