/** takes an error object and serializes it to a plan object */
function serializedError (input) {
  if (!(input instanceof Error)) {
    const error = new Error('attempted to serialize a non-error object')
    return serializedError(error)
  }
  return {
    errorType: input?.constructor?.name,
    ...(input.message ? { message: input.message } : {}),
    ...(input.stack ? { stack: input.stack } : {}),
    ...(input.code ? { code: input.code } : {}),
    ...(input.statusCode ? { statusCode: input.statusCode } : {}),
  }
}

/** takes an error returns new error keeping some custom properties */
function safeError (input) {
  const { message, errorType, ...data } = serializedError(input)
  const output = new Error(message)
  return Object.assign(output, { ...data, name: errorType })
}

/** runs a function within try / catch and throws safeError */
async function safeThrow (func) {
  try {
    return await func()
  } catch (error) {
    throw safeError(error)
  }
}

module.exports = {
  safeThrow,
  serializedError,
  safeError,
}
