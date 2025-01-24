/** takes an error object and serializes it to a plan object */
function serializedError (input) {
  if (!(input instanceof Error)) {
    if (typeof input === 'string') {
      const error = new Error(`attempted to serialize a non-error, string String, "${input}"`)
      return serializedError(error)
    }
    const error = new Error(`attempted to serialize a non-error, ${typeof input} ${input?.constructor?.name}`)
    return serializedError(error)
  }
  // different error objects store status code differently
  // AxiosError uses `status`, other services use `statusCode`
  const statusCode = input.statusCode ?? input.status
  // CAUTION: what we serialize here gets add to the size of logs
  return {
    errorType: input.errorType ?? input.constructor.name,
    ...(input.message ? { message: input.message } : {}),
    ...(input.stack ? { stack: input.stack } : {}),
    // think of this as error code
    ...(input.code ? { code: input.code } : {}),
    // think of this as http status code
    ...(statusCode ? { statusCode } : {}),
  }
}

/** takes an error returns new error keeping some custom properties */
function safeError (input) {
  const { message, ...data } = serializedError(input)
  const output = new Error(message)
  return Object.assign(output, data)
}

/** runs a function within try / catch and throws safeError */
async function safeThrow (func) {
  if (typeof func !== 'function') {
    throw new Error('safeThrow expects a function')
  }
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
