/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/suite.js TAP server redact nonstring nonString arrayNumbers just serverRedact > must match snapshot 1`] = `
Array [
  1,
  2,
  3,
]
`

exports[`test/suite.js TAP server redact nonstring nonString arrayStrings just serverRedact > must match snapshot 1`] = `
Array [
  "a",
  "b",
  "c",
]
`

exports[`test/suite.js TAP server redact nonstring nonString emptyArray just serverRedact > must match snapshot 1`] = `
Array []
`

exports[`test/suite.js TAP server redact nonstring nonString emptyObject just serverRedact > must match snapshot 1`] = `
Object {}
`

exports[`test/suite.js TAP server redact nonstring nonString exampleGetterThrows just serverRedact > must match snapshot 1`] = `
Object {
  "getter": "[error getting value: Error in getter]",
}
`

exports[`test/suite.js TAP server redact nonstring nonString false just serverRedact > must match snapshot 1`] = `
false
`

exports[`test/suite.js TAP server redact nonstring nonString nestedArrayArray just serverRedact > must match snapshot 1`] = `
Array [
  1,
  Array [
    2,
  ],
]
`

exports[`test/suite.js TAP server redact nonstring nonString nestedArrayObject just serverRedact > must match snapshot 1`] = `
Array [
  1,
  Object {
    "a": 1,
  },
]
`

exports[`test/suite.js TAP server redact nonstring nonString null just serverRedact > must match snapshot 1`] = `
null
`

exports[`test/suite.js TAP server redact nonstring nonString number just serverRedact > must match snapshot 1`] = `
1
`

exports[`test/suite.js TAP server redact nonstring nonString objectNumbers just serverRedact > must match snapshot 1`] = `
Object {
  "a": 1,
  "b": 2,
  "c": 3,
}
`

exports[`test/suite.js TAP server redact nonstring nonString objectStrings just serverRedact > must match snapshot 1`] = `
Object {
  "a": "a",
  "b": "b",
  "c": "c",
}
`

exports[`test/suite.js TAP server redact nonstring nonString true just serverRedact > must match snapshot 1`] = `
true
`

exports[`test/suite.js TAP server redact nonstring nonString undefined just serverRedact > must match snapshot 1`] = `
undefined
`

exports[`test/suite.js TAP server redact nonstring nonStringSensitve arrayNumbers just serverRedact > must match snapshot 1`] = `
Array [
  1,
  "[REDACTED_NPM_SECRET]",
  3,
]
`

exports[`test/suite.js TAP server redact nonstring nonStringSensitve arrayStrings just serverRedact > must match snapshot 1`] = `
Array [
  "a",
  "[REDACTED_NPM_SECRET]",
  "c",
]
`

exports[`test/suite.js TAP server redact nonstring nonStringSensitve circular just serverRedact > must match snapshot 1`] = `
Object {
  "headers": Object {
    "Authorization": "[REDACTED_HEADER_AUTHORIZATION]",
    "example": Object {
      "headers": Object {
        "set-cookie": "[REDACTED_HEADER_SET_COOKIE]",
      },
    },
    "nested": Object {
      "basic": "[REDACTED_AUTH_HEADER]",
    },
  },
  "url": "https://username:********@example.com/",
  "values": Object {
    "jwt": "[REDACTED_JSON_WEB_TOKEN]",
    "npm": "[REDACTED_NPM_SECRET]",
  },
}
`

exports[`test/suite.js TAP server redact nonstring nonStringSensitve circularArray just serverRedact > must match snapshot 1`] = `
Array [
  1,
  2,
  3,
  4,
]
`

exports[`test/suite.js TAP server redact nonstring nonStringSensitve error just serverRedact > must match snapshot 1`] = `
Object {
  "err": Object {
    "message": "Error with senstive url https://username:********@example.com/",
    "stack": String(
      Error with senstive url https://username:********@example.com/
      [removing stacktrace for snapshot test]
    ),
  },
  "errorType": "Error",
}
`

exports[`test/suite.js TAP server redact nonstring nonStringSensitve exampleGetter just serverRedact > must match snapshot 1`] = `
Object {
  "getter": "[REDACTED_NPM_SECRET]",
}
`

exports[`test/suite.js TAP server redact nonstring nonStringSensitve object just serverRedact > must match snapshot 1`] = `
Object {
  "headers": Object {
    "Authorization": "[REDACTED_HEADER_AUTHORIZATION]",
    "example": Object {
      "headers": Object {
        "set-cookie": "[REDACTED_HEADER_SET_COOKIE]",
      },
    },
    "nested": Object {
      "basic": "[REDACTED_AUTH_HEADER]",
    },
  },
  "url": "https://username:********@example.com/",
  "values": Object {
    "jwt": "[REDACTED_JSON_WEB_TOKEN]",
    "npm": "[REDACTED_NPM_SECRET]",
  },
}
`

exports[`test/suite.js TAP server redact nonstring nonStringSensitve objectNumbers just serverRedact > must match snapshot 1`] = `
Object {
  "a": 1,
  "b": "[REDACTED_NPM_SECRET]",
  "c": 3,
}
`

exports[`test/suite.js TAP server redact nonstring nonStringSensitve objectStrings just serverRedact > must match snapshot 1`] = `
Object {
  "a": "a",
  "b": "[REDACTED_NPM_SECRET]",
  "c": "c",
}
`

exports[`test/suite.js TAP server redact nonstring nonStringSensitve privateProperty just serverRedact > must match snapshot 1`] = `
Object {
  "headers": Object {
    "Authorization": "[REDACTED_HEADER_AUTHORIZATION]",
    "example": Object {
      "headers": Object {
        "set-cookie": "[REDACTED_HEADER_SET_COOKIE]",
      },
    },
    "nested": Object {
      "basic": "[REDACTED_AUTH_HEADER]",
    },
  },
  "nested": Object {
    "url": "https://username:********@example.com/",
  },
  "url": "https://username:********@example.com/",
  "values": Object {
    "jwt": "[REDACTED_JSON_WEB_TOKEN]",
    "npm": "[REDACTED_NPM_SECRET]",
  },
}
`

exports[`test/suite.js TAP server redact nonstring nonStringSensitve requestObject just serverRedact > must match snapshot 1`] = `
Object {
  "request": Object {
    "headers": Object {
      "Authorization": "[REDACTED_HEADER_AUTHORIZATION]",
      "set-cookie": "[REDACTED_HEADER_SET_COOKIE]",
    },
    "method": "GET",
    "path": "/path",
    "url": "https://username:********@example.com/",
  },
}
`

exports[`test/suite.js TAP server redact nonstring nonStringSensitve responseObject just serverRedact > must match snapshot 1`] = `
Object {
  "response": Object {
    "data": "not Found",
    "headers": Object {
      "Authorization": "[REDACTED_HEADER_AUTHORIZATION]",
      "set-cookie": "[REDACTED_HEADER_SET_COOKIE]",
    },
    "status": 404,
  },
}
`
