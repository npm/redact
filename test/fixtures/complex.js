const examples = require('./examples')

const exampleObject = {
  url: examples.HTTP_URL_CORE.https_com_6,
  headers: {
    Authorization: examples.AUTH_HEADER_CORE.bearer_auth_header_10,
    nested: {
      basic: examples.AUTH_HEADER_CORE.basic_auth_header_10,
    },
    example: {
      headers: {
        'set-cookie': 'shouldnotbeinsnapshot',
      },
    },
  },
  values: {
    jwt: examples.JSON_WEB_TOKEN.jwt_HS256_1033,
    npm: examples.NPM_SECRET.npm_48,
  },
}

const exampleGetter = (() => {
  const example = {}
  Object.defineProperty(example, 'getter', {
    get: () => examples.NPM_SECRET.npm_36,
  })
  return example
})()

const exampleCustomSerializer = (() => {
  class ExampleClass {
    toJSON () {
      return `latitude: 37.7822689; longitude: -122.3937449; secret: ${examples.NPM_SECRET.npm_36}`
    }
  }
  return new ExampleClass()
})()

const exampleGetterThrows = (() => {
  const example = {}
  Object.defineProperty(example, 'getter', {
    get: () => {
      throw new Error('Error in getter')
    },
  })
  return example
})()

const exampleCustomSerializerThrows = (() => {
  class ExampleClass {
    toJSON () {
      throw new Error('Error in toJSON')
    }
  }
  return new ExampleClass()
})()

const circular = (() => {
  const example = exampleObject
  exampleObject.nested = exampleObject
  return example
})()

const circularArray = (() => {
  const example = [1, 2, 3, 4]
  example.push(example)
  return example
})()

const examplesNonString = {
  undefined: undefined,
  null: null,
  number: 1,
  true: true,
  false: false,
  emptyArray: [],
  emptyObject: {},
  arrayNumbers: [1, 2, 3],
  nestedArrayArray: [1, [2]],
  nestedArrayObject: [1, { a: 1 }],
  arrayStrings: ['a', 'b', 'c'],
  objectNumbers: { a: 1, b: 2, c: 3 },
  objectStrings: { a: 'a', b: 'b', c: 'c' },
  exampleGetterThrows,
  exampleCustomSerializerThrows,
}

const error = (() => {
  const e = new Error(`Error with senstive url ${examples.HTTP_URL_CORE.https_com_6}`)
  e.stack = `${e.message}\n[removing stacktrace for snapshot test]`
  return e
})()

const examplesNonStringSensitive = {
  arrayNumbers: [1, examples.NPM_SECRET.npm_36, 3],
  arrayStrings: ['a', examples.NPM_SECRET.npm_36, 'c'],
  objectNumbers: { a: 1, b: examples.NPM_SECRET.npm_36, c: 3 },
  objectStrings: { a: 'a', b: examples.NPM_SECRET.npm_36, c: 'c' },
  object: exampleObject,
  circular,
  circularArray,
  exampleGetter,
  exampleCustomSerializer,
  error,
  privateProperty: {
    ...exampleObject,
    _private: 'shouldnotbeinsnapshot',
  },
  requestObject: {
    request: {
      extra: 'shouldnotbeinsnapshot',
      method: 'GET',
      url: examples.HTTP_URL_CORE.https_com_6,
      path: '/path',
      headers: {
        Authorization: examples.AUTH_HEADER_CORE.bearer_auth_header_10,
        'set-cookie': 'shouldnotbeinsnapshot',
      },
    },
  },
  responseObject: {
    response: {
      extra: 'shouldnotbeinsnapshot',
      data: 'not Found',
      status: 404,
      headers: {
        Authorization: examples.AUTH_HEADER_CORE.bearer_auth_header_10,
        'set-cookie': 'shouldnotbeinsnapshot',
      },
    },
  },
}

module.exports = {
  exampleObject,
  circular,
  examplesNonString,
  examplesNonStringSensitive,
}
